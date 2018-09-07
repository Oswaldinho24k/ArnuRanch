import api from "../../../Api/Django";
import {saveFormaPSuccess} from "./formadepagoActions";

export const GET_UNIDADMEDIDA_SUCCESS = 'GET_UNIDADMEDIDA_SUCCESS';

export function getUnidadMedidaSuccess(unidadMe){
    return{
        type:GET_UNIDADMEDIDA_SUCCESS, unidadMe
    }
}

export const getCatUnidades=()=>(dispatch, getState)=>{
    return api.getCatUnidades()
        .then(r=>{
            console.log("Respuesta: ",r)
            dispatch(getUnidadMedidaSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_UNIDADMEDIDA_SUCCESS = 'SAVE_UNIDADMEDIDA_SUCCESS';

export function saveUnidadMSuccess(unidadM){
    return{
        type:SAVE_UNIDADMEDIDA_SUCCESS, unidadM
    }
}

export const newCatUnidad=(unidadM)=>(dispatch, getState)=>{
    return api.newCatUnidad(unidadM)
        .then(r=>{

            dispatch(saveUnidadMSuccess(r));
        }).catch(e=>{

            throw e
        })
}



//EDIT

export const EDIT_UNIDADMEDIDA_SUCCESS = 'EDIT_UNIDADMEDIDA_SUCCESS';
export function editUnidadMSuccess(unindadM) {
    return{
        type: EDIT_UNIDADMEDIDA_SUCCESS, unindadM
    }
}

export const editCatUnidad=(unindadM)=>(dispatch, getState)=>{
    return api.editCatUnidad(unindadM)
        .then(r=>{
            dispatch(editUnidadMSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_UNIDADMEDIDA_SUCCESS = 'DELETE_UNIDADMEDIDA_SUCCESS';

export function deleteUnidadMSuccess(unidadM){
    return {
        type:DELETE_UNIDADMEDIDA_SUCCESS, unidadM
    }
}

export const deleteCatUnidad=(unidadM)=>(dispatch, getState)=>{
    return api.deleteCatUnidad(unidadM.id)
        .then(r=>{
            dispatch(deleteUnidadMSuccess(unidadM))
        }).catch(e=>{
            throw e;
        })
};

