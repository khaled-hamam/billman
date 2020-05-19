package models

import "github.com/dgrijalva/jwt-go"

type JWTClaims struct {
	Name               string `json:"name"`
	Email              string `json:"email"`
	MonthlyBudget      int    `json:"monthlyBudget"`
	jwt.StandardClaims `json:"-"`
}
