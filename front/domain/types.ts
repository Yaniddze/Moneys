export type Bill = {
  id: string;
  title: string;
}

export type TransactionType = {
  id: string;
  title: string;
  spending: boolean;
}

export type TransactionInfo = {
  date: Date;
  description: string;
  value: number;
}

export type Transaction = {
  bill: Bill;
  id: string;
  type: TransactionType;
  info: TransactionInfo;
}
