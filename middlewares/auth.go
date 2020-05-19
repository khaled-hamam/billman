package middlewares

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"

	"github.com/khaled-hamam/billman/config"
	"github.com/khaled-hamam/billman/models"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		config := config.GetConfig()
		token := c.Request.Header.Get("Authorization")

		claims := &models.JWTClaims{}
		_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(config.GetString("JWT_KEY")), nil
		})
		if err != nil {
			c.AbortWithStatus(401)
			return
		}

		c.Set("User", claims)
		c.Next()
	}
}
