export interface Request {
  name: string;
  detail: string;
  attachment: string;
  recipientAddress: string;
  recipientName: string;
  requesterName: string;
  requesterAddress: string;
  requestTimestamp: string;
  requestTxhash: string;
  status: string;
  denom: string;
  rawAmount: string;
  amount: string;
  rawBudget: string;
  budget: number;
  approverAddress: string;
  approverName: null;
  approveTxhash: string;
  approveTimestamp: string;
}
