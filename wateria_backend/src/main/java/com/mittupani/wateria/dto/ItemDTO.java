package com.mittupani.wateria.dto;

import com.mittupani.wateria.model.ItemType;
import lombok.Data;

@Data
public class ItemDTO {
    private Long id;
    private String name;
    private int unit;
    private ItemType type;
    private int totalImported;
    private int totalSold;
    private int totalUsed;
    private double actualCost;
    private double salesValue;
}
