import api from "../../../Api/Django";

///GET CLIENTES SEARCH

export const GET_PRSEARCH_SUCCESS = 'GET_PRSEARCH_SUCCESS';

export function getPrSearchSuccess(proveedorS){
    return{
        type:GET_PRSEARCH_SUCCESS, proveedorS
    }
}

export const getPrSearch=(url)=>(dispatch, getState)=>{
    return api.getProveedores(url)
        .then(r=>{
            dispatch(getPrSearchSuccess(r.results));
        }).catch(e=>{
            throw e
        })
};

///end


export const GET_PROVEEDORES_SUCCESS = 'GET_PROVEEDORES_SUCCESS';

export function getProveedoresSuccess(proveedores){
    return{
        type:GET_PROVEEDORES_SUCCESS, proveedores
    }
}


export const GET_PROVEEDORES_DATA_SUCCESS = 'GET_PROVEEDORES_DATA_SUCCESS';

export function getAllDataSuccess(dataProvider){
    return{
        type:GET_PROVEEDORES_DATA_SUCCESS, dataProvider
    }
}

export const getProveedores=(url)=>(dispatch, getState)=>{
    return api.getProveedores(url)
        .then(r=>{
            dispatch(getProveedoresSuccess(r.results));
            dispatch(getAllDataSuccess(r));
            dispatch(getPrSearch());
        }).catch(e=>{
        
            throw e
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
    return api.newProveedor(proveedor)
        .then(r=>{
            dispatch(saveProveedorSuccess(r));
            dispatch(getProveedores());
        }).catch(e=>{
        throw e
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
            dispatch(deleteProveedorSuccess(proveedorId));
            dispatch(getProveedores());
        }).catch(e=>{
            
        })
};