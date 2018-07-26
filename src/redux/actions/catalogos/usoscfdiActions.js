import api from "../../../Api/Django";

export const GET_USOS_SUCCESS = 'GET_USOS_SUCCESS';

export function getUsosSuccess(catCfdis){
    return{
        type:GET_USOS_SUCCESS, catCfdis
    }
}

export const getCatCfdis=()=>(dispatch, getState)=>{
    return api.getCatCfdis()
        .then(r=>{
            dispatch(getUsosSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_USOS_SUCCESS = 'SAVE_USOS_SUCCESS';

export function saveUsosSuccess(catCfdis){
    return{
        type:SAVE_USOS_SUCCESS, catCfdis
    }
}

export const newCatCfdis=(usos)=>(dispatch, getState)=>{
    return api.newCatCfdis(usos)
        .then(r=>{

            dispatch(saveUsosSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_USOS_SUCCESS = 'EDIT_USOS_SUCCESS';
export function editUsosSuccess(catCfdis) {
    return{
        type: EDIT_USOS_SUCCESS, catCfdis
    }
}

export const editCatCfdis=(catCfdis)=>(dispatch, getState)=>{
    return api.editCatCfdis(catCfdis)
        .then(r=>{
            dispatch(editUsosSuccess(r))

        }).catch(e=>{

        })
}




//Delete

export const DELETE_USOS_SUCCESS = 'DELETE_USOS_SUCCESS';

export function deleteUsosSuccess(catCfdis){
    return {
        type:DELETE_USOS_SUCCESS, catCfdis
    }
}

export const deleteCatCfdis=(catCfdisId)=>(dispatch, getState)=> {
    return api.deleteCatCfdis(catCfdisId)
        .then(r => {
            dispatch(deleteUsosSuccess(catCfdisId))
        }).catch(e => {
            throw e;
        })
};