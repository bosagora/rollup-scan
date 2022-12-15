import axios, { Method, AxiosResponse } from "axios";
// import store from "../store";

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_BACKEND,
});

//store.getState() // to get store states for token

const request = <T>(
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
  });
};

export default request;
