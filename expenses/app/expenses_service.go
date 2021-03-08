package app

import (
    "time"

    "github.com/google/uuid"

    expense "github.com/khaled-hamam/billman/expenses/domain"
    "github.com/khaled-hamam/billman/expenses/infra"
)

type Expense struct {
    UUID   string    `json:"uuid"`
    Name   string    `json:"name"`
    UserID string    `json:"userId"`
    Amount float64   `json:"amount"`
    Time   time.Time `json:"time"`
}

type ExpensesService struct {
    repo infra.ExpensesRepisotry
}

func NewExpensesService(repository infra.ExpensesRepisotry) ExpensesService {
    return ExpensesService{
        repo: repository,
    }
}

func (service ExpensesService) AddExpense(name, userId string, amount float64, time time.Time) (*Expense, error) {
    exp, err := expense.NewExpense(uuid.New().String(), name, userId, amount, time)
    if err != nil {
        return nil, err
    }

    if err = service.repo.AddExpense(exp); err != nil {
        return nil, err
    }

    return service.marshalExpense(exp), nil
}

func (service ExpensesService) marshalExpense(expense *expense.Expense) *Expense {
    return &Expense{
        UUID:   expense.UUID(),
        Name:   expense.Name(),
        UserID: expense.UserID(),
        Amount: expense.Amount(),
        Time:   expense.Time(),
    }
}
