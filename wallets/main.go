package main

import (
    "fmt"
    "log"
    "os"
    "time"

    "github.com/gin-gonic/gin"
    "go.uber.org/dig"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"

    "github.com/khaled-hamam/billman/wallets/app"
    "github.com/khaled-hamam/billman/wallets/config"
    "github.com/khaled-hamam/billman/wallets/infra"
    "github.com/khaled-hamam/billman/wallets/ports/http/controllers"
)

func main() {
    server := gin.Default()

    container := BuildContainer()

    container.Invoke(func(service app.WalletsService) {
        controllers.RegisterWalletController(server.Group("/"), service)
        controllers.RegisterExpensesController(server.Group("/:walletID/expenses"), service)
    })

    server.Run(fmt.Sprintf(":%s", config.Port))
}

func BuildContainer() *dig.Container {
    container := dig.New()

    container.Provide(app.NewWalletsService)

    container.Provide(NewDb)
    container.Provide(infra.NewWalletReppsitory)

    return container
}

func NewDb() *gorm.DB {
    newLogger := logger.New(
        log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
        logger.Config{
            SlowThreshold: time.Second, // Slow SQL threshold
            LogLevel:      logger.Info, // Log level
            Colorful:      false,       // Disable color
            // IgnoreRecordNotFoundError: true,          // Ignore ErrRecordNotFound error for logger
        },
    )

    db, err := gorm.Open(mysql.Open(config.MySQLURI), &gorm.Config{
        Logger: newLogger,
    })
    if err != nil {
        panic("error connecting to db")
    }
    if err := db.AutoMigrate(&infra.Wallet{}, &infra.Expense{}); err != nil {
        panic(err)
    }

    return db
}
