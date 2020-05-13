package controllers

import "github.com/gin-gonic/gin"

type Controller interface {
	Init(router *gin.RouterGroup)
}
