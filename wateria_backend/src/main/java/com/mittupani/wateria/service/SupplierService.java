package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.SupplierDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SupplierService {
    Page<SupplierDTO> getAllSuppliers(String query, Pageable pageable);
    SupplierDTO getSupplierById(Long id);
    SupplierDTO createSupplier(SupplierDTO dto);
    SupplierDTO updateSupplier(Long id, SupplierDTO dto);
    void deleteSupplier(Long id);
}
