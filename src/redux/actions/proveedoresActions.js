import api from "../../Api/Django";

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