import api from "../../Api/Django";

export const GET_EGRESOS_SUCCESS = 'GET_EGRESOS_SUCCESS';

export function getEgresosSuccess(egresos){
    return{
        type:GET_EGRESOS_SUCCESS, egresos
    }
}

export const getEgresos=()=>(dispatch, getState)=> {
    api.getEgresos()
        .then(r => {
            dispatch(getEgresosSuccess(r))
        }).catch(e => {
        console.log(e)
    })
};

/*FORM EGRESO SAVE*/

export const SAVE_EGRESO_SUCCESS = 'SAVE_EGRESO_SUCCESS';

export function saveEgresoSuccess(egreso){
    return{
        type:SAVE_EGRESO_SUCCESS, egreso
    }
}

export const saveEgreso=(egreso)=>(dispatch, getState)=>{
    api.newEgreso(egreso)
        .then(r=>{
            console.log(r);
            dispatch(saveEgresoSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};