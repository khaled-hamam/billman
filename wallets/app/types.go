package app

import (
    "time"

    wallet "github.com/khaled-hamam/billman/wallets/domain"
)

type Expense struct {
    UUID   string    `json:"uuid"`
    Name   string    `json:"name"`
    Amount float64   `json:"amount"`
    Time   time.Time `json:"time"`
}

type Wallet struct {
    UUID     string    `json:"uuid"`
    Name     string    `json:"name"`
    UserID   string    `json:"userId"`
    Expenses []Expense `json:"expenses"`
}

func (service WalletsService) marshalWallet(w *wallet.Wallet) Wallet {
    expenses := make([]Expense, len(w.Expenses()))
    for index, expense := range w.Expenses() {
        expenses[index] = service.marshalExpense(&expense)
    }

    return Wallet{
        UUID:     w.UUID(),
        Name:     w.Name(),
        UserID:   w.UserID(),
        Expenses: expenses,
    }
}

func (service WalletsService) marshalExpense(e *wallet.Expense) Expense {
    return Expense{
        UUID:   e.UUID(),
        Name:   e.Name(),
        Amount: e.Amount(),
        Time:   e.Time(),
    }
}
