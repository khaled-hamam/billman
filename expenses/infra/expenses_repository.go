package infra

import (
    "time"

    "gorm.io/gorm"

    expense "github.com/khaled-hamam/billman/expenses/domain"
)

type Expense struct {
    UUID   string `gorm:"primaryKey"`
    Name   string
    UserID string
    Amount float64
    Time   time.Time
}

type ExpensesRepisotry struct {
    db *gorm.DB
}

func NewExpensesRepository(db *gorm.DB) ExpensesRepisotry {
    return ExpensesRepisotry{
        db: db,
    }
}

func (repo ExpensesRepisotry) AddExpense(expense *expense.Expense) error {
    if result := repo.db.Create(repo.marshalExpense(expense)); result.Error != nil {
        return result.Error
    }

    return nil
}

func (repo ExpensesRepisotry) marshalExpense(expense *expense.Expense) Expense {
    return Expense{
        UUID:   expense.UUID(),
        Name:   expense.Name(),
        UserID: expense.UserID(),
        Amount: expense.Amount(),
        Time:   expense.Time(),
    }
}

var _ expense.Repository = (*ExpensesRepisotry)(nil)
