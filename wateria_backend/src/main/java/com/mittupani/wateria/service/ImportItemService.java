package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ImportItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ImportItemService {
    Page<ImportItemDTO> getAllImportItems(String query, Pageable pageable);
    ImportItemDTO getImportItemById(Long id);
    ImportItemDTO createImportItem(ImportItemDTO dto);
    ImportItemDTO updateImportItem(Long id, ImportItemDTO dto);
    void deleteImportItem(Long id);
}
