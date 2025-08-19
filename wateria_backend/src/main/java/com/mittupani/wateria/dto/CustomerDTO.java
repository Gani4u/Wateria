package com.mittupani.wateria.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CustomerDTO {
    private Long id;
    private String name;
    private String contactNumber;
    private LocalDateTime createdAt;
}
