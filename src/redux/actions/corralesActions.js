import api from "../../Api/Django";

export const GET_CORRALES_SUCCESS = 'GET_CORRALES_SUCCESS';

export function getCorralesSuccess(corrales){
    return{
        type:GET_CORRALES_SUCCESS, corrales
    }
}

export const getCorrales=()=>(dispatch, getState)=>{
    api.getCorrales()
        .then(r=>{
            dispatch(getCorralesSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};