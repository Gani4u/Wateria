package com.mittupani.wateria.controller;


import com.mittupani.wateria.dto.ExportItemDTO;
import com.mittupani.wateria.service.ExportItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/export-items")
@RequiredArgsConstructor
public class ExportItemController {

    private final ExportItemService exportItemService;

    @GetMapping
    public ResponseEntity<Page<ExportItemDTO>> getAllExportItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<ExportItemDTO> result = exportItemService.getAllExportItems(pageable);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ExportItemDTO> getExportItemById(@PathVariable Long id) {
        return ResponseEntity.ok(exportItemService.getExportItemById(id));
    }

    @PostMapping
    public ResponseEntity<ExportItemDTO> createExportItem(@RequestBody ExportItemDTO dto) {
        return ResponseEntity.ok(exportItemService.createExportItem(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExportItemDTO> updateExportItem(@PathVariable Long id, @RequestBody ExportItemDTO dto) {
        return ResponseEntity.ok(exportItemService.updateExportItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExportItem(@PathVariable Long id) {
        exportItemService.deleteExportItem(id);
        return ResponseEntity.noContent().build();
    }
}

