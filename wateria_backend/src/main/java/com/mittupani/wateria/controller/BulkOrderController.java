package com.mittupani.wateria.controller;


import com.mittupani.wateria.dto.BulkOrderDTO;
import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.model.Status;
import com.mittupani.wateria.service.BulkOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bulk-orders")
@RequiredArgsConstructor
public class BulkOrderController {

    private final BulkOrderService bulkOrderService;

    @GetMapping
    public ResponseEntity<Page<BulkOrderDTO>> getAllBulkOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<BulkOrderDTO> result = bulkOrderService.getAllBulkOrders(query, status, pageable);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<BulkOrderDTO> createBulkOrder(@RequestBody BulkOrderDTO dto) {
        return ResponseEntity.ok(bulkOrderService.createBulkOrder(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BulkOrderDTO> updateBulkOrder(@PathVariable Long id, @RequestBody BulkOrderDTO dto) {
        return ResponseEntity.ok(bulkOrderService.updateBulkOrder(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBulkOrder(@PathVariable Long id) {
        bulkOrderService.deleteBulkOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public BulkOrderStatsDTO getBulkOrderStats(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        // Convert LocalDate to LocalDateTime for repository
        return bulkOrderService.getBulkOrderStats(
                startDate.atStartOfDay(),
                endDate.atTime(23, 59, 59)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<BulkOrderDTO> getById(@PathVariable Long id) {
        BulkOrderDTO dto = bulkOrderService.getBulkOrderById(id);
        return ResponseEntity.ok(dto);
    }
}
