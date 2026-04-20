package com.expense.tracker.service;

import com.expense.tracker.model.Expense;
import com.expense.tracker.model.ExpenseGroup;
import com.expense.tracker.repository.ExpenseRepository;
import com.expense.tracker.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExpenseService {
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    @Autowired
    private GroupRepository groupRepository;
    
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
    
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }
    
    public List<Expense> getExpensesByGroupId(Long groupId) {
        return expenseRepository.findByGroupId(groupId);
    }
    
    public Expense createExpense(Long groupId, Expense expense) {
        Optional<ExpenseGroup> group = groupRepository.findById(groupId);
        if (group.isPresent()) {
            expense.setGroup(group.get());
            return expenseRepository.save(expense);
        }
        return null;
    }
    
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            Expense existingExpense = expense.get();
            if (expenseDetails.getDescription() != null) {
                existingExpense.setDescription(expenseDetails.getDescription());
            }
            if (expenseDetails.getAmount() != null) {
                existingExpense.setAmount(expenseDetails.getAmount());
            }
            if (expenseDetails.getDate() != null) {
                existingExpense.setDate(expenseDetails.getDate());
            }
            return expenseRepository.save(existingExpense);
        }
        return null;
    }
    
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
