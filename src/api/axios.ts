import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'https://reqres.in/api'
}

const axiosInstance: AxiosInstance = axios.create(config)

axiosInstance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response: AxiosResponse) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export {
  axios,
  axiosInstance,

  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
}
