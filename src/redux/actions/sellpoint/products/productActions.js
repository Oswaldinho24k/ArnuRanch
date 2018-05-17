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

//Edit product
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';

export function editProductSuccess(product){
    return{
        type: EDIT_PRODUCT_SUCCESS, product
    }
}

export const editProduct=(product)=>(dispatch, getState)=>{
    return api.editProduct(product)
        .then(r=>{
            dispatch(editProductSuccess(r));
        }).catch(e=>{
            throw e
    })
}


//DELETE product
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export function deleteProductSuccess(product){
    return{
        type: DELETE_PRODUCT_SUCCESS, product
    }
}

export const deleteProduct=(product)=>(dispatch, getState)=>{
    return api.deleteProduct(product)
        .then(r=>{
            dispatch(deleteProductSuccess(r));
        }).catch(e=>{
            throw e
    })
}