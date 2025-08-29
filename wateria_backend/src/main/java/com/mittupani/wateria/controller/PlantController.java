package com.mittupani.wateria.controller;

import com.mittupani.wateria.dto.PlantDTO;
import com.mittupani.wateria.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor

public class PlantController {

    private final PlantService plantService;

    @GetMapping
    public ResponseEntity<Page<PlantDTO>> getAllPlants(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size,
                                                       @RequestParam(defaultValue = "id") String sortBy,
                                                       @RequestParam(required = false) String query) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<PlantDTO> result = plantService.getAllPlants(query, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantDTO> getPlantById(@PathVariable Long id) {
        return ResponseEntity.ok(plantService.getPlantById(id));
    }

    @PostMapping
    public ResponseEntity<PlantDTO> createPlant(@RequestBody PlantDTO dto) {
        return ResponseEntity.ok(plantService.createPlant(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantDTO> updatePlant(@PathVariable Long id, @RequestBody PlantDTO dto) {
        return ResponseEntity.ok(plantService.updatePlant(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
        return ResponseEntity.noContent().build();
    }
}
