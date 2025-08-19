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
public class InternalUsedItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "quantity_used") // ✅ explicit
    private int quantityUsed;

    @Column(name = "price_per_item") // ✅ explicit
    private double pricePerItem;

    private String note;

    private LocalDateTime createdAt = LocalDateTime.now();
}

