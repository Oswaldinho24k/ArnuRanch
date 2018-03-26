import api from "../../../Api/Django";



export const SAVE_ITEMALMACEN_SUCCESS = 'SAVE_ITEMALMACEN_SUCCESS';

export function saveItemSuccess(item){
    return{
        type:SAVE_ITEMALMACEN_SUCCESS, item
    }
}

export const saveItem=(item)=>(dispatch, getState)=>{
    return api.newItemAlmacen(item)
        .then(r=>{
            dispatch(saveItemSuccess(r));
        }).catch(e=>{
            console.log(e)
            throw e
        })
};