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

/*EDIT EGRESO*/

export const EDIT_EGRESO_SUCCESS = 'EDIT_EGRESO_SUCCESS';
export function editEgresoSucces(egreso) {
    return{
        type: EDIT_EGRESO_SUCCESS, egreso
    }
}

export const editEgreso=(egreso)=>(dispatch, getState)=>{
    return api.editEgreso(egreso)
        .then(r=>{
            dispatch(editEgresoSucces(r))
        }).catch(e=>{
            console.log(e)
        })
};

/*DELETE EGRESO*/

export const DELETE_EGRESO_SUCCESS = 'DELETE_EGRESO_SUCCESS';

export function deleteEgresoSuccess(egresoId){
    return {
        type:DELETE_EGRESO_SUCCESS, egresoId
    }
}

export const deleteEgreso=(egresoId)=>(dispatch, getState)=>{
    return api.deleteEgreso(egresoId)
        .then(r=>{
            dispatch(deleteEgresoSuccess(egresoId))
        }).catch(e=>{
            console.log(e)
        })
};