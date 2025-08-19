package com.mittupani.wateria.repository;

import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.model.BulkOrder;
import com.mittupani.wateria.model.Plant;
import com.mittupani.wateria.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface BulkOrderRepository extends JpaRepository<BulkOrder, Long> {

    @Query("""
SELECT b FROM BulkOrder b 
WHERE (:status IS NULL OR b.status = :status)
  AND (
    :searchTerm IS NULL OR :searchTerm = ''
    OR LOWER(b.customerName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
)
""")
    Page<BulkOrder> searchByCustomerNameAndStatus(
            @Param("searchTerm") String searchTerm,
            @Param("status") Status status,
            Pageable pageable
    );
    @Query("""
    SELECT new com.mittupani.wateria.dto.BulkOrderStatsDTO(
      COALESCE(SUM(bo.cansGiven), 0),
      COALESCE(SUM(bo.cansGiven - bo.cansReturned), 0),
      COALESCE(SUM(bo.totalAmount), 0),
      COALESCE(SUM(bo.totalAmount - bo.moneyReceived), 0),
      COALESCE(COUNT(DISTINCT CASE WHEN bo.status = 'PENDING' THEN bo.customerName ELSE null END), 0)
    )
    FROM BulkOrder bo
    WHERE bo.createdAt BETWEEN :startDate AND :endDate
""")
    BulkOrderStatsDTO getStats(LocalDateTime startDate, LocalDateTime endDate);

}
