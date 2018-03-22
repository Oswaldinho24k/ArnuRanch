import api from "../../../Api/Django";



export const SAVE_ALMACEN_SUCCESS = 'SAVE_ALMACEN_SUCCESS';

export function saveAlmacenSuccess(almacen){
    return{
        type:SAVE_ALMACEN_SUCCESS, almacen
    }
}

export const saveAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.newAlmacen(almacen)
        .then(r=>{
            console.log(r);
            dispatch(saveAlmacenSuccess(r));
        }).catch(e=>{
            console.log(e)
            throw e
        })
};
