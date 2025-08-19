package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.InternalUsedItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InternalUsedItemService {
    Page<InternalUsedItemDTO> getAllInternalUsedItems(Pageable pageable);
    InternalUsedItemDTO getInternalUsedItemById(Long id);
    InternalUsedItemDTO createInternalUsedItem(InternalUsedItemDTO dto);
    InternalUsedItemDTO updateInternalUsedItem(Long id, InternalUsedItemDTO dto);
    void deleteInternalUsedItem(Long id);
}
