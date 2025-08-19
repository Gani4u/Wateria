package com.mittupani.wateria.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ExportItemDTO {
    private Long id;
    private String customerName;
    private String customerContact;
    private Long itemId;
    private String itemName;
    private int quantity;
    private int pricePerItem;
    private double moneyReceived;
    private String note;
    private LocalDateTime createdAt;
}
