package com.mittupani.wateria.service;

import com.mittupani.wateria.dto.ExpenseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExpenseService {
    Page<ExpenseDTO> getAllExpenses(Pageable pageable);
    ExpenseDTO getExpenseById(Long id);
    ExpenseDTO createExpense(ExpenseDTO dto);
    ExpenseDTO updateExpense(Long id, ExpenseDTO dto);
    void deleteExpense(Long id);
}
