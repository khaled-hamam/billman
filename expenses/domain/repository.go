package expense

type Repository interface {
    AddExpense(expense *Expense) error
}
