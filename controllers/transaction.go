package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/khaled-hamam/billman/database"
	"github.com/khaled-hamam/billman/middlewares"
	"github.com/khaled-hamam/billman/models"
)

type TransactionsController struct{}

func (controller *TransactionsController) Init(router *gin.RouterGroup) {
	router.POST("/transactions", middlewares.AuthMiddleware(), controller.create)
	router.GET("/transactions", middlewares.AuthMiddleware(), controller.getAll)
	router.PATCH("/transactions/:id", middlewares.AuthMiddleware(), controller.update)
	router.DELETE("/transactions/:id", middlewares.AuthMiddleware(), controller.delete)
}

type createTransactionDTO struct {
	Name       string                 `json:"name"`
	Categories []string               `json:"categories,omitempty"`
	Value      int                    `json:"value"`
	Type       models.TransactionType `json:"type"`
}

func (controller *TransactionsController) create(c *gin.Context) {
	var payload createTransactionDTO
	if c.BindJSON(&payload) == nil {
		db := database.GetInstance()
		var transaction *models.Transaction
		if payload.Type == models.Income {
			transaction = models.NewIncome(payload.Name, strings.Join(payload.Categories, ","), payload.Value)
		} else if payload.Type == models.Expense {
			transaction = models.NewExpense(payload.Name, strings.Join(payload.Categories, ","), payload.Value)
		}
		user, _ := c.Get("User")
		transaction.UserEmail = user.(*models.JWTClaims).Email

		if err := db.Create(transaction).Error; err == nil {
			c.JSON(http.StatusCreated, transaction)
		}
	}
}

func (controller *TransactionsController) getAll(c *gin.Context) {
	user, _ := c.Get("User")
	userEmail := user.(*models.JWTClaims).Email
	db := database.GetInstance()
	var transactions []models.Transaction
	if err := db.Where("user_email = ?", userEmail).Find(&transactions).Error; err == nil {
		c.JSON(http.StatusOK, transactions)
	}
}

type updateTransactionDTO struct {
	Name       *string  `json:"name"`
	Categories []string `json:"categories,omitempty"`
	Value      *int     `json:"value"`
}

func (controller *TransactionsController) update(c *gin.Context) {
	var payload updateTransactionDTO
	if c.BindJSON(&payload) == nil {
		db := database.GetInstance()
		var transaction models.Transaction
		if err := db.Where("id = ?", c.Param("id")).First(&transaction).Error; err == nil {
			if payload.Name != nil {
				transaction.Name = *payload.Name
			}

			if payload.Categories != nil {
				transaction.Categories = strings.Join(payload.Categories, ",")
			}

			if payload.Value != nil {
				transaction.Value = *payload.Value
			}
			db.Save(&transaction)
			c.JSON(http.StatusOK, transaction)
		}
	}
}

func (controller *TransactionsController) delete(c *gin.Context) {
	id := c.Param("id")
	db := database.GetInstance()
	if err := db.Where("id = ?", id).Delete(&models.Transaction{}).Error; err == nil {
		c.AbortWithStatus(http.StatusOK)
	}
}
