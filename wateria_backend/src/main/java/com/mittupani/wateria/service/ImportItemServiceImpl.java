package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ImportItemDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.ImportItem;
import com.mittupani.wateria.model.Item;
import com.mittupani.wateria.model.Supplier;
import com.mittupani.wateria.repository.ImportItemRepository;
import com.mittupani.wateria.repository.ItemRepository;
import com.mittupani.wateria.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImportItemServiceImpl implements ImportItemService {

    private final ImportItemRepository importItemRepository;
    private final ItemRepository itemRepository;
    private final SupplierRepository supplierRepository;

    private ImportItemDTO mapToDTO(ImportItem item) {
        ImportItemDTO dto = new ImportItemDTO();
        dto.setId(item.getId());
        dto.setSupplierId(item.getSupplier().getId());
        dto.setItemId(item.getItem().getId());
        dto.setQuantity(item.getQuantity());
        dto.setPricePerItem(item.getPricePerItem());
        dto.setNote(item.getNote());
        dto.setCreatedAt(item.getCreatedAt());
        // ✅ Add nested references for your React table/modals:
        dto.setItem(item.getItem());         // FULL Item entity
        dto.setSupplier(item.getSupplier()); // FULL Supplier entity
        return dto;
    }

    private ImportItem mapToEntity(ImportItemDTO dto) {
        ImportItem item = new ImportItem();
        item.setId(dto.getId());
        item.setQuantity(dto.getQuantity());
        item.setPricePerItem(dto.getPricePerItem());
        item.setNote(dto.getNote());
        item.setCreatedAt(dto.getCreatedAt());

        Item itemi = itemRepository.findById(dto.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        item.setItem(itemi);
        item.setSupplier(supplier);
        return item;
    }

    @Override
    public Page<ImportItemDTO> getAllImportItems(String query,Pageable pageable) {
        Page<ImportItem> pageResult;
        if (query != null && !query.trim().isEmpty()) {
            pageResult = importItemRepository.findByItem_NameContainingIgnoreCase(query, pageable);
        } else {
            pageResult = importItemRepository.findAll(pageable);
        }
        return pageResult.map(this::mapToDTO);
    }


    @Override
    public ImportItemDTO getImportItemById(Long id) {
        return importItemRepository.findById(id).map(this::mapToDTO).orElseThrow(() -> new ResourceNotFoundException("Import item not found"));
    }

    @Override
    public ImportItemDTO createImportItem(ImportItemDTO dto) {
        Item item = itemRepository.findById(dto.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        int stock = item.getUnit();
        stock += dto.getQuantity();
        item.setUnit(stock);
        itemRepository.save(item);

        ImportItem entity = mapToEntity(dto);
        entity.setItem(item);

        return mapToDTO(importItemRepository.save(entity));
    }

    @Override
    public ImportItemDTO updateImportItem(Long id, ImportItemDTO dto) {
        ImportItem existing = importItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Import item not found"));

        Item oldItem = existing.getItem();
        int oldQty = existing.getQuantity();

        Item newItem = itemRepository.findById(dto.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("New item not found"));
        int newQty = dto.getQuantity();

        // CASE 1: Same item
        if (oldItem.getId().equals(newItem.getId())) {
            int stock = oldItem.getUnit();
            int difference = newQty - oldQty;

            oldItem.setUnit(stock + difference);
            itemRepository.save(oldItem);

        } else {
            // CASE 2: Item changed

            // Revert old stock
            int oldStock = oldItem.getUnit();
            oldItem.setUnit(oldStock - oldQty);
            itemRepository.save(oldItem);

            // Add to new item
            int newStock = newItem.getUnit();
            newItem.setUnit(newStock + newQty);
            itemRepository.save(newItem);

            existing.setItem(newItem);
        }

        existing.setQuantity(newQty);
        existing.setPricePerItem(dto.getPricePerItem());
        existing.setNote(dto.getNote());
        existing.setCreatedAt(dto.getCreatedAt());

        return mapToDTO(importItemRepository.save(existing));
    }


    @Override
    public void deleteImportItem(Long id) {
        ImportItem importItem = importItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ImportItem not found"));

        // Adjust stock
        Item item = importItem.getItem();
        item.setUnit(item.getUnit() - importItem.getQuantity());
        itemRepository.save(item);
        importItemRepository.delete(importItem);
    }
}
