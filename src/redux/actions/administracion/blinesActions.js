/*
import api from "../../../Api/Django";

export const GET_BLINES_SUCCESS = 'GET_BLINES_SUCCESS';

export function getBusinessLinessSuccess(blines){
    return{
        type:GET_BLINES_SUCCESS, blines
    }
}

export const getBusinessLines=()=>(dispatch, getState)=>{
    return api.getBusinessLines()
        .then(r=>{
            dispatch(getBusinessLinessSuccess(r))
        }).catch(e=>{
            throw e
        })
};

*/
