package com.mittupani.wateria.controller;

import com.mittupani.wateria.dto.InternalUsedItemDTO;
import com.mittupani.wateria.service.InternalUsedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internal-items")
@RequiredArgsConstructor
public class InternalUsedItemController {

    private final InternalUsedItemService internalUsedItemService;

    @GetMapping
    public ResponseEntity<Page<InternalUsedItemDTO>> getAllInternalUsedItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<InternalUsedItemDTO> result = internalUsedItemService.getAllInternalUsedItems(pageable);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<InternalUsedItemDTO> getInternalUsedItemById(@PathVariable Long id) {
        return ResponseEntity.ok(internalUsedItemService.getInternalUsedItemById(id));
    }

    @PostMapping
    public ResponseEntity<InternalUsedItemDTO> createInternalUsedItem(@RequestBody InternalUsedItemDTO dto) {
        return ResponseEntity.ok(internalUsedItemService.createInternalUsedItem(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternalUsedItemDTO> updateInternalUsedItem(@PathVariable Long id, @RequestBody InternalUsedItemDTO dto) {
        return ResponseEntity.ok(internalUsedItemService.updateInternalUsedItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternalUsedItem(@PathVariable Long id) {
        internalUsedItemService.deleteInternalUsedItem(id);
        return ResponseEntity.noContent().build();
    }
}

