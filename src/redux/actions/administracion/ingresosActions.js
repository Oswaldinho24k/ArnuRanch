import api from "../../../Api/Django";

export const GET_INGRESOS_SUCCESS = 'GET_INGRESOS_SUCCESS';

export function getIngresosSuccess(ingresos){
    return{
        type:GET_INGRESOS_SUCCESS, ingresos
    }
}

export const getIngresos=()=>(dispatch, getState)=> {
    api.getIngresos()
        .then(r => {
            dispatch(getIngresosSuccess(r))
        }).catch(e => {
        console.log(e)
    })
};

/*FORM INGRESO SAVE*/

export const SAVE_INGRESO_SUCCESS = 'SAVE_INGRESO_SUCCESS';

export function saveIngresoSuccess(ingreso){
    return{
        type:SAVE_INGRESO_SUCCESS, ingreso
    }
}

export const saveIngreso=(ingreso)=>(dispatch, getState)=>{
    api.newIngreso(ingreso)
        .then(r=>{
            console.log(r);
            let client= getState().clientes.list.find(l=>l.id===r.client);
            r['client'] = client
            dispatch(saveIngresoSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};

/*EDIT INGRESO*/

export const EDIT_INGRESO_SUCCESS = 'EDIT_INGRESO_SUCCESS';
export function editIngresoSucces(ingreso) {
    return{
        type: EDIT_INGRESO_SUCCESS, ingreso
    }
}

export const editIngreso=(ingreso)=>(dispatch, getState)=>{
    return api.editIngreso(ingreso)
        .then(r=>{
            let client= getState().clientes.list.find(l=>l.id===r.client);
            r['client'] = client
            dispatch(editIngresoSucces(r))
        }).catch(e=>{
            console.log(e)
        })
};

/*DELETE INGRESO*/

export const DELETE_INGRESO_SUCCESS = 'DELETE_INGRESO_SUCCESS';

export function deleteIngresoSuccess(ingresoId){
    return {
        type:DELETE_INGRESO_SUCCESS, ingresoId
    }
}

export const deleteIngreso=(ingresoId)=>(dispatch, getState)=>{
    return api.deleteIngreso(ingresoId)
        .then(r=>{
            dispatch(deleteIngresoSuccess(ingresoId))
        }).catch(e=>{
            console.log(e)
        })
};