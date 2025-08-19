package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.dto.DailyOrderAddUpDTO;
import com.mittupani.wateria.dto.DailyOrderDTO;
import com.mittupani.wateria.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;


public interface DailyOrderService {
    Page<DailyOrderDTO> getAllDailyOrders(String query, Status status, Pageable pageable);
    DailyOrderDTO getDailyOrderById(Long id);
    DailyOrderDTO createDailyOrder(DailyOrderDTO dto);
    DailyOrderDTO updateDailyOrder(Long id, DailyOrderDTO dto);
    void deleteDailyOrder(Long id);
    BulkOrderStatsDTO getDailyOrderStats(LocalDateTime startDate, LocalDateTime endDate);
    DailyOrderDTO addUpToDailyOrder(Long id, DailyOrderAddUpDTO addUpDTO);
}
