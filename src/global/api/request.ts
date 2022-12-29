import axios, { Method, AxiosResponse } from "axios";
// import store from "../store";

export const IPSF_Url = process.env.REACT_APP_IPSF_URL || "";
const api = axios.create({
  baseURL: IPSF_Url,
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
