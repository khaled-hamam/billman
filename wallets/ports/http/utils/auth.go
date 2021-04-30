package utils

import (
    "github.com/gin-gonic/gin"

    "github.com/khaled-hamam/billman/wallets/ports/http/middlewares"
)

func ExtractUserClaims(ctx *gin.Context) middlewares.UserClaims {
    claims, _ := ctx.Get("user-claims")
    return claims.(middlewares.UserClaims)
}
