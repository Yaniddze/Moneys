import { Transaction } from '../../../domain/types';

export type AddTransactionVariables = {
  request: {
    billId: string;
    date: Date;
    description: string;
    typeId: string;
    userId: string;
    value: number;
  };
};

export type AddTransactionMutationAnswer = {
  createTransaction: {
    data: Transaction;
    errors: string[];
    success: boolean;
  };
};
