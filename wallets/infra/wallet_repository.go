package infra

import (
    "gorm.io/gorm"
    "gorm.io/gorm/clause"

    wallet "github.com/khaled-hamam/billman/wallets/domain"
)

type WalletRepository struct {
    db *gorm.DB
}

func NewWalletReppsitory(db *gorm.DB) WalletRepository {
    return WalletRepository{
        db: db,
    }
}

func (repo WalletRepository) Save(w *wallet.Wallet) error {
    if result := repo.db.Session(&gorm.Session{FullSaveAssociations: true}).Save(repo.marshalWallet(w)); result.Error != nil {
        return result.Error
    }

    return nil
}

func (repo WalletRepository) FindById(id string) *wallet.Wallet {
    var w Wallet
    if result := repo.db.Preload(clause.Associations).First(&w, "uuid = ?", id); result.Error != nil {
        return nil
    }

    return repo.unmarshalWallet(w)
}

var _ wallet.Repository = (*WalletRepository)(nil)
