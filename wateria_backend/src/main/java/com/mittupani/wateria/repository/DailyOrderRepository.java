package com.mittupani.wateria.repository;

import com.mittupani.wateria.dto.BulkOrderStatsDTO;
import com.mittupani.wateria.model.BulkOrder;
import com.mittupani.wateria.model.DailyOrder;
import com.mittupani.wateria.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DailyOrderRepository extends JpaRepository<DailyOrder, Long> {
    @Query("""
SELECT b FROM DailyOrder b 
WHERE (:status IS NULL OR b.status = :status)
  AND (
    :searchTerm IS NULL OR :searchTerm = ''
    OR LOWER(b.customer.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
)
""")
    Page<DailyOrder> searchByCustomerNameAndStatus(
            @Param("searchTerm") String searchTerm,
            @Param("status") Status status,
            Pageable pageable
    );

    @Query("""
        SELECT new com.mittupani.wateria.dto.BulkOrderStatsDTO(
          COALESCE(SUM(do.cansGiven), 0),
          COALESCE(SUM(do.cansGiven - do.cansReturned), 0),
          COALESCE(SUM(do.totalAmount), 0),
          COALESCE(SUM(do.totalAmount - do.moneyReceived), 0),
          COALESCE(COUNT(DISTINCT CASE WHEN do.status = 'PENDING' THEN do.customer.id ELSE null END), 0)
        )
        FROM DailyOrder do
        WHERE do.createdAt BETWEEN :startDate AND :endDate
    """)
    BulkOrderStatsDTO getStats(LocalDateTime startDate, LocalDateTime endDate);
}
