package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ExportItemDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.ExportItem;
import com.mittupani.wateria.model.Item;
import com.mittupani.wateria.repository.ExportItemRepository;
import com.mittupani.wateria.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExportItemServiceImpl implements ExportItemService {

    private final ExportItemRepository exportItemRepository;
    private final ItemRepository itemRepository;

    private ExportItemDTO mapToDTO(ExportItem item) {
        ExportItemDTO dto = new ExportItemDTO();
        dto.setId(item.getId());
        dto.setCustomerName(item.getCustomerName());
        dto.setCustomerContact(item.getCustomerContact());
        dto.setItemId(item.getItem().getId());
        dto.setItemName(item.getItem().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPricePerItem(item.getPricePerItem());
        dto.setMoneyReceived(item.getMoneyReceived());
        dto.setNote(item.getNote());
        dto.setCreatedAt(item.getCreatedAt());
        return dto;
    }

    private ExportItem mapToEntity(ExportItemDTO dto) {
        ExportItem item = new ExportItem();
        item.setId(dto.getId());
        item.setCustomerName(dto.getCustomerName());
        item.setCustomerContact(dto.getCustomerContact());
        item.setQuantity(dto.getQuantity());
        item.setPricePerItem(dto.getPricePerItem());
        item.setMoneyReceived(dto.getMoneyReceived());
        item.setNote(dto.getNote());
        item.setCreatedAt(dto.getCreatedAt());
        return item;
    }

    @Override
    public Page<ExportItemDTO> getAllExportItems(Pageable pageable) {
        return exportItemRepository.findAll(pageable)
                .map(this::mapToDTO);
    }


    @Override
    public ExportItemDTO getExportItemById(Long id) {
        return exportItemRepository.findById(id).map(this::mapToDTO).orElseThrow(() -> new ResourceNotFoundException("Export item not found"));
    }

    @Override
    public ExportItemDTO createExportItem(ExportItemDTO dto) {
        var item = itemRepository.findById(dto.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        int availableQty = item.getUnit();
        if (availableQty < dto.getQuantity()) {
            throw new IllegalStateException("Not enough stock to export! Available: " + availableQty);
        }

        // Subtract stock
        item.setUnit(availableQty - dto.getQuantity());
        itemRepository.save(item);

        // Create export record
        ExportItem exportItem = mapToEntity(dto);
        exportItem.setItem(item);

        return mapToDTO(exportItemRepository.save(exportItem));
    }

    @Override
    public ExportItemDTO updateExportItem(Long id, ExportItemDTO dto) {
        ExportItem existing = exportItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Export item not found"));

        Item oldItem = existing.getItem();
        int oldQty = existing.getQuantity();

        Item newItem = itemRepository.findById(dto.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("New item not found"));
        int newQty = dto.getQuantity();

        // CASE 1: Same item
        if (oldItem.getId().equals(newItem.getId())) {
            int availableQty = oldItem.getUnit();
            int difference = newQty - oldQty;

            if (difference > 0 && availableQty < difference) {
                throw new IllegalStateException("Not enough stock to increase quantity.");
            }

            // Update quantity
            oldItem.setUnit(availableQty - difference);
            itemRepository.save(oldItem);
        } else {
            // CASE 2: Item changed

            // Revert quantity to old item
            int oldStock = oldItem.getUnit();
            oldItem.setUnit(oldStock + oldQty);
            itemRepository.save(oldItem);

            // Subtract from new item
            int newStock = newItem.getUnit();
            if (newStock < newQty) {
                throw new IllegalStateException("Not enough stock in new item.");
            }
            newItem.setUnit(newStock - newQty);
            itemRepository.save(newItem);

            existing.setItem(newItem);
        }

        // Update rest of fields
        existing.setCustomerName(dto.getCustomerName());
        existing.setCustomerContact(dto.getCustomerContact());
        existing.setQuantity(newQty);
        existing.setPricePerItem(dto.getPricePerItem());
        existing.setMoneyReceived(dto.getMoneyReceived());
        existing.setNote(dto.getNote());
        existing.setCreatedAt(dto.getCreatedAt());

        return mapToDTO(exportItemRepository.save(existing));
    }


    @Override
    public void deleteExportItem(Long id) {

        ExportItem exportItem = exportItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Export item not found"));

        // Restore stock
        Item item = exportItem.getItem();
        item.setUnit(item.getUnit() + exportItem.getQuantity());
        itemRepository.save(item);
        exportItemRepository.delete(exportItem);
    }
}
