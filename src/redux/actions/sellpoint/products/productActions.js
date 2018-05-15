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
//New product
export const NEW_PRODUCT_SUCCESS = 'NEW_PRODUCT_SUCCESS';

export function newProductSuccess(product){
    return{
        type: NEW_PRODUCT_SUCCESS, product
    }
}

export const newProduct=(product)=>(dispatch, getState)=>{
    return api.newProduct(product)
        .then(r=>{
            dispatch(newProductSuccess(r));
        }).catch(e=>{
            throw e
    })
}