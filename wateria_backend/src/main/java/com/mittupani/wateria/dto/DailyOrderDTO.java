package com.mittupani.wateria.dto;

import com.mittupani.wateria.model.Status;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DailyOrderDTO {
    private Long id;
    private Long plantId;
    private String plantName;
    private Long customerId;
    private String customerName;
    private String customerContact;
    private int cansGiven;
    private int cansReturned;
    private int cansPending;
    private double moneyReceived;
    private double totalAmount;
    private double pendingAmount;
    private Status status;
    private String note;
    private LocalDateTime createdAt;
}
