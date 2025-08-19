package com.mittupani.wateria.service;



import com.mittupani.wateria.dto.PlantDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.Plant;
import com.mittupani.wateria.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {

    private final PlantRepository plantRepository;

    private PlantDTO mapToDTO(Plant plant) {
        PlantDTO dto = new PlantDTO();
        dto.setId(plant.getId());
        dto.setName(plant.getName());
        dto.setLocation(plant.getLocation());
        return dto;
    }

    private Plant mapToEntity(PlantDTO dto) {
        Plant plant = new Plant();
        plant.setId(dto.getId());
        plant.setName(dto.getName());
        plant.setLocation(dto.getLocation());
        return plant;
    }

    @Override
    public Page<PlantDTO> getAllPlants(String query, Pageable pageable) {
        Page<Plant> pageResult;
        if (query != null && !query.trim().isEmpty()) {
            pageResult = plantRepository.findByNameContainingIgnoreCase(query, pageable);
        } else {
            pageResult = plantRepository.findAll(pageable);
        }
        return pageResult.map(this::mapToDTO);
    }

    @Override
    public PlantDTO getPlantById(Long id) {
        return plantRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
    }

    @Override
    public PlantDTO createPlant(PlantDTO dto) {
        Plant plant = mapToEntity(dto);
        return mapToDTO(plantRepository.save(plant));
    }

    @Override
    public PlantDTO updatePlant(Long id, PlantDTO dto) {
        Plant existing = plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

        existing.setName(dto.getName());
        existing.setLocation(dto.getLocation());

        return mapToDTO(plantRepository.save(existing));
    }

    @Override
    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }

}
