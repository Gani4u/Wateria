package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.BulkOrderDTO;
import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.*;
import com.mittupani.wateria.repository.BulkOrderRepository;
import com.mittupani.wateria.repository.CustomerRepository;
import com.mittupani.wateria.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BulkOrderServiceImpl implements BulkOrderService {

    private final BulkOrderRepository bulkOrderRepository;
    private final CustomerRepository customerRepository;
    private final PlantRepository plantRepository;

    private BulkOrderDTO mapToDTO(BulkOrder order) {
        BulkOrderDTO dto = new BulkOrderDTO();
        dto.setId(order.getId());
        dto.setPlantId(order.getPlant().getId());
        dto.setPlantName(order.getPlant().getName());
        if (order.getCustomer() != null) {
            // Use the customer entity data
            dto.setCustomerId(order.getCustomer().getId());
            dto.setCustomerName(order.getCustomer().getName());
            dto.setContactNumber(order.getCustomer().getContactNumber());
        } else {
            // Use the fallback fields directly from BulkOrder table
            dto.setCustomerId(null);
            dto.setCustomerName(order.getCustomerName());
            dto.setContactNumber(order.getContactNumber());
        }
        dto.setCansGiven(order.getCansGiven());
        dto.setCansPending(dto.getCansPending());
        dto.setMoneyReceived(order.getMoneyReceived());
        dto.setCansReturned(order.getCansReturned());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setPendingAmount(order.getPendingAmount());
        dto.setNote(order.getNote());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        return dto;
    }

    private BulkOrder mapToEntity(BulkOrderDTO dto) {
        BulkOrder order = new BulkOrder();

        // Set plant
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found with id: " + dto.getPlantId()));
        order.setPlant(plant);

        // Set customer if provided
        if (dto.getCustomerId() != null) {
            Customer customer = customerRepository.findById(dto.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + dto.getCustomerId()));
            order.setCustomer(customer);
        } else {
            order.setCustomer(null);
            order.setCustomerName(dto.getCustomerName());
            order.setContactNumber(dto.getContactNumber());
        }

        order.setId(dto.getId());
        order.setCansGiven(dto.getCansGiven());
        order.setCansPending(dto.getCansPending());
        order.setMoneyReceived(dto.getMoneyReceived());
        order.setCansReturned(dto.getCansReturned());
        order.setTotalAmount(dto.getTotalAmount());
        order.setPendingAmount(dto.getPendingAmount());
        order.setNote(dto.getNote());
        // ✅ Always calculate derived values
        int cansPending = dto.getCansGiven() - dto.getCansReturned();
        double pendingAmount = dto.getTotalAmount() - dto.getMoneyReceived();

        order.setCansPending(cansPending);
        order.setPendingAmount(pendingAmount);

        // ✅ Determine status
        if (cansPending <= 0 && pendingAmount <= 0) {
            order.setStatus(Status.COMPLETED);
        } else {
            order.setStatus(Status.PENDING);
        }

        order.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());

        return order;
    }

    @Override
    public Page<BulkOrderDTO> getAllBulkOrders(String query, Status status, Pageable pageable) {
        Page<BulkOrder> pageResult;

        if ((query != null && !query.trim().isEmpty()) || status != null) {
            pageResult = bulkOrderRepository.searchByCustomerNameAndStatus(query != null ? query : "", status, pageable);
        } else {
            pageResult = bulkOrderRepository.findAll(pageable);
        }

        return pageResult.map(this::mapToDTO);
    }


    @Override
    public BulkOrderDTO getBulkOrderById(Long id) {
        return bulkOrderRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Bulk order not found"));
    }

    @Override
    public BulkOrderDTO createBulkOrder(BulkOrderDTO dto) {
        BulkOrder order = mapToEntity(dto);
        return mapToDTO(bulkOrderRepository.save(order));
    }

    @Override
    public BulkOrderDTO updateBulkOrder(Long id, BulkOrderDTO dto) {
        BulkOrder existing = bulkOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bulk order not found"));

        existing.setCansGiven(dto.getCansGiven());
        existing.setMoneyReceived(dto.getMoneyReceived());
        existing.setCansReturned(dto.getCansReturned());
        existing.setNote(dto.getNote());

        int cansPending = dto.getCansGiven() - dto.getCansReturned();
        double pendingAmount = dto.getTotalAmount() - dto.getMoneyReceived();

        existing.setCansPending(cansPending);
        existing.setPendingAmount(pendingAmount);

        if (cansPending <= 0 && pendingAmount <= 0) {
            existing.setStatus(Status.COMPLETED);
        } else {
            existing.setStatus(Status.PENDING);
        }

        if (dto.getCustomerId() == null) {
            existing.setCustomer(null);
            existing.setCustomerName(dto.getCustomerName());
            existing.setContactNumber(dto.getContactNumber());
        }else{
            existing.setCustomerName(dto.getCustomerName());
            existing.setContactNumber(dto.getContactNumber());
        }

        existing.setCreatedAt(dto.getCreatedAt());

        return mapToDTO(bulkOrderRepository.save(existing));
    }

    @Override
    public void deleteBulkOrder(Long id) {
        bulkOrderRepository.deleteById(id);
    }

    @Override
    public BulkOrderStatsDTO getBulkOrderStats(LocalDateTime startDate, LocalDateTime endDate) {
        return bulkOrderRepository.getStats(startDate, endDate);
    }
}
