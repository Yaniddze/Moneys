export type Bill = {
  id: string;
  title: string;
}

export type Transaction = {
  bill: Bill;
  id: string;
  type: TransactionType;
  info: TransactionInfo;
}

export type TransactionType = {
  id: string;
  title: string;
}

export type TransactionInfo = {
  date: Date;
  description: string;
  value: number;
}
