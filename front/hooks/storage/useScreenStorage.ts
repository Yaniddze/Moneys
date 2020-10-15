import { useState, useEffect } from 'react';
import { observable, autorun } from 'mobx';

const storage = observable({
  width: 0,
});

type ReturnType = {
  width: number;
  setWidth: (value: number) => void;
}

export const useScreenStorage = (): ReturnType => {
  const [width, setWidth] = useState(storage.width);

  const resetWidth = (value: number): void => {
    storage.width = value;
  };

  useEffect(() => autorun(() => {
    setWidth(storage.width);
  }), []);

  return {
    width,
    setWidth: resetWidth,
  };
};
