import api from '../../../Api/Django';

///GET Factura SEARCH

export const GET_FASEARCH_SUCCESS = 'GET_FASEARCH_SUCCESS';

export function getFaSearchSuccess(facturasS){
    return{
        type:GET_FASEARCH_SUCCESS, facturasS
    }
}

export const getFaSearch=(url)=>(dispatch, getState)=>{
    return api.getFacturas(url)
        .then(r=>{
            dispatch(getFaSearchSuccess(r.results));
        }).catch(e=>{
            throw e
        })
};

///end
export const GET_FACTURAS_SUCCESS = 'GET_FACTURAS_SUCCESS';

export function getFacturasSuccess(facturas){
    return{
        type:GET_FACTURAS_SUCCESS, facturas
    }
}

export const GET_FACTURAS_DATA_SUCCESS = 'GET_FACTURAS_DATA_SUCCESS';

export function getAllFacturasSuccess(dataFac){
    return{
        type:GET_FACTURAS_DATA_SUCCESS, dataFac
    }
}

export const getFacturas=(url)=>(dispatch, getState)=>{
    return api.getFacturas(url)
        .then(r=>{
            console.log(r)
            dispatch(getFacturasSuccess(r.results));
            dispatch(getAllFacturasSuccess(r));
        }).catch(e=>{
            throw e
        })
};


export const NEW_FACTURA_SUCCESS = 'NEW_FACTURA_SUCCESS';

export function newFacturaSuccess(factura){
    return{
        type:NEW_FACTURA_SUCCESS, factura
    }
}

export const newFactura=(factura)=>(dispatch, getState)=>{
    return api.newFactura(factura)
        .then(r=>{
            dispatch(newFacturaSuccess(r));
            dispatch(getFacturas());
            dispatch(getFaSearch());
        }).catch(e=>{
            throw e
        })
};

export const DELETE_FACTURA_SUCCESS = 'DELETE_FACTURA_SUCCESS';

export function deleteFacturaSuccess(factura){
    return{
        type:DELETE_FACTURA_SUCCESS, factura
    }
}

export const deleteFactura=(factura)=>(dispatch, getState)=>{
    return api.deleteFactura(factura)
        .then(r=>{
            dispatch(deleteFacturaSuccess(factura));
            dispatch(getFacturas());
        }).catch(e=>{
            throw e
        })
};


export const EDIT_FACTURA_SUCCESS = 'EDIT_FACTURA_SUCCESS';
export function editFacturaSucces(factura) {
    return{
        type: EDIT_FACTURA_SUCCESS, factura
    }
}

export const editFactura=(factura)=>(dispatch, getState)=>{
    return api.editFactura(factura)
        .then(r=>{
            dispatch(editFacturaSucces(r));
            dispatch(getFacturas());
        }).catch(e=>{
            throw e
        })
};

