import api from "../../../Api/Django";

export const GET_UNIDADMEDIDA_SUCCESS = 'GET_UNIDADMEDIDA_SUCCESS';

export function getUnidadMSuccess(unindadM){
    return{
        type:GET_UNIDADMEDIDA_SUCCESS, productos
    }
}

export const getUnidadM=()=>(dispatch, getState)=>{
    return api.getUnidadM()
        .then(r=>{
            dispatch(getUnidadMSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_UNIDADMEDIDA_SUCCESS = 'SAVE_UNIDADMEDIDA_SUCCESS';

export function saveUnidadMSuccess(unidadM){
    return{
        type:SAVE_UNIDADMEDIDA_SUCCESS, unidadM
    }
}

export const saveUnidadM=(unidadM)=>(dispatch, getState)=>{
    return api.newUnidadM(unidadM)
        .then(r=>{

            dispatch(saveUnidadMSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_UNIDADMEDIDA_SUCCESS = 'EDIT_UNIDADMEDIDA_SUCCESS';
export function editUnidadMSuccess(unidadM) {
    return{
        type: EDIT_UNIDADMEDIDA_SUCCESS, unidadM
    }
}

export const editUnidadM=(unidadM)=>(dispatch, getState)=>{
    return api.editUnidadM(unidadM)
        .then(r=>{
            dispatch(editUnidadMSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_UNIDADMEDIDA_SUCCESS = 'DELETE_UNIDADMEDIDA_SUCCESS';

export function deleteUnidadMSuccess(unidadM){
    return {
        type:DELETE_UNIDADMEDIDA_SUCCESS, unidadM
    }
}

export const deleteUnidadM=(unidadM)=>(dispatch, getState)=> {
    return api.deleteProductos(unidadM.id)
        .then(r => {
            dispatch(deleteUnidadMSuccess(unidadM))
        }).catch(e => {
            throw e;
        })
};