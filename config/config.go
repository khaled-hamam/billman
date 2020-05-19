package config

import (
	"log"

	"github.com/spf13/viper"
)

var config *viper.Viper

func Init(env string) {
	config = viper.New()
	config.SetConfigName(env)
	config.SetConfigType("env")
	config.AddConfigPath("./")
	config.AutomaticEnv()
	config.SetDefault("PORT", "8000")

	err := config.ReadInConfig()
	if err != nil {
		log.Println("error on parsing configuration file", err)
	}
}

func GetConfig() *viper.Viper {
	return config
}
