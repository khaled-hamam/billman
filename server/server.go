package server

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/khaled-hamam/billman/controllers"
)

func Init() {
	router := gin.Default()
	apiGroup := router.Group("/api")

	controllers := []controllers.Controller{
		&controllers.UsersController{},
		&controllers.TransactionsController{},
	}

	for _, controller := range controllers {
		controller.Init(apiGroup)
	}

	err := router.Run(":8000")
	if err != nil {
		log.Fatal("Error running server", err)
	}
}
