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

	err := config.ReadInConfig()
	if err != nil {
		log.Fatal("error on parsing configuration file", err)
	}
}

func GetConfig() *viper.Viper {
	return config
}
