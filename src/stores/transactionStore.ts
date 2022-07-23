import { BaseProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { autorun } from "mobx";
import type { ManekikiTransaction } from "src/interfaces/manekiki-tx";
import { isBrowser } from "src/utils/isBrowser";

class TransactionStore {
  transactions: ManekikiTransaction[] = [];
  provider: BaseProvider = ethers.getDefaultProvider(137); // polygon mainnet

  constructor() {
    this.transactions = [];
    this;
    if (isBrowser) {
      this.loadTransactions();
      // this.provider = ethers.getDefaultProvider(137); // polygon mainnet
    }
  }

  get pendingTransactions(): ManekikiTransaction[] {
    return this.transactions.filter((tx) => tx.status === "pending");
  }

  get successTransactions(): ManekikiTransaction[] {
    return this.transactions.filter((tx) => tx.status === "success");
  }

  get revertedTransactions(): ManekikiTransaction[] {
    return this.transactions.filter((tx) => tx.status === "reverted");
  }

  addTransaction = (name: string, hash: string, description: string = ""): void => {
    if (this.exists(hash)) return;
    this.transactions = [
      ...this.transactions,
      { name, hash, description, status: "pending", statusNumber: -1 },
    ];
    this.provider
      .waitForTransaction(hash)
      .then((receipt) => {
        if (typeof receipt.status === "undefined") return;
        const newStatus = receipt.status === 1 ? "success" : "reverted";
        const newStatusNumber = receipt.status ?? -1;
        const tx = this.transactions.find((tx) => tx.hash === hash);
        if (tx) {
          tx.status = newStatus;
          tx.statusNumber = newStatusNumber as 0 | 1 | -1;
        }
      })
      .catch((_err) => {
        // ignore
      });
  };

  exists = (hash: string): boolean => {
    return this.transactions.some((tx) => tx.hash === hash);
  };

  loadTransactions = () => {
    if (isBrowser) {
      const raw = localStorage.getItem("transactions");
      try {
        this.transactions = JSON.parse(raw || "[]");
      } catch (e) {
        // do nothing
      }
    }
  };
}

export const transactionStore = new TransactionStore();
