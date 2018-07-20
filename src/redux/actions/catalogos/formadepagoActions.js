import api from "../../../Api/Django";

export const GET_FORMA_PAGO_SUCCESS = 'GET_FORMA_PAGO_SUCCESS';

export function getFormaPSuccess(formaP){
    return{
        type:GET_FORMA_PAGO_SUCCESS, formaP
    }
}

export const getCatPagos=()=>(dispatch, getState)=>{
    return api.getCatPagos()
        .then(r=>{
            dispatch(getFormaPSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_FORMA_PAGO_SUCCESS = 'SAVE_FORMA_PAGO_SUCCESS';

export function saveFormaPSuccess(formaP){
    return{
        type:SAVE_FORMA_PAGO_SUCCESS, formaP
    }
}

export const newCatPago=(formaP)=>(dispatch, getState)=>{
    return api.newCatPago(formaP)
        .then(r=>{
            dispatch(saveFormaPSuccess(r));
        }).catch(e=>{
            throw e
        })
};

//EDIT

export const EDIT_FORMA_PAGO_SUCCESS = 'EDIT_FORMA_PAGO_SUCCESS';
export function editFormaPSuccess(formaP) {
    return{
        type: EDIT_FORMA_PAGO_SUCCESS, formaP
    }
}

export const editCatPago=(formaP)=>(dispatch, getState)=>{
    return api.editCatPago(formaP)
        .then(r=>{
            dispatch(editFormaPSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_FORMA_PAGO_SUCCESS = 'DELETE_FORMA_PAGO_SUCCESS';

export function deleteFormaPSuccess(formaP){
    return {
        type:DELETE_FORMA_PAGO_SUCCESS, formaP
    }
}

export const deleteCatPago=(formaPId)=>(dispatch, getState)=> {
    return api.deleteCatPago(formaPId)
        .then(r => {
            dispatch(deleteFormaPSuccess(formaPId))
        }).catch(e => {
            throw e;
        })
};