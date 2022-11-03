import axios, { Method } from 'axios';
import { getConfig } from '@/utils';

const { FEISHU_CONFIG: { FEISHU_URL } } = getConfig()

/**
 * @description: 任意请求
 */
 
export const request = async ({ url, option = {} }) => {
  try {
    return axios.request({
      url,
      ...option,
    });
  } catch (error) {
    throw error;
  }
};

interface IMethodV {
  url: string;
  method?: Method;
  headers?: { [key: string]: string };
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export interface IRequest {
  data: any;
  code: number;
}

/**
 * @description: 带 version 的通用 api 请求
 */
export const methodV = async ({
  url,
  method,
  headers = {},
  params = {},
  query = {},
}: IMethodV): Promise<IRequest> => {

  let sendUrl = '';
  if (/^(http:\/\/|https:\/\/)/.test(url)) {
    sendUrl = url;
  } else {
    sendUrl = `${FEISHU_URL}${url}`;
  }
  try {
    debugger
    return new Promise((resolve, reject) => {
      debugger
      axios({
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...headers,
        },
        url: sendUrl,
        method,
        params: query,
        data: {
          ...params,
        },
      })
        .then(({ data, status }) => {
          debugger
          resolve({ data, code: status });
        })
        .catch((error) => {
          debugger
          reject(error);
        });
      // resolve({ data:{}, code: 200 });
    });
  } catch (error) {
    debugger
    throw error;
  }
};

