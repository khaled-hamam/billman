package config

import (
	"fmt"
	"os"
)

var (
    Port         = getEnv("PORT", "80")
    JwtPublicKey = getEnv("JwtPublicKey", "billman_dev_jwt")
    MySQLURI     = getEnv("MYSQL_URI", "root:root@tcp(127.0.0.1:3306)/billman-expenses?parseTime=True")
)

func getEnv(key, defaultValue string) string {
    value := os.Getenv(key)
    if value == "" {
        value = defaultValue
    }

    if value == "" {
        panic(fmt.Sprintf("empty config value [%s]", key))
    }

    return value
}
