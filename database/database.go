package database

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/khaled-hamam/billman/config"
	"github.com/khaled-hamam/billman/models"
)

var instance *gorm.DB

func Init() *gorm.DB {
	c := config.GetConfig()
	db, err := gorm.Open("mysql", c.GetString("MYSQL_CONNECTION_STRING"))
	if err != nil {
		log.Fatal("Error opening database", err)
	}

	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Transaction{}).AddForeignKey("user_email", "users(email)", "CASCADE", "CASCADE")

	instance = db
	return instance
}

func GetInstance() *gorm.DB {
	return instance
}
