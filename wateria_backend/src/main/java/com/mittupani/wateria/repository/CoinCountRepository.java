package com.mittupani.wateria.repository;

import com.mittupani.wateria.model.CoinCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinCountRepository extends JpaRepository<CoinCount, Long> {
}
