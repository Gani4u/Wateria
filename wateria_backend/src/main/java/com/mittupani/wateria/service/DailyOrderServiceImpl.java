package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.BulkOrderDTO;
import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.dto.DailyOrderAddUpDTO;
import com.mittupani.wateria.dto.DailyOrderDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.*;
import com.mittupani.wateria.repository.CustomerRepository;
import com.mittupani.wateria.repository.DailyOrderRepository;
import com.mittupani.wateria.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DailyOrderServiceImpl implements DailyOrderService {

    private final DailyOrderRepository dailyOrderRepository;
    private final CustomerRepository customerRepository;
    private final PlantRepository plantRepository;

    private DailyOrderDTO mapToDTO(DailyOrder order) {
        DailyOrderDTO dto = new DailyOrderDTO();
        dto.setId(order.getId());

        if (order.getCustomer() != null) {
            dto.setCustomerId(order.getCustomer().getId());
            dto.setCustomerName(order.getCustomer().getName());
            dto.setCustomerContact(order.getCustomer().getContactNumber());
        }

        if (order.getPlant() != null) {
            dto.setPlantId(order.getPlant().getId());
            dto.setPlantName(order.getPlant().getName());
        }

        dto.setCansGiven(order.getCansGiven());
        dto.setCansReturned(order.getCansReturned());
        dto.setCansPending(order.getCansPending());

        dto.setMoneyReceived(order.getMoneyReceived());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setPendingAmount(order.getPendingAmount());

        dto.setStatus(order.getStatus());

        dto.setNote(order.getNote());
        dto.setCreatedAt(order.getCreatedAt());
        return dto;
    }

    private DailyOrder mapToEntity(DailyOrderDTO dto) {
        DailyOrder order = new DailyOrder();
        order.setId(dto.getId());

        // Set Customer
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        order.setCustomer(customer);

        // Set Plant
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        order.setPlant(plant);

        // Basic Fields
        order.setCansGiven(dto.getCansGiven());
        order.setCansReturned(dto.getCansReturned());
        order.setMoneyReceived(dto.getMoneyReceived());
        order.setTotalAmount(dto.getTotalAmount());

        int cansPending = dto.getCansGiven() - dto.getCansReturned();
        double pendingAmount = dto.getTotalAmount() - dto.getMoneyReceived();

        order.setCansPending(cansPending);
        order.setPendingAmount(pendingAmount);

        if (cansPending <= 0 && pendingAmount <= 0) {
            order.setStatus(Status.COMPLETED);
        } else {
            order.setStatus(Status.PENDING);
        }

        order.setNote(dto.getNote());
        order.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());

        return order;
    }

    @Override
    public Page<DailyOrderDTO> getAllDailyOrders(String query, Status status, Pageable pageable) {
        Page<DailyOrder> pageResult;

        if ((query != null && !query.trim().isEmpty()) || status != null) {
            pageResult = dailyOrderRepository.searchByCustomerNameAndStatus(query != null ? query : "", status, pageable);
        } else {
            pageResult = dailyOrderRepository.findAll(pageable);
        }

        return pageResult.map(this::mapToDTO);
    }

    @Override
    public DailyOrderDTO getDailyOrderById(Long id) {
        return dailyOrderRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Daily order not found"));
    }

    @Override
    public DailyOrderDTO createDailyOrder(DailyOrderDTO dto) {
        DailyOrder order = mapToEntity(dto);
        return mapToDTO(dailyOrderRepository.save(order));
    }

    @Override
    public DailyOrderDTO updateDailyOrder(Long id, DailyOrderDTO dto) {
        DailyOrder existing = dailyOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Daily order not found"));

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

        existing.setCustomer(customer);
        existing.setPlant(plant);

        existing.setCansGiven(dto.getCansGiven());
        existing.setCansReturned(dto.getCansReturned());
        existing.setMoneyReceived(dto.getMoneyReceived());
        existing.setTotalAmount(dto.getTotalAmount());

        int cansPending = dto.getCansGiven() - dto.getCansReturned();
        double pendingAmount = dto.getTotalAmount() - dto.getMoneyReceived();

        existing.setCansPending(cansPending);
        existing.setPendingAmount(pendingAmount);
        existing.setStatus(cansPending <= 0 && pendingAmount <= 0 ? Status.COMPLETED : Status.PENDING);

        existing.setNote(dto.getNote());
        existing.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());

        return mapToDTO(dailyOrderRepository.save(existing));
    }

    @Override
    public void deleteDailyOrder(Long id) {
        dailyOrderRepository.deleteById(id);
    }

    @Override
    public BulkOrderStatsDTO getDailyOrderStats(LocalDateTime startDate, LocalDateTime endDate) {
        return dailyOrderRepository.getStats(startDate, endDate);
    }

        @Override
        public DailyOrderDTO addUpToDailyOrder(Long id, DailyOrderAddUpDTO addUpDTO) {
            DailyOrder order = dailyOrderRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("DailyOrder not found with id " + id));

            // Increment fields
            order.setCansGiven(order.getCansGiven() + addUpDTO.getCansGiven());
            order.setCansReturned(order.getCansReturned() + addUpDTO.getCansReturned());
            order.setTotalAmount(order.getTotalAmount() + addUpDTO.getTotalAmount());
            order.setMoneyReceived(order.getMoneyReceived() + addUpDTO.getMoneyReceived());

            // Recalculate
            int cansPending = order.getCansGiven() - order.getCansReturned();
            order.setCansPending(cansPending);

            double pendingAmount = order.getTotalAmount() - order.getMoneyReceived();
            order.setPendingAmount(pendingAmount);

            // Append note
            String newNote = (order.getNote() != null ? order.getNote() + " | " : "") + addUpDTO.getNote();
            order.setNote(newNote);

            return mapToDTO(dailyOrderRepository.save(order));
        }
    }
