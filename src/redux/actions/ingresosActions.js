import api from "../../Api/Django";

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
            dispatch(saveIngresoSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};