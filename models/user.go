package models

type User struct {
	Name          string `gorm:"NOT NULL" json:"name"`
	Email         string `gorm:"PRIMARY_KEY" json:"email"`
	Password      string `gorm:"NOT NULL" json:"-"`
	MonthlyBudget int    `gorm:"default 0" json:"monthlyBudget"`
}
