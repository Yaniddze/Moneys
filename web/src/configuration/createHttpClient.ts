import axios, { AxiosInstance, Canceler } from 'axios';

type ReturnType = {
  httpClient: AxiosInstance;
  canceler: Canceler | undefined;
};

export const createClient = (): ReturnType => {
  let canceler: Canceler | undefined;

  const cancellation = new axios.CancelToken((c) => {
    canceler = c;
  });

  const httpClient = axios.create({
    baseURL: 'https://yaniddze.com/api/v1',
    cancelToken: cancellation,
  });

  return {
    httpClient,
    canceler,
  };
};
