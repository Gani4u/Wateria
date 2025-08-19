package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ExpenseDTO;
import com.mittupani.wateria.exception.ResourceNotFoundException;
import com.mittupani.wateria.model.Expense;
import com.mittupani.wateria.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    private ExpenseDTO mapToDTO(Expense expense) {
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(expense.getId());
        dto.setPlantId(expense.getPlant().getId());
        dto.setMoneySpent(expense.getMoneySpent());
        dto.setReason(expense.getReason());
        dto.setNote(expense.getNote());
        dto.setCreatedAt(expense.getCreatedAt());
        return dto;
    }

    private Expense mapToEntity(ExpenseDTO dto) {
        Expense expense = new Expense();
        expense.setId(dto.getId());
        expense.setMoneySpent(dto.getMoneySpent());
        expense.setReason(dto.getReason());
        expense.setNote(dto.getNote());
        expense.setCreatedAt(dto.getCreatedAt());
        return expense;
    }

    @Override
    public Page<ExpenseDTO> getAllExpenses(Pageable pageable) {
        return expenseRepository.findAll(pageable)
                .map(this::mapToDTO);
    }


    @Override
    public ExpenseDTO getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));
    }

    @Override
    public ExpenseDTO createExpense(ExpenseDTO dto) {
        Expense expense = mapToEntity(dto);
        return mapToDTO(expenseRepository.save(expense));
    }

    @Override
    public ExpenseDTO updateExpense(Long id, ExpenseDTO dto) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        existing.setMoneySpent(dto.getMoneySpent());
        existing.setReason(dto.getReason());
        existing.setNote(dto.getNote());
        existing.setCreatedAt(dto.getCreatedAt());

        return mapToDTO(expenseRepository.save(existing));
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
