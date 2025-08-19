package com.mittupani.wateria.controller;

import com.mittupani.wateria.dto.ItemDTO;
import com.mittupani.wateria.dto.ItemStockReportDTO;
import com.mittupani.wateria.dto.ItemStockSummaryDTO;
import com.mittupani.wateria.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<Page<ItemDTO>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(required = false) String query) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<ItemDTO> result = itemService.getAllItems(query, pageable);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO dto) {
        return ResponseEntity.ok(itemService.createItem(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long id, @RequestBody ItemDTO dto) {
        return ResponseEntity.ok(itemService.updateItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/stock-report")
    public List<ItemStockReportDTO> getItemStockReport() {
        return itemService.getItemStockReport();
    }

    @GetMapping("/summary")
    public ItemStockSummaryDTO getItemStockSummary(){ return itemService.getItemStockSummary();}
}

