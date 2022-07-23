export interface ManekikiTransaction {
  name: string;
  description: string;
  hash: string;
  status: "pending" | "success" | "reverted";
  statusNumber: 1 | 0 | -1; // 1: success, 0: reverted, -1: pending
}
