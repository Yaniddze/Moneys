import axios, { AxiosInstance, Canceler } from 'axios';
import { hostAddress } from './hostConfig';

type ReturnType = {
  httpClient: AxiosInstance;
  canceler: Canceler| undefined;
}

export const createClient = (): ReturnType => {
  let canceler: Canceler | undefined;

  const cancellation = new axios.CancelToken((c) => {
    canceler = c;
  });

  const httpClient = axios.create({
    baseURL: `${hostAddress}/api/v1`,
    cancelToken: cancellation,
  });

  return {
    httpClient,
    canceler,
  };
};
