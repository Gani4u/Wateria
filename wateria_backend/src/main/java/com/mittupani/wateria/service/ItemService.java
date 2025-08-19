package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ItemDTO;
import com.mittupani.wateria.dto.ItemStockReportDTO;
import com.mittupani.wateria.dto.ItemStockSummaryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemService {
    Page<ItemDTO> getAllItems(String query,Pageable pageable);
    ItemDTO getItemById(Long id);
    ItemDTO createItem(ItemDTO dto);
    ItemDTO updateItem(Long id, ItemDTO dto);
    void deleteItem(Long id);
    // ✅ NEW: Stock Report API
    List<ItemStockReportDTO> getItemStockReport();

    ItemStockSummaryDTO getItemStockSummary();
}