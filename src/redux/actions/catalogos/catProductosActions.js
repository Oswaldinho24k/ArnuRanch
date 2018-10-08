import api from "../../../Api/Django";

export const GET_CATPRODUCTOS_SUCCESS = 'GET_CATPRODUCTOS_SUCCESS';

export function getProductosSuccess(catalogoPro){
    return{
        type:GET_CATPRODUCTOS_SUCCESS, catalogoPro
    }
}

export const getCatProduts=()=>(dispatch, getState)=>{
    return api.getCatProduts()
        .then(r=>{
            dispatch(getProductosSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_CATPRODUCTOS_SUCCESS = 'SAVE_CATPRODUCTOS_SUCCESS';

export function saveCatProductosSuccess(catalogoPro){
    return{
        type:SAVE_CATPRODUCTOS_SUCCESS, catalogoPro
    }
}

export const newCatProduct=(catalogoPro)=>(dispatch, getState)=>{
    return api.newCatProduct(catalogoPro)
        .then(r=>{

            dispatch(saveCatProductosSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_CATPRODUCTOS_SUCCESS = 'EDIT_CATPRODUCTOS_SUCCESS';
export function editProductosSuccess(catalogoPro) {
    return{
        type: EDIT_CATPRODUCTOS_SUCCESS, catalogoPro
    }
}

export const editCatProduct=(catalogoPro)=>(dispatch, getState)=>{
    return api.editCatProduct(catalogoPro)
        .then(r=>{
            dispatch(editProductosSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_CATPRODUCTOS_SUCCESS = 'DELETE_CATPRODUCTOS_SUCCESS';

export function deleteProductosSuccess(catalogoProId){
    return {
        type:DELETE_CATPRODUCTOS_SUCCESS, catalogoProId
    }
}

export const deleteCatProducts=(catalogoProId)=>(dispatch, getState)=>{
    return api.deleteCatProducts(catalogoProId)
        .then(r=>{
            dispatch(deleteProductosSuccess(catalogoProId))
        }).catch(e=>{
            throw e;
        })
};

