package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.CoinCountDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CoinCountService {
    Page<CoinCountDTO> getAllCoinCounts(Pageable pageable);
    CoinCountDTO getCoinCountById(Long id);
    CoinCountDTO createCoinCount(CoinCountDTO dto);
    CoinCountDTO updateCoinCount(Long id, CoinCountDTO dto);
    void deleteCoinCount(Long id);
}
