import axios from "axios"
import { data } from "react-router-dom"


axios.defaults.withCredentials = true

export const fetchData = async (endpoint, options) => {
    try {
        const res = await axios(`${import.meta.env.VITE_DEV_API}/api/v1/${endpoint}`,options)
        return {
            isResponseOk: true,
            data: res.data
        }
    } catch (error) {
        console.log(error)
        return {
            isResponseOk: false,
            message: error.response.data.message,
            code: error?.response?.status
        }
    }
}