import api from "../../../Api/Django";

export const GET_PRODUCTOS_SUCCESS = 'GET_PRODUCTOS_SUCCESS';

export function getProductosSuccess(productos){
    return{
        type:GET_PRODUCTOS_SUCCESS, productos
    }
}

export const getProdcutos=()=>(dispatch, getState)=>{
    return api.getProdcutos()
        .then(r=>{
            dispatch(getProductosSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_PRODUCTOS_SUCCESS = 'SAVE_PRODUCTOS_SUCCESS';

export function saveProductosSuccess(productos){
    return{
        type:SAVE_PRODUCTOS_SUCCESS, productos
    }
}

export const saveProductos=(prodcutos)=>(dispatch, getState)=>{
    return api.newProdcuto(prodcutos)
        .then(r=>{

            dispatch(saveProductosSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_PRODUCTOS_SUCCESS = 'EDIT_PRODUCTOS_SUCCESS';
export function editProductosSuccess(prodcutos) {
    return{
        type: EDIT_PRODUCTOS_SUCCESS, prodcutos
    }
}

export const editProductos=(productos)=>(dispatch, getState)=>{
    return api.editProductos(productos)
        .then(r=>{
            dispatch(editProductosSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_PRODUCTOS_SUCCESS = 'DELETE_PRODUCTOS_SUCCESS';

export function deleteProductosSuccess(prodcutos){
    return {
        type:DELETE_PRODUCTOS_SUCCESS, prodcutos
    }
}

export const deleteProductos=(prodcutos)=>(dispatch, getState)=>{
    return api.deleteProductos(productos.id)
        .then(r=>{
            dispatch(deleteProductosSuccess(prodcutos))
        }).catch(e=>{
            throw e;
        })
};

