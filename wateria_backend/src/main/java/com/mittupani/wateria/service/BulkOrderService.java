package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.BulkOrderDTO;
import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface BulkOrderService {
    Page<BulkOrderDTO> getAllBulkOrders(String query, Status status, Pageable pageable);
    BulkOrderDTO getBulkOrderById(Long id);
    BulkOrderDTO createBulkOrder(BulkOrderDTO dto);
    BulkOrderDTO updateBulkOrder(Long id, BulkOrderDTO dto);
    void deleteBulkOrder(Long id);
    BulkOrderStatsDTO getBulkOrderStats(LocalDateTime startDate, LocalDateTime endDate);
}
