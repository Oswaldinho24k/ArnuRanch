import api from "../../../../Api/Django";

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export function getProductsSuccess(products){
    return{
        type: GET_PRODUCTS_SUCCESS, products
    }
}

export const getProducts=(url)=>(dispatch, getState)=>{
    return api.getAllProducts(url)
        .then(r=>{
            dispatch(getProductsSuccess(r));
        }).catch(e=>{
            throw e
    })
}