import api from "../../../Api/Django";

export const GET_PRESUPUESTOS_SUCCESS = 'GET_PRESUPUESTOS_SUCCESS';

export function getPresupuestosSuccess(presupuestos){
    return{
        type:GET_PRESUPUESTOS_SUCCESS, presupuestos
    }
}

export const getCatPresupuestos=()=>(dispatch, getState)=>{
    return api.getCatPresupuestos()
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

export const newCatPresupuesto=(presupuestos)=>(dispatch, getState)=>{
    return api.newCatPresupuesto(presupuestos)
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

export const editCatPresupuesto=(presupuestos)=>(dispatch, getState)=>{
    return api.editCatPresupuesto(presupuestos)
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

export const deleteCatPresupuesto=(presupuestos)=>(dispatch, getState)=>{
    return api.deleteCatPresupuesto(presupuestos.id)
        .then(r=>{
            dispatch(deletePresupuestosSuccess(presupuestos))
        }).catch(e=>{
            throw e;
        })
};

