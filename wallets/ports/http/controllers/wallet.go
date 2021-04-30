package controllers

import (
    "net/http"

    "github.com/gin-gonic/gin"

    "github.com/khaled-hamam/billman/wallets/app"
    wallet "github.com/khaled-hamam/billman/wallets/domain"
    "github.com/khaled-hamam/billman/wallets/ports/http/middlewares"
    "github.com/khaled-hamam/billman/wallets/ports/http/utils"
)

type WalletController struct {
    service app.WalletsService
}

func RegisterWalletController(router *gin.RouterGroup, service app.WalletsService) {
    ctrl := WalletController{
        service: service,
    }

    router.POST("/", middlewares.RequireAuth(), ctrl.CreateWallet)
    router.GET("/:id", middlewares.RequireAuth(), ctrl.GetWallet)
}

type CreateWalletBody struct {
    Name string
}

func (ctr WalletController) CreateWallet(ctx *gin.Context) {
    var body CreateWalletBody
    if err := ctx.ShouldBind(&body); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    w, err := ctr.service.CreateWallet(body.Name, utils.ExtractUserClaims(ctx).Id)
    if err != nil {
        switch err.(type) {
        case *wallet.DomainError:
            ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
        default:
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }

        return
    }

    ctx.JSON(http.StatusCreated, gin.H{"data": w})
}

func (ctr WalletController) GetWallet(ctx *gin.Context) {
    id := ctx.Param("id")

    wallet, err := ctr.service.FindWallet(id)
    if err != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"data": wallet})
}
