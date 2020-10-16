import { useState, useEffect } from 'react';
import {
  makeObservable,
  observable, 
  action,
  autorun,
} from 'mobx';

class Storage {
  width = 0;

  constructor() {
    makeObservable(this, {
      width: observable,
      setWidth: action,
    });
  }

  setWidth(value: number) {
    this.width = value;
  }
}

type ReturnType = {
  width: number;
  setWidth: (value: number) => void;
}

const storageInstance = new Storage();

export const useScreenStorage = (): ReturnType => {
  const [width, setWidth] = useState(storageInstance.width);

  useEffect(() => autorun(() => {
    setWidth(storageInstance.width);
  }), []);

  return {
    width,
    setWidth: storageInstance.setWidth.bind(storageInstance),
  };
};
