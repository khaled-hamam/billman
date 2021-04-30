package wallet

import (
    "time"
)

type Wallet struct {
    uuid   string
    name   string
    userID string

    expenses []Expense
}

func NewWallet(uuid string, name string, userID string) (*Wallet, error) {
    if uuid == "" {
        return nil, NewDomainError("empty wallet uuid")
    }

    if name == "" {
        return nil, NewDomainError("empty wallet name")
    }

    if userID == "" {
        return nil, NewDomainError("empty wallet userID")
    }

    return &Wallet{
        uuid:   uuid,
        name:   name,
        userID: userID,
    }, nil
}

func (wallet *Wallet) AddExpense(uuid, name string, amount float64, time time.Time) error {
    expense, err := newExpense(uuid, name, wallet.uuid, amount, time)
    if err != nil {
        return err
    }

    wallet.expenses = append(wallet.expenses, *expense)

    return nil
}

func (wallet Wallet) UUID() string {
    return wallet.uuid
}

func (wallet Wallet) Name() string {
    return wallet.name
}

func (wallet Wallet) UserID() string {
    return wallet.userID
}

func (wallet Wallet) Expenses() []Expense {
    return wallet.expenses
}

func UnmarshalWalletFromDatabase(uuid string, name string, userID string, expenses []Expense) (*Wallet, error) {
    w, err := NewWallet(uuid, name, userID)
    if err != nil {
        return nil, err
    }

    w.expenses = expenses

    return w, nil
}
