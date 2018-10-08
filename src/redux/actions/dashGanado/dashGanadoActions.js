import api from "../../../Api/Django";

export const GET_DASHDATA_SUCCESS = 'GET_DASHDATA_SUCCESS';

export function getDashDataSuccess(data){
    return{
        type:GET_DASHDATA_SUCCESS, data
    }
}

export const getDataDash=(url)=>(dispatch, getState)=>{
    return api.getDataDash(url)
        .then(r=>{

            dispatch(getDashDataSuccess(r));
        }).catch(e=>{
            throw e
        })
};
