package com.mittupani.wateria.controller;



import com.mittupani.wateria.dto.ImportItemDTO;
import com.mittupani.wateria.service.ImportItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/import-items")
@RequiredArgsConstructor
public class ImportItemController {

    private final ImportItemService importItemService;

    @GetMapping
    public ResponseEntity<Page<ImportItemDTO>> getAllImportItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(required = false) String query) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<ImportItemDTO> result = importItemService.getAllImportItems(query, pageable);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ImportItemDTO> getImportItemById(@PathVariable Long id) {
        return ResponseEntity.ok(importItemService.getImportItemById(id));
    }

    @PostMapping
    public ResponseEntity<ImportItemDTO> createImportItem(@RequestBody ImportItemDTO dto) {
        return ResponseEntity.ok(importItemService.createImportItem(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImportItemDTO> updateImportItem(@PathVariable Long id, @RequestBody ImportItemDTO dto) {
        return ResponseEntity.ok(importItemService.updateImportItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImportItem(@PathVariable Long id) {
        importItemService.deleteImportItem(id);
        return ResponseEntity.noContent().build();
    }
}
