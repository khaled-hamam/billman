package wallet

import "errors"

type DomainError struct {
    error
}

func NewDomainError(text string) error {
    return DomainError{
        error: errors.New(text),
    }
}
