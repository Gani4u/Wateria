package com.mittupani.wateria.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CoinCountDTO {
    private Long id;
    private Long plantId;

    private int openingCount;
    private int closingCount;

    private int coinsCollected;
    private double amountCollected;

    private String note;

    private LocalDateTime createdAt;
}
