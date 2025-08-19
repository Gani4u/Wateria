package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.CoinCountDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.CoinCount;
import com.mittupani.wateria.model.Plant;
import com.mittupani.wateria.repository.CoinCountRepository;
import com.mittupani.wateria.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoinCountServiceImpl implements CoinCountService {

    private final CoinCountRepository coinCountRepository;

    @Autowired
    private PlantRepository plantRepository;

    private CoinCountDTO mapToDTO(CoinCount count) {
        CoinCountDTO dto = new CoinCountDTO();
        dto.setId(count.getId());
        dto.setPlantId(count.getPlant().getId());
        dto.setOpeningCount(count.getOpeningCount());
        dto.setClosingCount(count.getClosingCount());
        dto.setCoinsCollected(count.getCoinsCollected());
        dto.setAmountCollected(count.getAmountCollected());
        dto.setNote(count.getNote());
        dto.setCreatedAt(count.getCreatedAt());
        return dto;
    }

    private CoinCount mapToEntity(CoinCountDTO dto) {
        CoinCount count = new CoinCount();
        count.setId(dto.getId());
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        count.setPlant(plant);

        count.setOpeningCount(dto.getOpeningCount());
        count.setClosingCount(dto.getClosingCount());
        count.setCoinsCollected(dto.getCoinsCollected());
        count.setAmountCollected(dto.getAmountCollected());
        count.setNote(dto.getNote());
        count.setCreatedAt(dto.getCreatedAt());
        return count;
    }



    @Override
    public Page<CoinCountDTO> getAllCoinCounts(Pageable pageable) {
        return coinCountRepository.findAll(pageable)
                .map(this::mapToDTO);
    }


    @Override
    public CoinCountDTO getCoinCountById(Long id) {
        return coinCountRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Coin count not found"));
    }

    @Override
    public CoinCountDTO createCoinCount(CoinCountDTO dto) {
        CoinCount count = mapToEntity(dto);

        // Calculate automatically
        int coinsCollected = dto.getClosingCount() - dto.getOpeningCount();
        double amountCollected = coinsCollected * 5;

        count.setCoinsCollected(coinsCollected);
        count.setAmountCollected(amountCollected);

        return mapToDTO(coinCountRepository.save(count));
    }


    @Override
    public CoinCountDTO updateCoinCount(Long id, CoinCountDTO dto) {
        CoinCount existing = coinCountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coin count not found"));

        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        existing.setPlant(plant);

        existing.setOpeningCount(dto.getOpeningCount());
        existing.setClosingCount(dto.getClosingCount());

        int coinsCollected = existing.getClosingCount() - existing.getOpeningCount();
        double amountCollected = coinsCollected * 5;

        existing.setCoinsCollected(coinsCollected);
        existing.setAmountCollected(amountCollected);

        existing.setNote(dto.getNote());
        existing.setCreatedAt(dto.getCreatedAt());

        return mapToDTO(coinCountRepository.save(existing));
    }

    @Override
    public void deleteCoinCount(Long id) {
        coinCountRepository.deleteById(id);
    }
}
