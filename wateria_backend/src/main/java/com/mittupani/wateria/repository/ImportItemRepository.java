package com.mittupani.wateria.repository;

import com.mittupani.wateria.model.ImportItem;
import com.mittupani.wateria.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportItemRepository extends JpaRepository<ImportItem, Long> {
    Page<ImportItem> findByItem_NameContainingIgnoreCase(String item, Pageable pageable);
    boolean existsBySupplierId(Long supplierId);
    boolean existsByItemId(Long itemId);
}
