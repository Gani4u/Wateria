package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.InternalUsedItemDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.InternalUsedItem;
import com.mittupani.wateria.model.Item;
import com.mittupani.wateria.repository.InternalUsedItemRepository;
import com.mittupani.wateria.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InternalUsedItemServiceImpl implements InternalUsedItemService {

    private final InternalUsedItemRepository internalUsedItemRepository;
    private final ItemRepository itemRepository;

    private InternalUsedItemDTO mapToDTO(InternalUsedItem item) {
        InternalUsedItemDTO dto = new InternalUsedItemDTO();
        dto.setId(item.getId());
        dto.setPricePerItem(item.getPricePerItem());

        if (item.getItem() != null) {
            dto.setItemId(item.getItem().getId());
            dto.setName(item.getItem().getName());
        } else {
            System.out.println("InternalUsedItem ID {} has no linked Item!"+item.getId());
            dto.setItemId(null);
        }

        dto.setQuantityUsed(item.getQuantityUsed());
        dto.setNote(item.getNote());
        dto.setCreatedAt(item.getCreatedAt());
        return dto;
    }


    private InternalUsedItem mapToEntity(InternalUsedItemDTO dto) {
        InternalUsedItem item = new InternalUsedItem();
        item.setId(dto.getId());
        item.setQuantityUsed(dto.getQuantityUsed());
        item.setNote(dto.getNote());
        item.setCreatedAt(dto.getCreatedAt());

        if (dto.getItemId() != null) {
            Item relatedItem = itemRepository.findById(dto.getItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
            item.setItem(relatedItem);
        }
        return item;
    }

    @Override
    public Page<InternalUsedItemDTO> getAllInternalUsedItems(Pageable pageable) {
        return internalUsedItemRepository.findAll(pageable)
                .map(this::mapToDTO);
    }


    @Override
    public InternalUsedItemDTO getInternalUsedItemById(Long id) {
        return internalUsedItemRepository.findById(id).map(this::mapToDTO).orElseThrow(() -> new ResourceNotFoundException("Internal used item not found"));
    }

    @Override
    public InternalUsedItemDTO createInternalUsedItem(InternalUsedItemDTO dto) {
        InternalUsedItem newItem = mapToEntity(dto);

        Item relatedItem = newItem.getItem();
        if (relatedItem == null) {
            throw new ResourceNotFoundException("Item not found");
        }

        // Decrease item quantity
        int updatedQuantity = relatedItem.getUnit() - newItem.getQuantityUsed();
        if (updatedQuantity < 0) {
            throw new IllegalArgumentException("Not enough quantity available in item stock.");
        }
        relatedItem.setUnit(updatedQuantity);
        itemRepository.save(relatedItem);

        return mapToDTO(internalUsedItemRepository.save(newItem));
    }


    @Override
    public InternalUsedItemDTO updateInternalUsedItem(Long id, InternalUsedItemDTO dto) {
        InternalUsedItem existing = internalUsedItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internal used item not found"));

        int oldQuantityUsed = existing.getQuantityUsed(); // snapshot before changing anything

        Item item = existing.getItem();
        if (item == null) {
            throw new ResourceNotFoundException("Linked item not found");
        }

        // Restore previous quantity first
        item.setUnit(item.getUnit() + oldQuantityUsed);

        // If itemId changed, switch item
        if (dto.getItemId() != null && !dto.getItemId().equals(item.getId())) {
            Item newItem = itemRepository.findById(dto.getItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
            existing.setItem(newItem);
            item = newItem; // switch reference
        }

        // Now update fields
        existing.setQuantityUsed(dto.getQuantityUsed());
        existing.setNote(dto.getNote());
        existing.setPricePerItem(dto.getPricePerItem());
        existing.setCreatedAt(dto.getCreatedAt());

        // Now check stock again
        int newAvailable = item.getUnit() - dto.getQuantityUsed();
        if (newAvailable < 0) {
            throw new IllegalArgumentException("Not enough quantity available in item stock.");
        }

        item.setUnit(newAvailable);
        itemRepository.save(item);

        return mapToDTO(internalUsedItemRepository.save(existing));
    }



    @Override
    public void deleteInternalUsedItem(Long id) {
        internalUsedItemRepository.deleteById(id);
    }
}
