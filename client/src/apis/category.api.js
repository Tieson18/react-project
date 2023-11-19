import { CATEGORY_ENDPOINT } from "./index.api"

export const getAllCategories= async ()=>{
    try {
        const request = await fetch(CATEGORY_ENDPOINT)
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