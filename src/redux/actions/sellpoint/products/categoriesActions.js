import api from "../../../../Api/Django";

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

export function getCategoriesSuccess(categories){
    return{
        type: GET_CATEGORIES_SUCCESS, categories
    }
}

export const getCategories=(url)=>(dispatch, getState)=>{
    return api.getCategories(url)
        .then(r=>{
            dispatch(getCategoriesSuccess(r));
        }).catch(e=>{
            throw e
    })
}