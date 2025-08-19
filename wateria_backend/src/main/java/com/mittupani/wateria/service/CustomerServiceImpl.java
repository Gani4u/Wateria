package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.CustomerDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.Customer;
import com.mittupani.wateria.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    private CustomerDTO mapToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setContactNumber(customer.getContactNumber());
        dto.setCreatedAt(customer.getCreatedAt());
        return dto;
    }

    private Customer mapToEntity(CustomerDTO dto) {
        Customer customer = new Customer();
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setContactNumber(dto.getContactNumber());
        customer.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : java.time.LocalDateTime.now());
        return customer;
    }


    @Override
    public Page<CustomerDTO> getAllCustomers(String query, Pageable pageable) {
        Page<Customer> pageResult;
        if (query != null && !query.trim().isEmpty()) {
            pageResult = customerRepository.findByNameContainingIgnoreCase(query, pageable);
        } else {
            pageResult = customerRepository.findAll(pageable);
        }
        return pageResult.map(this::mapToDTO);
    }


    @Override
    public CustomerDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
    }

    @Override
    public CustomerDTO createCustomer(CustomerDTO dto) {
        Customer customer = mapToEntity(dto);
        return mapToDTO(customerRepository.save(customer));
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        existing.setName(dto.getName());
        existing.setContactNumber(dto.getContactNumber());

        return mapToDTO(customerRepository.save(existing));
    }


    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}

