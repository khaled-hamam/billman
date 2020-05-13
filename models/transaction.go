package models

import (
	"encoding/json"
	"strings"

	"github.com/jinzhu/gorm"
)

type TransactionType string

const (
	Expense TransactionType = "EXPENSE"
	Income  TransactionType = "INCOME"
)

type Transaction struct {
	gorm.Model
	Name       string          `gorm:"NOT NULL" json:"name"`
	Categories string          `json:"categories"`
	Value      int             `gorm:"NOT NULL" json:"value"`
	Type       TransactionType `gorm:"NOT NULL" json:"type"`
	User       User            `gorm:"foreignkey:Email" json:"user,omitempty"`
	UserEmail  string
}

func NewExpense(name, categories string, value int) *Transaction {
	return &Transaction{
		Name:       name,
		Categories: categories,
		Value:      value,
		Type:       Expense,
	}
}

func NewIncome(name, categories string, value int) *Transaction {
	return &Transaction{
		Name:       name,
		Categories: categories,
		Value:      value,
		Type:       Income,
	}
}

func (t *Transaction) GetCategories() []string {
	if len(t.Categories) > 0 {
		return strings.Split(t.Categories, ",")
	}
	return []string{}
}

func (t *Transaction) MarshalJSON() ([]byte, error) {
	res := struct {
		gorm.Model
		Name       string          `json:"name"`
		Categories []string        `json:"categories,omitempty"`
		Value      int             `json:"value"`
		Type       TransactionType `json:"type"`
		User       User            `json:"user,omitempty"`
	}{
		t.Model,
		t.Name,
		t.GetCategories(),
		t.Value,
		t.Type,
		t.User,
	}

	return json.Marshal(&res)
}
