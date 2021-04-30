package middlewares

import (
    "net/http"
    "strings"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"

    "github.com/khaled-hamam/billman/wallets/config"
)

type UserClaims struct {
    Id string
}

func RequireAuth() gin.HandlerFunc {
    return func(ctx *gin.Context) {
        header := ctx.GetHeader("Authorization")
        headerParts := strings.Split(header, " ")

        if len(headerParts) != 2 || headerParts[0] != "Bearer" {
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
            return
        }

        token, err := jwt.Parse(headerParts[1], func(token *jwt.Token) (interface{}, error) {
            return []byte(config.JwtPublicKey), nil
        })

        if err != nil || token.Valid == false {
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
            return
        }

        id, ok := token.Claims.(jwt.MapClaims)["sub"].(string)
        if ok == false {
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
            return
        }

        claims := UserClaims{id}
        ctx.Set("user-claims", claims)

        ctx.Next()
    }
}
