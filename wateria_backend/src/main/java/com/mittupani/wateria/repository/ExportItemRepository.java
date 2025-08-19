package com.mittupani.wateria.repository;

import com.mittupani.wateria.model.ExportItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExportItemRepository extends JpaRepository<ExportItem, Long> {
}
