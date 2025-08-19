package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.CustomerDTO;
import com.mittupani.wateria.dto.PlantDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {
    Page<CustomerDTO> getAllCustomers(String query, Pageable pageable);
    CustomerDTO getCustomerById(Long id);
    CustomerDTO createCustomer(CustomerDTO dto);
    CustomerDTO updateCustomer(Long id, CustomerDTO dto);
    void deleteCustomer(Long id);
}
