package controllers

import (
    "net/http"
    "time"

    "github.com/gin-gonic/gin"

    "github.com/khaled-hamam/billman/wallets/app"
    "github.com/khaled-hamam/billman/wallets/ports/http/middlewares"
)

type ExpensesController struct {
    service app.WalletsService
}

func RegisterExpensesController(router *gin.RouterGroup, service app.WalletsService) {
    ctrl := ExpensesController{
        service: service,
    }

    router.POST("/", middlewares.RequireAuth(), ctrl.CreateExpense)
}

type CreateExpenseBody struct {
    Name   string
    Amount float64
    Time   time.Time
}

func (ctr ExpensesController) CreateExpense(ctx *gin.Context) {
    var body CreateExpenseBody
    if err := ctx.ShouldBind(&body); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    walletID := ctx.Param("walletID")
    err := ctr.service.AddExpense(body.Name, body.Amount, body.Time, walletID)

    if err != nil {
        ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
        return
    }

    ctx.AbortWithStatus(http.StatusCreated)
}
