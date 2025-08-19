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
public class ExportItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerContact;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private int quantity;
    private int pricePerItem;
    private double moneyReceived;

    private String note;

    private LocalDateTime createdAt = LocalDateTime.now();
}

