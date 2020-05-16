package controllers

import (
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"github.com/khaled-hamam/billman/config"
	"github.com/khaled-hamam/billman/database"
	"github.com/khaled-hamam/billman/middlewares"
	"github.com/khaled-hamam/billman/models"
)

type UsersController struct{}

func (controller *UsersController) Init(router *gin.RouterGroup) {
	router.POST("/users", controller.register)
	router.POST("/users/login", controller.login)
	router.POST("/users/google", controller.googleLogin)
	router.PATCH("/users", middlewares.AuthMiddleware(), controller.updateProfile)
	router.GET("/users/me", middlewares.AuthMiddleware(), controller.getProfile)
}

type registerDTO struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (controller *UsersController) register(c *gin.Context) {
	var payload registerDTO
	if c.BindJSON(&payload) == nil {
		db := database.GetInstance()
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(payload.Password), 10)
		user := &models.User{
			Name:     payload.Name,
			Email:    payload.Email,
			Password: string(hashedPassword),
		}
		if err := db.Create(user).Error; err == nil {
			c.JSON(http.StatusCreated, gin.H{"user": user})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
		}
	}
}

type loginDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (controller *UsersController) login(c *gin.Context) {
	var payload loginDTO
	if c.BindJSON(&payload) == nil {
		db := database.GetInstance()
		user := &models.User{}
		if err := db.Where("email = ?", payload.Email).First(user).Error; err == nil {
			err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Email or Password"})
			} else {
				claims := models.JWTClaims{
					user.Name,
					user.Email,
					user.MonthlyBudget,
					jwt.StandardClaims{},
				}
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
				signedToken, err := token.SignedString([]byte(config.GetConfig().GetString("JWT_KEY")))
				if err != nil {
					log.Println("Error", err)
				}
				c.JSON(http.StatusOK, gin.H{"token": signedToken})
			}
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Email or Password"})
		}
	}
}

type googleLoginDTO struct {
	Email    string `json:"email"`
	Name string `json:"name"`
}

func (controller *UsersController) googleLogin(c *gin.Context) {
	var payload googleLoginDTO
	if c.BindJSON(&payload) == nil {
		db := database.GetInstance()
		user := &models.User{}
		if err := db.Where("email = ?", payload.Email).First(user).Error; err != nil {
			user.Email = payload.Email
			user.Name = payload.Name
			db.Save(&user)
		}

		if user.Password != "" {
			c.AbortWithStatus(400)
			return
		}

		claims := models.JWTClaims{
			user.Name,
			user.Email,
			user.MonthlyBudget,
			jwt.StandardClaims{},
		}
	
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		signedToken, err := token.SignedString([]byte(config.GetConfig().GetString("JWT_KEY")))
		if err != nil {
			log.Println("Error", err)
		}
		c.JSON(http.StatusOK, gin.H{"token": signedToken})
	}
}

type updateProfileDTO struct {
	Name          *string `json:"name"`
	Password      *string `json:"password"`
	MonthlyBudget *int    `json:"monthlyBudget"`
}

func (controller *UsersController) updateProfile(c *gin.Context) {
	var payload updateProfileDTO
	if c.BindJSON(&payload) == nil {
		db := database.GetInstance()
		u, _ := c.Get("User")
		var user models.User
		if err := db.Where("email = ?", u.(*models.JWTClaims).Email).First(&user).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
		}

		if payload.Name != nil {
			user.Name = *payload.Name
		}

		if payload.Password != nil {
			hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(*payload.Password), 10)
			user.Password = string(hashedPassword)
		}

		if payload.MonthlyBudget != nil {
			user.MonthlyBudget = *payload.MonthlyBudget
		}

		db.Save(&user)
		c.JSON(http.StatusOK, user)
	}
}

func (controller *UsersController) getProfile(c *gin.Context) {
	user, _ := c.Get("User")
	userEmail := user.(*models.JWTClaims).Email
	db := database.GetInstance()
	var userModel models.User
	if err := db.Where("email = ?", userEmail).Find(&userModel).Error; err == nil {
		c.JSON(http.StatusOK, userModel)
	}
}
