package expense

import (
    "errors"
    "time"
)

type Expense struct {
    uuid   string
    name   string
    userID string
    amount float64
    time   time.Time
}

func NewExpense(uuid, name, userID string, amount float64, time time.Time) (*Expense, error) {
    if uuid == "" {
        return nil, errors.New("empty expense uuid")
    }

    if name == "" {
        return nil, errors.New("empty expense name")
    }

    if userID == "" {
        return nil, errors.New("empty expense userID")
    }

    if amount <= 0 {
        return nil, errors.New("expense amount should be a positive value")
    }

    if time.IsZero() {
        return nil, errors.New("expense time should not be zero")
    }

    return &Expense{
        uuid:   uuid,
        name:   name,
        userID: userID,
        amount: amount,
        time:   time,
    }, nil
}

func (expense Expense) UUID() string {
    return expense.uuid
}

func (expense Expense) Name() string {
    return expense.name
}

func (expense Expense) UserID() string {
    return expense.userID
}

func (expense Expense) Amount() float64 {
    return expense.amount
}

func (expense Expense) Time() time.Time {
    return expense.time
}
