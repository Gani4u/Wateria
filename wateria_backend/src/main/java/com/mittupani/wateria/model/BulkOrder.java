package com.mittupani.wateria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class BulkOrder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    private Plant plant;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String customerName;
    private String contactNumber;

    private int cansGiven;
    private int cansReturned;
    private int cansPending;
    private double totalAmount;
    private double moneyReceived;
    private double pendingAmount;
    @Enumerated(EnumType.STRING)
    private Status status;

    private String note;

    private LocalDateTime createdAt = LocalDateTime.now();
}

