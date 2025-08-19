package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.PlantDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlantService {
    Page<PlantDTO> getAllPlants(String query, Pageable pageable);
    PlantDTO getPlantById(Long id);
    PlantDTO createPlant(PlantDTO dto);
    PlantDTO updatePlant(Long id, PlantDTO dto);
    void deletePlant(Long id);
}
