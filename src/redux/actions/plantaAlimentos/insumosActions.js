import api from "../../../Api/Django";

/*************************get All********************************+*/
export const GET_INSUMOS_SUCCESS = 'GET_INSUMOS_SUCCESS';

export const getInsumosSuccess = insumos => ({
    type:GET_INSUMOS_SUCCESS,
    insumos
});


export const getInsumos = url => (dispatch, getState) => {
    api.getInsumos( url )
        .then( r => {
            
            dispatch(getInsumosSuccess(r.results));
        }).catch( e => {
        
    });
};

/*************************save new********************************+*/

export const SAVE_INSUMO_SUCCESS = 'SAVE_INSUMO_SUCCESS';

export const saveInsumoSuccess = insumo => ({
    type:SAVE_INSUMO_SUCCESS,
    insumo
});

export const saveInsumo = insumo => (dispatch, getState) => {
    return api.newInsumo(insumo)
        .then( r => {
            
            const provider = getState().proveedores.list.find( provider => provider.id === r.provider);
            r.provider = provider;
            dispatch(saveInsumoSuccess(r));
        })
        .catch(e=>{
            
        });
};

/*************************edit********************************+*/

export const EDIT_INSUMO_SUCCESS = 'EDIT_INSUMO_SUCCESS';

export const editInsumoSuccess = insumo => ({
    type: EDIT_INSUMO_SUCCESS,
    insumo
});

export const editInsumo = insumo => (dispatch, getState) => {
    
    return api.updateInsumo(insumo)
        .then( r => {
            const provider = getState().proveedores.list.find( provider => provider.id === r.provider);
            r.provider = provider;
            dispatch(editInsumoSuccess(r));
            
        }).catch(e=>{
            
        });
};

/*************************delete********************************+*/

export const DELETE_INSUMO_SUCCESS = 'DELETE_INSUMO_SUCCESS';

export const deleteInsumoSuccess = insumoId => ({
    type:DELETE_INSUMO_SUCCESS,
    insumoId
});

export const deleteInsumo = insumoId => (dispatch, getState) =>{
    return api.removeInsumo(insumoId)
        .then( r => {
            dispatch(deleteInsumoSuccess(insumoId));
        }).catch(e=>{
            
        });
};
