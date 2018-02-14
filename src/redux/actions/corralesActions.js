import api from "../../Api/Django";

export const GET_CORRALES_SUCCESS = 'GET_CORRALES_SUCCESS';

export function getCorralesSuccess(corrales){
    return{
        type:GET_CORRALES_SUCCESS, corrales
    }
}

export const getCorrales=()=>(dispatch, getState)=>{
    return api.getCorrales()
        .then(r=>{
            dispatch(getCorralesSuccess(r))
        }).catch(e=>{
        throw e
    })
};

/*FORM CORRAL SAVE*/

export const SAVE_CORRAL_SUCCESS = 'SAVE_CORRAL_SUCCESS';

export function saveCorralSuccess(corral){
    return{
        type:SAVE_CORRAL_SUCCESS, corral
    }
}

export const saveCorral=(corral)=>(dispatch, getState)=>{
    return api.newCorral(corral)
        .then(r=>{
            console.log(r);
            dispatch(saveCorralSuccess(r))
        })
        .catch(e=>{
            throw e
        })
};