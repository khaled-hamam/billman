package app

import (
    "errors"
    "time"

    "github.com/google/uuid"

    wallet "github.com/khaled-hamam/billman/wallets/domain"
    "github.com/khaled-hamam/billman/wallets/infra"
)

type WalletsService struct {
    repo infra.WalletRepository
}

var (
    WalletNotFoundError = errors.New("wallet not found")
)

func NewWalletsService(repository infra.WalletRepository) WalletsService {
    return WalletsService{
        repo: repository,
    }
}

func (service WalletsService) CreateWallet(name, userId string) (Wallet, error) {
    w, err := wallet.NewWallet(uuid.New().String(), name, userId)
    if err != nil {
        return Wallet{}, err
    }

    if err = service.repo.Save(w); err != nil {
        return Wallet{}, err
    }

    return service.marshalWallet(w), nil
}

func (service WalletsService) FindWallet(id string) (Wallet, error) {
    w := service.repo.FindById(id)

    if w == nil {
        return Wallet{}, WalletNotFoundError
    }

    return service.marshalWallet(w), nil
}

func (service WalletsService) AddExpense(name string, amount float64, time time.Time, walletID string) error {
    w := service.repo.FindById(walletID)

    if err := w.AddExpense(uuid.New().String(), name, amount, time); err != nil {
        return err
    }

    if err := service.repo.Save(w); err != nil {
        return err
    }

    return nil
}
