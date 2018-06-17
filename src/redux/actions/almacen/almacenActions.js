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
export const SAVE_ALMACEN_SUCCESS = 'SAVE_ALMACEN_SUCCESS';

export function saveAlmacenSuccess(almacen){
    return{
        type:SAVE_ALMACEN_SUCCESS, almacen
    }
}

export const saveAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.newAlmacen(almacen)
        .then(r=>{
            
            dispatch(saveAlmacenSuccess(r));
        }).catch(e=>{
            
            throw e
        })
};

//EDIT

export const EDIT_ALMACEN_SUCCESS = 'EDIT_ALMACEN_SUCCESS';
export function editAlmacenSuccess(almacen) {
    return{
        type: EDIT_ALMACEN_SUCCESS, almacen
    }
}

export const editAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.editAlmacen(almacen)
        .then(r=>{
            dispatch(editAlmacenSuccess(r))
            
        }).catch(e=>{
            
        })
};



//Delete

export const DELETE_ALMACEN_SUCCESS = 'DELETE_ALMACEN_SUCCESS';

export function deleteAlmacenSuccess(almacen){
    return {
        type:DELETE_ALMACEN_SUCCESS, almacen
    }
}

export const deleteAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.deleteAlmacen(almacen.id)
        .then(r=>{
            dispatch(deleteAlmacenSuccess(almacen))
        }).catch(e=>{
            throw e;
        })
};


