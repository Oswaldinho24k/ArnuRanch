import api from "../../../Api/Django";
import {getCuentas} from "../cuentas/cuentasActions";



///GET INGRESOS SEARCH

/*export const GET_INSEARCH_SUCCESS = 'GET_INSEARCH_SUCCESS';

export function getInSearchSuccess(ingresoS){
    return{
        type:GET_INSEARCH_SUCCESS, ingresoS
    }
}

export const getInSearch=(url)=>(dispatch, getState)=>{
    return api.getIngresos(url)
        .then(r=>{
            dispatch(getInSearchSuccess(r.results));
        }).catch(e=>{
            throw e
        })
};*/

///end


export const GET_INGRESOS_SUCCESS = 'GET_INGRESOS_SUCCESS';

export function getIngresosSuccess(ingresos){
    return{
        type:GET_INGRESOS_SUCCESS, ingresos
    }
}

export const GET_INGRESOS_DATA_SUCCESS = 'GET_INGRESOS_DATA_SUCCESS';

export function getAllIngresosSuccess(dataIngreso){
    return{
        type:GET_INGRESOS_DATA_SUCCESS, dataIngreso
    }
}

export const getIngresos=(url)=>(dispatch, getState)=> {
    api.getIngresos(url)
        .then(r => {
            dispatch(getIngresosSuccess(r.results));
            dispatch(getAllIngresosSuccess(r));
            dispatch(getCuentas());
        }).catch(e => {
        
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
            
            let client= getState().clientes.list.find(l=>l.id===r.client);
            r['client'] = client
            dispatch(saveIngresoSuccess(r));
            dispatch(getIngresos());
        }).catch(e=>{
        
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
            dispatch(editIngresoSucces(r))
        }).catch(e=>{
            
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
            dispatch(deleteIngresoSuccess(ingresoId));
            dispatch(getIngresos());
        }).catch(e=>{
            
        })
};