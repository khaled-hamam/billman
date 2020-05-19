package main

import (
	"github.com/khaled-hamam/billman/config"
	"github.com/khaled-hamam/billman/database"
	"github.com/khaled-hamam/billman/server"
)

func main() {
	config.Init(".env")
	db := database.Init()
	defer db.Close()

	server.Init()
}
