import axios, { AxiosInstance, Canceler } from 'axios';

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
    baseURL: 'https://localhost:5001/api/v1/auth',
    cancelToken: cancellation,
  });

  return {
    httpClient,
    canceler,
  };
};
