package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/khaled-hamam/billman/expenses/app"
	"github.com/khaled-hamam/billman/expenses/config"
	"github.com/khaled-hamam/billman/expenses/infra"
	"github.com/khaled-hamam/billman/expenses/ports/http/controllers"
)

func main() {
    server := gin.Default()

    container := BuildContainer()

    container.Invoke(func(service app.ExpensesService) {
        controllers.RegisterExpensesController(server.Group("/"), service)
    })

    server.Run(fmt.Sprintf(":%s", config.Port))
}

func BuildContainer() *dig.Container {
    container := dig.New()

    container.Provide(NewDb)

    container.Provide(infra.NewExpensesRepository)
    container.Provide(app.NewExpensesService)
    container.Provide(infra.NewExpensesRepository)

    return container
}

func NewDb() *gorm.DB {
    db, err := gorm.Open(mysql.Open(config.MySQLURI), &gorm.Config{})
    if err != nil {
        panic("error connecting to db")
    }
    db.AutoMigrate(&infra.Expense{})

    return db
}
