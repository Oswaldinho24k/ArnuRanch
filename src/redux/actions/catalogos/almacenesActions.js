import api from "../../../Api/Django";

export const GET_ALMACENES_SUCCESS = 'GET_ALMACENES_SUCCESS';

export function getAlmacenesSuccess(almacenes){
    return{
        type:GET_ALMACENES_SUCCESS, almacenes
    }
}

export const getAlmacenes=()=>(dispatch, getState)=>{
    return api.getAlmacenes()
        .then(r=>{
            dispatch(getAlmacenesSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_ALMACENES_SUCCESS = 'SAVE_ALMACENES_SUCCESS';

export function saveAlmacenesSuccess(almacenes){
    return{
        type:SAVE_ALMACENES_SUCCESS, almacenes
    }
}

export const saveAlmacenes=(almacenes)=>(dispatch, getState)=>{
    return api.newAlmacenes(almacenes)
        .then(r=>{
            dispatch(saveAlmacenesSuccess(r));
        }).catch(e=>{
            throw e
        })
};

//EDIT

export const EDIT_ALMACENES_SUCCESS = 'EDIT_ALMACENES_SUCCESS';
export function editAlmacenesSuccess(almacenes) {
    return{
        type: EDIT_ALMACENES_SUCCESS, almacenes
    }
}

export const editAlmacenes=(almacenes=>(dispatch, getState)=>{
    return api.editAlmacenes(almacenes)
        .then(r=>{
            dispatch(editAlmacenesSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_ALMACENES_SUCCESS = 'DELETE_ALMACENES_SUCCESS';

export function deleteAlmacenesSuccess(almacenes){
    return {
        type:DELETE_ALMACENES_SUCCESS, almacenes
    }
}

export const deleteAlmacen=(almacenes)=>(dispatch, getState)=> {
    return api.deleteProductos(almacenes.id)
        .then(r => {
            dispatch(deleteAlmacenesSuccess(almacenes))
        }).catch(e => {
            throw e;
        })
};