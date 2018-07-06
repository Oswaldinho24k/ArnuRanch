import api from "../../../Api/Django";

export const GET_PRESUPUESTOS_SUCCESS = 'GET_PRESUPUESTOS_SUCCESS';

export function getPresupuestosSuccess(presupuestos){
    return{
        type:GET_PRESUPUESTOS_SUCCESS, presupuestos
    }
}

export const getPresupuestos=()=>(dispatch, getState)=>{
    return api.getPresupuestos()
        .then(r=>{
            dispatch(getPresupuestosSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_PRESUPUESTOS_SUCCESS = 'SAVE_PRESUPUESTOS_SUCCESS';

export function savePresupuestosSuccess(presupuestos){
    return{
        type:SAVE_PRESUPUESTOS_SUCCESS, presupuestos
    }
}

export const savePresupuestos=(presupuestos)=>(dispatch, getState)=>{
    return api.newPresupuestos(presupuestos)
        .then(r=>{

            dispatch(savePresupuestosSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_PRESUPUESTOS_SUCCESS = 'EDIT_PRESUPUESTOS_SUCCESS';
export function editPresupuestosSuccess(presupuestos) {
    return{
        type: EDIT_PRESUPUESTOS_SUCCESS, presupuestos
    }
}

export const editPresupuestos=(presupuestos)=>(dispatch, getState)=>{
    return api.editPresupuestos(presupuestos)
        .then(r=>{
            dispatch(editPresupuestosSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_PRESUPUESTOS_SUCCESS = 'DELETE_PRESUPUESTOS_SUCCESS';

export function deletePresupuestosSuccess(presupuestos){
    return {
        type:DELETE_PRESUPUESTOS_SUCCESS, presupuestos
    }
}

export const deletePresupuestos=(presupuestos)=>(dispatch, getState)=>{
    return api.deleteCuentasB(presupuestos.id)
        .then(r=>{
            dispatch(deletePresupuestosSuccess(presupuestos))
        }).catch(e=>{
            throw e;
        })
};

