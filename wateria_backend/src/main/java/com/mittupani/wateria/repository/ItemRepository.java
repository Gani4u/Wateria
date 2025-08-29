package com.mittupani.wateria.repository;

import com.mittupani.wateria.model.Item;
import com.mittupani.wateria.model.Plant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByNameContainingIgnoreCase(String name, Pageable pageable);
    @Query(value = """
       SELECT
        i.id AS itemId,
        i.name AS itemName,
        COALESCE(im.total_imported, 0) AS totalImported,
        COALESCE(ex.total_sold, 0) AS totalSold,
        COALESCE(u.total_used, 0) AS totalUsed,
        i.unit AS currentStock,
        COALESCE(im.actual_cost, 0) AS actualCost,
        COALESCE(ex.sales_value, 0) AS salesValue
        FROM item i
        LEFT JOIN (
            SELECT item_id, SUM(quantity) AS total_imported, SUM(quantity * price_per_item) AS actual_cost
            FROM import_item
            GROUP BY item_id
        ) im ON i.id = im.item_id
        LEFT JOIN (
            SELECT item_id, SUM(quantity) AS total_sold, SUM(quantity * price_per_item) AS sales_value
            FROM export_item
            GROUP BY item_id
        ) ex ON i.id = ex.item_id
        LEFT JOIN (
            SELECT item_id, SUM(quantity_used) AS total_used
            FROM internal_used_item
            GROUP BY item_id
        ) u ON i.id = u.item_id
        ORDER BY i.id;
    """, nativeQuery = true)
    List<Object[]> getItemStockReport();

    @Query(value = """
    SELECT
      COALESCE(SUM(im.actual_cost), 0) AS totalActualCost,
      COALESCE(SUM(ex.sales_value), 0) AS totalSalesValue,
      COALESCE(SUM(
        (im.import_qty - COALESCE(ex.export_qty, 0) - COALESCE(u.used_qty, 0))
        * (im.actual_cost / NULLIF(im.import_qty, 0))
      ), 0) AS inventoryValue
    FROM item i
    LEFT JOIN (
      SELECT item_id,
             SUM(quantity) AS import_qty,
             SUM(quantity * price_per_item) AS actual_cost
      FROM import_item
      GROUP BY item_id
    ) im ON i.id = im.item_id
    LEFT JOIN (
      SELECT item_id,
             SUM(quantity) AS export_qty,
             SUM(quantity * price_per_item) AS sales_value
      FROM export_item
      GROUP BY item_id
    ) ex ON i.id = ex.item_id
    LEFT JOIN (
      SELECT item_id,
             SUM(quantity_used) AS used_qty
      FROM internal_used_item
      GROUP BY item_id
    ) u ON i.id = u.item_id
    """, nativeQuery = true)
    Object[] getItemStockSummary();


}
