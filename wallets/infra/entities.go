package infra

import (
    "time"

    wallet "github.com/khaled-hamam/billman/wallets/domain"
)

type Wallet struct {
    UUID   string `gorm:"primaryKey;type:varchar(36)"`
    Name   string
    UserID string

    Expenses []Expense
}

type Expense struct {
    UUID     string `gorm:"primaryKey;type:varchar(36)"`
    WalletID string
    Name     string
    Amount   float64
    Time     time.Time `gorm:"index"`
}

func (repo WalletRepository) marshalWallet(w *wallet.Wallet) Wallet {
    expenses := make([]Expense, len(w.Expenses()))
    for index, expense := range w.Expenses() {
        expenses[index] = repo.marshalExpense(&expense)
    }

    return Wallet{
        UUID:     w.UUID(),
        Name:     w.Name(),
        UserID:   w.UserID(),
        Expenses: expenses,
    }
}

func (repo WalletRepository) unmarshalWallet(w Wallet) *wallet.Wallet {
    domainExpenses := make([]wallet.Expense, len(w.Expenses))
    for index, expense := range w.Expenses {
        domainExpenses[index] = *repo.unmarshalExpense(expense)
    }

    domainWallet, _ := wallet.UnmarshalWalletFromDatabase(w.UUID, w.Name, w.UserID, domainExpenses)
    return domainWallet
}

func (repo WalletRepository) marshalExpense(e *wallet.Expense) Expense {
    return Expense{
        UUID:     e.UUID(),
        Name:     e.Name(),
        WalletID: e.WalletID(),
        Amount:   e.Amount(),
        Time:     e.Time(),
    }
}

func (repo WalletRepository) unmarshalExpense(e Expense) *wallet.Expense {
    domainExpense, _ := wallet.UnmarshalExpenseFromDatabase(e.UUID, e.Name, e.WalletID, e.Amount, e.Time)
    return domainExpense
}
