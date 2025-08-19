package com.mittupani.wateria.repository;

import com.mittupani.wateria.model.Plant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    Page<Plant> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
