import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Constants } from '../utils/constants'
import { getStorage } from '../utils/localStorage'



const client = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    })

    instance.interceptors.request.use((config) => {
        const token = getStorage(Constants.AUTH_TOKEN)
        config.headers = {
            Authorization: `Bearer ${token}`
        }

        return config
    }, (error) => {
        return Promise.reject(error)
    })

    return instance
}

export default client()