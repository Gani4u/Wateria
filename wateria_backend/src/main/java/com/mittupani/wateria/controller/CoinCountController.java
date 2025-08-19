package com.mittupani.wateria.controller;


import com.mittupani.wateria.dto.CoinCountDTO;
import com.mittupani.wateria.service.CoinCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coin-counts")
@RequiredArgsConstructor
public class CoinCountController {

    private final CoinCountService coinCountService;

    @GetMapping
    public ResponseEntity<Page<CoinCountDTO>> getAllCoinCounts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<CoinCountDTO> result = coinCountService.getAllCoinCounts(pageable);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CoinCountDTO> getCoinCountById(@PathVariable Long id) {
        return ResponseEntity.ok(coinCountService.getCoinCountById(id));
    }

    @PostMapping
    public ResponseEntity<CoinCountDTO> createCoinCount(@RequestBody CoinCountDTO dto) {
        return ResponseEntity.ok(coinCountService.createCoinCount(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoinCountDTO> updateCoinCount(@PathVariable Long id, @RequestBody CoinCountDTO dto) {
        return ResponseEntity.ok(coinCountService.updateCoinCount(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoinCount(@PathVariable Long id) {
        coinCountService.deleteCoinCount(id);
        return ResponseEntity.noContent().build();
    }
}

