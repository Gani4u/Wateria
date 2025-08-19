package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ExportItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExportItemService {
    Page<ExportItemDTO> getAllExportItems(Pageable pageable);
    ExportItemDTO getExportItemById(Long id);
    ExportItemDTO createExportItem(ExportItemDTO dto);
    ExportItemDTO updateExportItem(Long id, ExportItemDTO dto);
    void deleteExportItem(Long id);
}
