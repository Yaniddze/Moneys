import { useState } from 'react';

type Bill = {
  id: string;
  title: string;
}

type ReturnType = {
  bills: Bill[];
}

export const useBills = (): ReturnType => {
  const [bills] = useState([]);

  return {
    bills,
  };
};
