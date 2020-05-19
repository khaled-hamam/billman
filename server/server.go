package server

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/khaled-hamam/billman/config"
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

	PORT := config.GetConfig().GetString("PORT")
	err := router.Run(fmt.Sprintf(":%s", PORT))
	if err != nil {
		log.Fatal("Error running server", err)
	}
}
