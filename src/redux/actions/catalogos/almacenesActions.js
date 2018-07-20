import api from "../../../Api/Django";

export const GET_CATALMACEN_SUCCESS = 'GET_CATALMACEN_SUCCESS';

export function getCatAlmacenesSuccess(catAlmacenes){
    return{
        type:GET_CATALMACEN_SUCCESS, catAlmacenes
    }
}

export const getCatAlmacenes=()=>(dispatch, getState)=>{
    return api.getCatAlmacenes()
        .then(r=>{
            dispatch(getCatAlmacenesSuccess(r))
        }).catch(e=>{

        })
};




//save
export const SAVE_ALMACENES_SUCCESS = 'SAVE_ALMACENES_SUCCESS';

export function saveAlmacenesSuccess(catAlmacen){
    return{
        type:SAVE_ALMACENES_SUCCESS, catAlmacen
    }
}

export const newCatAlmacen=(catAlmacen)=>(dispatch, getState)=>{
    return api.newCatAlmacen(catAlmacen)
        .then(r=>{
            dispatch(saveAlmacenesSuccess(r));
        }).catch(e=>{
            throw e
        })
};

//EDIT

export const EDIT_ALMACENES_SUCCESS = 'EDIT_ALMACENES_SUCCESS';
export function editAlmacenesSuccess(catAlmacen) {
    return{
        type: EDIT_ALMACENES_SUCCESS, catAlmacen
    }
}

export const editCatAlmacen=(catAlmacen)=>(dispatch, getState)=>{
    return api.editCatAlmacen(catAlmacen)
        .then(r=>{
            dispatch(editAlmacenesSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_ALMACENES_SUCCESS = 'DELETE_ALMACENES_SUCCESS';

export function deleteAlmacenesSuccess(catAlmacen){
    return {
        type:DELETE_ALMACENES_SUCCESS, catAlmacen
    }
}

export const deleteCatAlmacen=(catAlmacenesId)=>(dispatch, getState)=> {
    return api.deleteCatAlmacen(catAlmacenesId)
        .then(r => {
            dispatch(deleteAlmacenesSuccess(catAlmacenesId))
        }).catch(e => {
            throw e;
        })
};