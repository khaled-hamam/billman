package wallet

import (
    "time"
)

type Expense struct {
    uuid     string
    name     string
    walletID string
    amount   float64
    time     time.Time
}

func newExpense(uuid, name, walletID string, amount float64, time time.Time) (*Expense, error) {
    if uuid == "" {
        return nil, NewDomainError("empty expense uuid")
    }

    if name == "" {
        return nil, NewDomainError("empty expense name")
    }

    if walletID == "" {
        return nil, NewDomainError("empty wallet ID")
    }

    if amount <= 0 {
        return nil, NewDomainError("expense amount should be a positive value")
    }

    if time.IsZero() {
        return nil, NewDomainError("expense time should not be zero")
    }

    return &Expense{
        uuid:     uuid,
        name:     name,
        walletID: walletID,
        amount:   amount,
        time:     time,
    }, nil
}

func UnmarshalExpenseFromDatabase(uuid, name, walletID string, amount float64, time time.Time) (*Expense, error) {
    e, err := newExpense(uuid, name, walletID, amount, time)
    if err != nil {
        return nil, err
    }

    return e, nil
}

func (expense Expense) UUID() string {
    return expense.uuid
}

func (expense Expense) Name() string {
    return expense.name
}

func (expense Expense) WalletID() string {
    return expense.walletID
}

func (expense Expense) Amount() float64 {
    return expense.amount
}

func (expense Expense) Time() time.Time {
    return expense.time
}
