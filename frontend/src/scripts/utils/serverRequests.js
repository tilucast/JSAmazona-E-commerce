import { api } from "./api"

export const getProduct = async (id) => {
    try{
        const response = await api.get(`/api/products/${id}`)

        return response.data

    }catch(error){
        
        throw new Error(error.response.data.message)
    }
}