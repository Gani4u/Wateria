package com.mittupani.wateria.repository;

import com.mittupani.wateria.model.InternalUsedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternalUsedItemRepository extends JpaRepository<InternalUsedItem, Long> {
}
