package wallet

type Repository interface {
    FindById(id string) *Wallet
    Save(wallet *Wallet) error
}
