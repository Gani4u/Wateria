package com.mittupani.wateria.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int unit=0;

    @Enumerated(EnumType.STRING)
    private ItemType type; // enum: IMPORT, EXPORT, INTERNAL
}

