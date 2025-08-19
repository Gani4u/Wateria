package com.mittupani.wateria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoinCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    private Plant plant;

    private int openingCount;
    private int closingCount;

    private int coinsCollected;   // Could be computed, but store for audit
    private double amountCollected;

    private String note;

    private LocalDateTime createdAt = LocalDateTime.now();
}
