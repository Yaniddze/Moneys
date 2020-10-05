import { Bill } from '../../../domain/types';

export type AddBillVariables = {
  request: {
    userId: string;
    title: string;
  };
}

export type AddBillMutationAnswer = {
  createBill: {
    success: boolean;
    errors: string[];
    data: Bill;
  };
}
