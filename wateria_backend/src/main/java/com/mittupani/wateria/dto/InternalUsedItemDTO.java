package com.mittupani.wateria.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InternalUsedItemDTO {
    private Long id;
    private Long itemId;
    private int quantityUsed;
    private double pricePerItem;
    private String note;
    private LocalDateTime createdAt;
}