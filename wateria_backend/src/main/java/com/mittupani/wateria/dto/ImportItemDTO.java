package com.mittupani.wateria.dto;

import com.mittupani.wateria.model.Item;
import com.mittupani.wateria.model.Supplier;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ImportItemDTO {
    private Long id;
    private Long supplierId;
    private Long itemId;
    private int quantity;
    private double pricePerItem;
    private Item item;
    private Supplier supplier;
    private String note;
    private LocalDateTime createdAt;
}
