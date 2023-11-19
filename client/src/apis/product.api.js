import { PRODUCT_ENDPOINT } from "./index.api"

export const getAllProducts= async ()=>{
    try {
        const request = await fetch(PRODUCT_ENDPOINT)
        const response = await request.json()
        return response
    } catch (e) {
        return{
            message:e.message,
            success:false,
            data:null
        }        
    }
}