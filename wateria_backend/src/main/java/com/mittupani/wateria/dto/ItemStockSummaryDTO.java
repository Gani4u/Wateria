package com.mittupani.wateria.dto;

public record ItemStockSummaryDTO(
        double totalActualCost,
        double totalSalesValue,
        double inventoryValue
) {}
