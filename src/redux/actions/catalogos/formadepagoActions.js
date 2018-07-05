import api from "../../../Api/Django";

export const GET_FORMA_PAGO_SUCCESS = 'GET_FORMA_PAGO_SUCCESS';

export function getFormaPSuccess(formaP){
    return{
        type:GET_FORMA_PAGO_SUCCESS, formaP
    }
}

export const getFormaP=()=>(dispatch, getState)=>{
    return api.getFormaP()
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

export const saveFormaP=(formaP)=>(dispatch, getState)=>{
    return api.newFormaP(formaP)
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

export const editFormaP=(formaP=>(dispatch, getState)=>{
    return api.editFormaP(formaP)
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

export const deleteFormaP=(formaP)=>(dispatch, getState)=> {
    return api.deleteFormaP(formaP.id)
        .then(r => {
            dispatch(deleteFormaPSuccess(formaP))
        }).catch(e => {
            throw e;
        })
};