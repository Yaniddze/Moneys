import axios, { AxiosInstance, Canceler } from 'axios';

type ReturnType = {
  httpClient: AxiosInstance;
  canceler: Canceler | undefined;
};

export const createClient = (accessToken: string): ReturnType => {
  let canceler: Canceler | undefined;

  const cancellation = new axios.CancelToken((c) => {
    canceler = c;
  });

  const httpClient = axios.create({
    baseURL: 'https://yaniddze.com/api/v1',
    cancelToken: cancellation,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    httpClient,
    canceler,
  };
};
