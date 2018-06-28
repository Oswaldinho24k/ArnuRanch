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
            
            throw e
        })
};

//DELETE

export const DELETE_ITEMALMACEN_SUCCESS = 'DELETE_ITEMALMACEN_SUCCESS';

export function deleteItemAlmacenSuccess(item, almacen){
    return {
        type:DELETE_ITEMALMACEN_SUCCESS, item, almacen
    }
}

export const deleteItem=(item, almacen)=>(dispatch, getState)=>{
    return api.deleteItem(item, almacen)
        .then(r=>{
            dispatch(deleteItemAlmacenSuccess(item, almacen))
        }).catch(e=>{
            throw e;
        })
};