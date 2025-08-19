package com.mittupani.wateria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ItemStockReportDTO {
    private Long itemId;
    private String itemName;
    private int totalImported;
    private int totalSold;
    private int totalUsed;
    private int currentStock;
    private double actualCost;
    private double salesValue;
}
