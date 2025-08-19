package com.mittupani.wateria.controller;

import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.dto.DailyOrderAddUpDTO;
import com.mittupani.wateria.dto.DailyOrderDTO;
import com.mittupani.wateria.model.Status;
import com.mittupani.wateria.service.DailyOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/daily-orders")
@RequiredArgsConstructor
public class DailyOrderController {

    private final DailyOrderService dailyOrderService;

    @GetMapping
    public ResponseEntity<Page<DailyOrderDTO>> getAllDailyOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<DailyOrderDTO> result = dailyOrderService.getAllDailyOrders(query, status, pageable);
        return ResponseEntity.ok(result);
    }


    @PostMapping
    public ResponseEntity<DailyOrderDTO> createDailyOrder(@RequestBody DailyOrderDTO dto) {
        return ResponseEntity.ok(dailyOrderService.createDailyOrder(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyOrderDTO> updateDailyOrder(@PathVariable Long id, @RequestBody DailyOrderDTO dto) {
        return ResponseEntity.ok(dailyOrderService.updateDailyOrder(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyOrder(@PathVariable Long id) {
        dailyOrderService.deleteDailyOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public BulkOrderStatsDTO getDailyOrderStats(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        // Convert LocalDate to LocalDateTime for repository
        return dailyOrderService.getDailyOrderStats(
                startDate.atStartOfDay(),
                endDate.atTime(23, 59, 59)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyOrderDTO> getDailyOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(dailyOrderService.getDailyOrderById(id));
    }

    @PostMapping("/{id}/add-up")
    public ResponseEntity<DailyOrderDTO> addUpToDailyOrder(
            @PathVariable Long id,
            @RequestBody DailyOrderAddUpDTO addUpDTO) {

        DailyOrderDTO updated = dailyOrderService.addUpToDailyOrder(id, addUpDTO);
        return ResponseEntity.ok(updated);
    }
}

