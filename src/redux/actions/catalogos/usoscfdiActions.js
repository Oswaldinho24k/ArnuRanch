import api from "../../../Api/Django";

export const GET_USOS_SUCCESS = 'GET_USOS_SUCCESS';

export function getUsosSuccess(usos){
    return{
        type:GET_USOS_SUCCESS, usos
    }
}

export const getUsos=()=>(dispatch, getState)=>{
    return api.getUsos()
        .then(r=>{
            dispatch(getUsosSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_USOS_SUCCESS = 'SAVE_USOS_SUCCESS';

export function saveUsosSuccess(usos){
    return{
        type:SAVE_USOS_SUCCESS, usos
    }
}

export const saveUsos=(usos)=>(dispatch, getState)=>{
    return api.newUsos(usos)
        .then(r=>{

            dispatch(saveUsosSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_USOS_SUCCESS = 'EDIT_USOS_SUCCESS';
export function editUsosSuccess(usos) {
    return{
        type: EDIT_UNIDADMEDIDA_SUCCESS, usos
    }
}

export const editUsos=(usos=>(dispatch, getState)=>{
    return api.editUsos(usos)
        .then(r=>{
            dispatch(editUsosSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_USOS_SUCCESS = 'DELETE_USOS_SUCCESS';

export function deleteUsosSuccess(usos){
    return {
        type:DELETE_USOS_SUCCESS, usos
    }
}

export const deleteUsos=(usos)=>(dispatch, getState)=> {
    return api.deleteProductos(usos.id)
        .then(r => {
            dispatch(deleteUsosSuccess(usos))
        }).catch(e => {
            throw e;
        })
};