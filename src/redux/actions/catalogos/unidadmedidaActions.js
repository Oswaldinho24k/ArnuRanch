import api from "../../../Api/Django";

export const GET_UNIDADMEDIDA_SUCCESS = 'GET_UNIDADMEDIDA_SUCCESS';

export function getUnidadMSuccess(unindadM){
    return{
        type:GET_UNIDADMEDIDA_SUCCESS, unindadM
    }
}

export const getCatUnidades=()=>(dispatch, getState)=>{
    return api.getCatUnidades()
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

export const newCatUnidad=(unidadM)=>(dispatch, getState)=>{
    console.log( "antes dela promesaunidadM",unidadM)
   return api.newCatUnidad(unidadM)
        .then(r=>{
            console.log("unidades",r)
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

export const editCatUnidad=(unidadM)=>(dispatch, getState)=>{
    return api.editCatUnidad(unidadM)
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

export const deleteCatUnidad=(unidadM)=>(dispatch, getState)=> {
    return api.deleteCatUnidad(unidadM.id)
        .then(r => {
            dispatch(deleteUnidadMSuccess(unidadM))
        }).catch(e => {
            throw e;
        })
};