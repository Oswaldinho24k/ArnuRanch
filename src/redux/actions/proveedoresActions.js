import api from "../../Api/Django";
import {editAnimalSuccess} from "./animalsActions";

export const GET_PROVEEDORES_SUCCESS = 'GET_PROVEEDORES_SUCCESS';

export function getProveedoresSuccess(proveedores){
    return{
        type:GET_PROVEEDORES_SUCCESS, proveedores
    }
}

export const getProveedores=()=>(dispatch, getState)=>{
    api.getProveedores()
        .then(r=>{
            dispatch(getProveedoresSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};


/*FORM PROVEEDOR SAVE*/

export const SAVE_PROVEEDOR_SUCCESS = 'SAVE_PROVEEDOR_SUCCESS';

export function saveProveedorSuccess(proveedor){
    return{
        type:SAVE_PROVEEDOR_SUCCESS, proveedor
    }
}

export const saveProveedor=(proveedor)=>(dispatch, getState)=>{
    api.newProveedor(proveedor)
        .then(r=>{
            console.log(r);
            dispatch(saveProveedorSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};

/*EDIT PROVEEDOR*/

export const EDIT_PROVEEDOR_SUCCESS = 'EDIT_PROVEEDOR_SUCCESS';
export function editProveedorSucces(proveedor) {
    return{
        type: EDIT_PROVEEDOR_SUCCESS, proveedor
    }
}

export const editProveedor=(proveedor)=>(dispatch, getState)=>{
    return api.editProveedor(proveedor)
        .then(r=>{
            dispatch(editProveedorSucces(r))
        }).catch(e=>{
            console.log(e)
        })
};

/*DELETE PROVIDER*/

export const DELETE_PROVEEDOR_SUCCESS = 'DELETE_PROVEEDOR_SUCCESS';

export function deleteProveedorSuccess(proveedorId){
    return {
        type:DELETE_PROVEEDOR_SUCCESS, proveedorId
    }
}

export const deleteProveedor=(proveedorId)=>(dispatch, getState)=>{
    return api.deleteProveedor(proveedorId)
        .then(r=>{
            dispatch(deleteProveedorSuccess(proveedorId))
        }).catch(e=>{
            console.log(e)
        })
};