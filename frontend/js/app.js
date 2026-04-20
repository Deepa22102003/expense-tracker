// API Configuration
const API_URL = 'https://expense-tracker-qgdq.onrender.com/api';
let currentEditId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    setExpenseDate();
    loadExpenseGroupSelect();
});

// Set today's date as default
function setExpenseDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDate').value = today;
    document.getElementById('editDate').value = today;
}

// Show Section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Set active nav button
    event.target.classList.add('active');
    
    // Load appropriate data
    if (sectionName === 'groups') {
        loadGroups();
    } else if (sectionName === 'expenses') {
        loadExpenses();
    } else if (sectionName === 'dashboard') {
        loadDashboard();
    }
}

// ============ DASHBOARD FUNCTIONS ============

function loadDashboard() {
    fetch(`${API_URL}/groups`)
        .then(response => response.json())
        .then(groups => {
            let totalAmount = 0;
            let totalExpenses = 0;
            let recentExpenses = [];

            groups.forEach(group => {
                group.expenses.forEach(expense => {
                    totalAmount += expense.amount;
                    totalExpenses++;
                    recentExpenses.push({...expense, groupName: group.name});
                });
            });

            // Sort by date and get last 5
            recentExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
            recentExpenses = recentExpenses.slice(0, 5);

            // Update dashboard
            document.getElementById('totalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
            document.getElementById('groupCount').textContent = groups.length;
            document.getElementById('expenseCount').textContent = totalExpenses;

            // Display recent expenses
            const recentDiv = document.getElementById('recentExpenses');
            if (recentExpenses.length === 0) {
                recentDiv.innerHTML = '<p class="no-data">No expenses yet. Create a group to get started!</p>';
            } else {
                recentDiv.innerHTML = recentExpenses.map(expense => `
                    <div class="expense-item">
                        <div class="expense-item-info">
                            <h4>${expense.description}</h4>
                            <p>${expense.groupName} • ${formatDate(expense.date)}</p>
                        </div>
                        <div class="expense-item-amount">₹${expense.amount.toFixed(2)}</div>
                    </div>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error loading dashboard:', error);
            showError('Failed to load dashboard');
        });
}

// ============ GROUP FUNCTIONS ============

function loadGroups() {
    fetch(`${API_URL}/groups`)
        .then(response => response.json())
        .then(groups => {
            const groupsList = document.getElementById('groupsList');
            
            if (groups.length === 0) {
                groupsList.innerHTML = '<p class="no-data">No groups yet. Create one to start tracking!</p>';
            } else {
                groupsList.innerHTML = groups.map(group => {
                    const totalExpense = group.expenses.reduce((sum, exp) => sum + exp.amount, 0);
                    const expenseCount = group.expenses.length;
                    
                    return `
                        <div class="group-card card">
                            <h3>${group.name}</h3>
                            ${group.description ? `<p>${group.description}</p>` : ''}
                            <div class="group-stats">
                                <div class="group-stat">
                                    <span>Total Expenses</span>
                                    <span class="group-stat-value">₹${totalExpense.toFixed(2)}</span>
                                </div>
                                <div class="group-stat">
                                    <span>Count</span>
                                    <span class="group-stat-value">${expenseCount}</span>
                                </div>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-edit" onclick="editGroup(${group.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteGroup(${group.id})">Delete</button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            updateGroupSelects(groups);
        })
        .catch(error => {
            console.error('Error loading groups:', error);
            showError('Failed to load groups');
        });
}

function updateGroupSelects(groups) {
    const expenseGroupSelect = document.getElementById('expenseGroup');
    const editGroupSelect = document.getElementById('editGroup');
    const groupFilter = document.getElementById('groupFilter');
    
    const defaultOption = '<option value="">Select a group</option>';
    const filterDefaultOption = '<option value="">All Groups</option>';
    
    const options = groups.map(group => `<option value="${group.id}">${group.name}</option>`).join('');
    
    expenseGroupSelect.innerHTML = defaultOption + options;
    editGroupSelect.innerHTML = options;
    groupFilter.innerHTML = filterDefaultOption + options;
}

function saveGroup(event) {
    event.preventDefault();
    
    const name = document.getElementById('groupName').value.trim();
    const description = document.getElementById('groupDescription').value.trim();
    
    if (!name) {
        showError('Group name is required');
        return;
    }
    
    const groupData = {
        name: name,
        description: description || null
    };
    
    fetch(`${API_URL}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create group');
        return response.json();
    })
    .then(data => {
        showSuccess('Group created successfully!');
        closeModal('groupModal');
        document.getElementById('groupForm').reset();
        loadGroups();
        loadDashboard();
    })
    .catch(error => {
        console.error('Error saving group:', error);
        showError('Failed to create group');
    });
}

function deleteGroup(id) {
    if (confirm('Are you sure you want to delete this group? All expenses in this group will be deleted.')) {
        fetch(`${API_URL}/groups/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete group');
            showSuccess('Group deleted successfully!');
            loadGroups();
            loadDashboard();
        })
        .catch(error => {
            console.error('Error deleting group:', error);
            showError('Failed to delete group');
        });
    }
}

function editGroup(id) {
    // For now, we'll delete and recreate
    // In a full implementation, this would open an edit modal
    alert('Edit group: You can delete and recreate the group with new details.');
}

// ============ EXPENSE FUNCTIONS ============

function loadExpenses() {
    fetch(`${API_URL}/groups`)
        .then(response => response.json())
        .then(groups => {
            let allExpenses = [];
            
            groups.forEach(group => {
                group.expenses.forEach(expense => {
                    allExpenses.push({
                        ...expense,
                        groupId: group.id,
                        groupName: group.name
                    });
                });
            });
            
            displayExpensesTable(allExpenses);
        })
        .catch(error => {
            console.error('Error loading expenses:', error);
            showError('Failed to load expenses');
        });
}

function displayExpensesTable(expenses) {
    const tableBody = document.getElementById('expensesTableBody');
    
    if (expenses.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="no-data">No expenses yet</td></tr>';
    } else {
        tableBody.innerHTML = expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(expense => `
                <tr>
                    <td>${expense.groupName}</td>
                    <td>${expense.description}</td>
                    <td>₹${expense.amount.toFixed(2)}</td>
                    <td>${formatDate(expense.date)}</td>
                    <td>
                        <div class="actions">
                            <button class="btn btn-edit" onclick="openEditModal(${expense.id}, ${expense.groupId}, '${expense.description}', ${expense.amount}, '${expense.date}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
    }
}

function filterByGroup() {
    const groupId = document.getElementById('groupFilter').value;
    
    fetch(`${API_URL}/groups`)
        .then(response => response.json())
        .then(groups => {
            let expenses = [];
            
            if (groupId) {
                const group = groups.find(g => g.id == groupId);
                if (group) {
                    expenses = group.expenses.map(exp => ({
                        ...exp,
                        groupId: group.id,
                        groupName: group.name
                    }));
                }
            } else {
                groups.forEach(group => {
                    group.expenses.forEach(expense => {
                        expenses.push({
                            ...expense,
                            groupId: group.id,
                            groupName: group.name
                        });
                    });
                });
            }
            
            displayExpensesTable(expenses);
        })
        .catch(error => {
            console.error('Error filtering expenses:', error);
            showError('Failed to filter expenses');
        });
}

function loadExpenseGroupSelect() {
    fetch(`${API_URL}/groups`)
        .then(response => response.json())
        .then(groups => {
            updateGroupSelects(groups);
        })
        .catch(error => console.error('Error loading groups:', error));
}

function saveExpense(event) {
    event.preventDefault();
    
    const groupId = document.getElementById('expenseGroup').value;
    const description = document.getElementById('expenseDesc').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    
    if (!groupId || !description || !amount || !date) {
        showError('All fields are required');
        return;
    }
    
    const expenseData = {
        description: description,
        amount: amount,
        date: date
    };
    
    fetch(`${API_URL}/groups/${groupId}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create expense');
        return response.json();
    })
    .then(data => {
        showSuccess('Expense added successfully!');
        closeModal('expenseModal');
        document.getElementById('expenseForm').reset();
        setExpenseDate();
        loadExpenses();
        loadDashboard();
    })
    .catch(error => {
        console.error('Error saving expense:', error);
        showError('Failed to add expense');
    });
}

function openEditModal(expenseId, groupId, description, amount, date) {
    currentEditId = expenseId;
    document.getElementById('editGroup').value = groupId;
    document.getElementById('editDesc').value = description;
    document.getElementById('editAmount').value = amount;
    document.getElementById('editDate').value = date;
    
    openModal('editModal');
}

function updateExpense(event) {
    event.preventDefault();
    
    if (!currentEditId) {
        showError('Error: Expense ID not found');
        return;
    }
    
    const groupId = document.getElementById('editGroup').value;
    const description = document.getElementById('editDesc').value.trim();
    const amount = parseFloat(document.getElementById('editAmount').value);
    const date = document.getElementById('editDate').value;
    
    if (!description || !amount || !date) {
        showError('All fields are required');
        return;
    }
    
    const expenseData = {
        description: description,
        amount: amount,
        date: date
    };
    
    fetch(`${API_URL}/expenses/${currentEditId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update expense');
        return response.json();
    })
    .then(data => {
        showSuccess('Expense updated successfully!');
        closeModal('editModal');
        currentEditId = null;
        loadExpenses();
        loadDashboard();
    })
    .catch(error => {
        console.error('Error updating expense:', error);
        showError('Failed to update expense');
    });
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete expense');
            showSuccess('Expense deleted successfully!');
            loadExpenses();
            loadDashboard();
        })
        .catch(error => {
            console.error('Error deleting expense:', error);
            showError('Failed to delete expense');
        });
    }
}

// ============ MODAL FUNCTIONS ============

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// ============ UTILITY FUNCTIONS ============

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function showSuccess(message) {
    // Simple alert for now - can be replaced with a toast notification
    alert(message);
}

function showError(message) {
    // Simple alert for now - can be replaced with a toast notification
    alert('Error: ' + message);
}
