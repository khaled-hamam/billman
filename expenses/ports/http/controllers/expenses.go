package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/khaled-hamam/billman/expenses/app"
	"github.com/khaled-hamam/billman/expenses/ports/http/middlewares"
	"github.com/khaled-hamam/billman/expenses/ports/http/utils"
)

type ExpensesController struct {
    service app.ExpensesService
}

func RegisterExpensesController(router *gin.RouterGroup, service app.ExpensesService) {
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

    expense, err := ctr.service.AddExpense(body.Name, utils.ExtractUserClaims(ctx).Id, body.Amount, body.Time)
    if err != nil {
        ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusCreated, gin.H{"data": expense})
}
