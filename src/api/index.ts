import {
  axiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from './axios'

export const get = (url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return axiosInstance.get(url, config)
  } catch (err: any) {
    throw err
  }
}

export const post = (url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return axiosInstance.post(url, data, config)
  } catch (err: any) {
    throw err
  }
}

export const put = (url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return axiosInstance.put(url, data, config)
  } catch (err: any) {
    throw err
  }
}

export const remove = (url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return axiosInstance.delete(url, config)
  } catch (err: any) {
    throw err
  }
}
