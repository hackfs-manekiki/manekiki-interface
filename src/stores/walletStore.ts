import { makeAutoObservable } from "mobx";

class WalletStore {
  isWalletOpen = false;
  constructor() {
    makeAutoObservable(this);
  }

  setWalletOpen(open: boolean) {
    this.isWalletOpen = open;
  }
}

export const walletStore = new WalletStore();
