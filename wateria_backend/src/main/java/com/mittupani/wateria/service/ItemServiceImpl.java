package com.mittupani.wateria.service;

import java.util.List;

import com.mittupani.wateria.dto.ItemDTO;
import com.mittupani.wateria.dto.ItemStockReportDTO;
import com.mittupani.wateria.dto.ItemStockSummaryDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.Item;
import com.mittupani.wateria.model.Plant;
import com.mittupani.wateria.repository.ImportItemRepository;
import com.mittupani.wateria.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final ImportItemRepository importItemRepository;

    private ItemDTO mapToDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setUnit(item.getUnit());
        dto.setType(item.getType());
        return dto;
    }

    private Item mapToEntity(ItemDTO dto) {
        Item item = new Item();
        item.setId(dto.getId());
        item.setName(dto.getName());
        item.setUnit(dto.getUnit());
        item.setType(dto.getType());
        return item;
    }

    @Override
    public Page<ItemDTO> getAllItems(String query,Pageable pageable) {
        Page<Item> pageResult;
        if (query != null && !query.trim().isEmpty()) {
            pageResult = itemRepository.findByNameContainingIgnoreCase(query, pageable);
        } else {
            pageResult = itemRepository.findAll(pageable);
        }
        return pageResult.map(this::mapToDTO);
    }


    @Override
    public ItemDTO getItemById(Long id) {
        return itemRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
    }

    @Override
    public ItemDTO createItem(ItemDTO dto) {
        Item item = mapToEntity(dto);
        return mapToDTO(itemRepository.save(item));
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO dto) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        existing.setName(dto.getName());
        existing.setUnit(dto.getUnit());
        existing.setType(dto.getType());

        return mapToDTO(itemRepository.save(existing));
    }

    @Override
    public void deleteItem(Long id) {
        boolean hasLinkedImportItems = importItemRepository.existsByItemId(id);
        if (hasLinkedImportItems) {
            throw new IllegalStateException("Cannot delete item — it has linked import records.");
        }
        itemRepository.deleteById(id);
    }

    @Override
    public List<ItemStockReportDTO> getItemStockReport() {
        List<Object[]> rows = itemRepository.getItemStockReport();
        return rows.stream().map(r ->
                new ItemStockReportDTO(
                        ((Number) r[0]).longValue(),
                        (String) r[1],
                        ((Number) r[2]).intValue(),
                        ((Number) r[3]).intValue(),
                        ((Number) r[4]).intValue(),
                        ((Number) r[5]).intValue(),
                        ((Number) r[6]).doubleValue(),
                        ((Number) r[7]).doubleValue()
                )
        ).toList();
    }

    @Override
    public ItemStockSummaryDTO getItemStockSummary() {
        Object[] row = itemRepository.getItemStockSummary();
        if (row == null) {
            return new ItemStockSummaryDTO(0.0, 0.0);
        }

        // If row is really [ [ value1, value2 ] ]
        if (row.length == 1 && row[0] instanceof Object[]) {
            row = (Object[]) row[0];
        }

        double totalActualCost = row[0] != null ? ((Number) row[0]).doubleValue() : 0.0;
        double totalSalesValue = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;

        return new ItemStockSummaryDTO(totalActualCost, totalSalesValue);
    }


}
