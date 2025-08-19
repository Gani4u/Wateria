package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.SupplierDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.Supplier;
import com.mittupani.wateria.repository.ImportItemRepository;
import com.mittupani.wateria.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final ImportItemRepository importItemRepository;

    private SupplierDTO mapToDTO(Supplier supplier) {
        SupplierDTO dto = new SupplierDTO();
        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setContact(supplier.getContact());
        return dto;
    }

    private Supplier mapToEntity(SupplierDTO dto) {
        Supplier supplier = new Supplier();
        supplier.setId(dto.getId());
        supplier.setName(dto.getName());
        supplier.setContact(dto.getContact());
        return supplier;
    }

    @Override
    public Page<SupplierDTO> getAllSuppliers(String query, Pageable pageable) {
        Page<Supplier> pageResult;
        if(query != null && !query.trim().isEmpty()){
            pageResult = supplierRepository.findByNameContainingIgnoreCase(query, pageable);
        }else{
            pageResult = supplierRepository.findAll(pageable);
        }
        return pageResult.map(this::mapToDTO);
    }


    @Override
    public SupplierDTO getSupplierById(Long id) {
        return supplierRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
    }

    @Override
    public SupplierDTO createSupplier(SupplierDTO dto) {
        Supplier supplier = mapToEntity(dto);
        return mapToDTO(supplierRepository.save(supplier));
    }

    @Override
    public SupplierDTO updateSupplier(Long id, SupplierDTO dto) {
        Supplier existing = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        existing.setName(dto.getName());
        existing.setContact(dto.getContact());

        return mapToDTO(supplierRepository.save(existing));
    }

    @Override
    public void deleteSupplier(Long id) {
        boolean hasLinkedImportItems = importItemRepository.existsBySupplierId(id);
        if (hasLinkedImportItems) {
            throw new IllegalStateException("Cannot delete supplier — it's linked with existing import items.");
        }
        supplierRepository.deleteById(id);
    }
}
