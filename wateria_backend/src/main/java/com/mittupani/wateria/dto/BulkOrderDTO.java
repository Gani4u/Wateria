package com.mittupani.wateria.dto;

import com.mittupani.wateria.model.Status;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BulkOrderDTO {
    private Long id;
    private Long plantId;
    private String plantName;
    private Long customerId;
    private String customerName;
    private String contactNumber;
    private int cansGiven;
    private int cansPending;
    private double totalAmount;
    private double moneyReceived;
    private double pendingAmount;
    private int cansReturned;
    private String note;
    private Status status;
    private LocalDateTime createdAt;
}
