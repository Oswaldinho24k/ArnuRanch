import api from '../../../Api/Django';

///GET Compra SEARCH

export const GET_COSEARCH_SUCCESS = 'GET_COSEARCH_SUCCESS';

export function getCoSearchSuccess(compraS){
    return{
        type:GET_COSEARCH_SUCCESS, compraS
    }
}

export const getCoSearch=(url)=>(dispatch, getState)=>{
    return api.getCompras(url)
        .then(r=>{
            dispatch(getCoSearchSuccess(r.results));
        }).catch(e=>{
            throw e
        })
};

///end
export const GET_COMPRAS_SUCCESS = 'GET_COMPRAS_SUCCESS';

export function getComprasSuccess(compras){
    return{
        type:GET_COMPRAS_SUCCESS, compras
    }
}

export const GET_COMPRAS_DATA_SUCCESS = 'GET_COMPRAS_DATA_SUCCESS';

export function getAllComprasSuccess(dataCom){
    return{
        type:GET_COMPRAS_DATA_SUCCESS, dataCom
    }
}

export const getCompras=(url)=>(dispatch, getState)=>{
    return api.getCompras(url)
        .then(r=>{
            console.log(r)
            dispatch(getComprasSuccess(r.results));
            dispatch(getAllComprasSuccess(r));
        }).catch(e=>{
            throw e
        })
};


export const NEW_COMPRA_SUCCESS = 'NEW_COMPRA_SUCCESS';

export function newCompraSuccess(compra){
    return{
        type:NEW_COMPRA_SUCCESS, compra
    }
}

export const newCompra=(compra)=>(dispatch, getState)=>{
    return api.newCompra(compra)
        .then(r=>{
            dispatch(newCompraSuccess(r));
            dispatch(getCompras());
        }).catch(e=>{
            throw e
        })
};

export const DELETE_COMPRA_SUCCESS = 'DELETE_COMPRA_SUCCESS';

export function deleteCompraSuccess(compra){
    return{
        type:DELETE_COMPRA_SUCCESS, compra
    }
}

export const deleteCompra=(compra)=>(dispatch, getState)=>{
    return api.deleteCompra(compra)
        .then(r=>{
            dispatch(deleteCompraSuccess(compra));
            dispatch(getCompras());
        }).catch(e=>{
            throw e
        })
};


export const EDIT_COMPRA_SUCCESS = 'EDIT_COMPRA_SUCCESS';
export function editCompraSucces(compra) {
    return{
        type: EDIT_COMPRA_SUCCESS, compra
    }
}

export const editCompra=(compra)=>(dispatch, getState)=>{
    return api.editCompra(compra)
        .then(r=>{
            dispatch(editCompraSucces(r));
            dispatch(getCompras());
        }).catch(e=>{
            throw e
        })
};

