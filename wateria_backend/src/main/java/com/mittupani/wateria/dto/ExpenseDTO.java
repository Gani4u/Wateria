package com.mittupani.wateria.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ExpenseDTO {
    private Long id;
    private Long plantId;
    private double moneySpent;
    private String reason;
    private String note;
    private LocalDateTime createdAt;
}
