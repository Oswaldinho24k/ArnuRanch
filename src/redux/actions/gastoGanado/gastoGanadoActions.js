import api from '../../../Api/Django';

///GET GASTO_GANADO SEARCH

export const GET_GGSEARCH_SUCCESS = 'GET_GGSEARCH_SUCCESS';

export function getGgSearchSuccess(gastoS){
    return{
        type:GET_GGSEARCH_SUCCESS, gastoS
    }
}

export const getGgSearch=(url)=>(dispatch, getState)=>{
    return api.getGastoGanado(url)
        .then(r=>{
            dispatch(getGgSearchSuccess(r.results));
        }).catch(e=>{
            throw e
        })
};

///end
export const GET_GASTOS_SUCCESS = 'GET_GASTOS_SUCCESS';

export function getGastosSuccess(gastos){
    return{
        type:GET_GASTOS_SUCCESS, gastos
    }
}

export const GET_GASTOS_DATA_SUCCESS = 'GET_GASTOS_DATA_SUCCESS';

export function getAllGastosSuccess(dataGastos){
    return{
        type:GET_GASTOS_DATA_SUCCESS, dataGastos
    }
}

export const getGastos=(url)=>(dispatch, getState)=>{
    return api.getGastoGanado(url)
        .then(r=>{
            
            dispatch(getGastosSuccess(r.results));
            dispatch(getAllGastosSuccess(r));
        }).catch(e=>{
            throw e
        })
};


export const NEW_GASTO_SUCCESS = 'NEW_GASTO_SUCCESS';

export function newGastoSuccess(gasto){
    return{
        type:NEW_GASTO_SUCCESS, gasto
    }
}

export const newGasto=(gasto)=>(dispatch, getState)=>{
    return api.newGastoGanado(gasto)
        .then(r=>{
            dispatch(newGastoSuccess(r));
            dispatch(getGastos());
        }).catch(e=>{
            throw e
        })
};

export const DELETE_GASTO_SUCCESS = 'DELETE_GASTO_SUCCESS';

export function deleteGastoSuccess(gasto){
    return{
        type:DELETE_GASTO_SUCCESS, gasto
    }
}

export const deleteGasto=(gasto)=>(dispatch, getState)=>{
    return api.deleteGastoGanado(gasto)
        .then(r=>{
            dispatch(deleteGastoSuccess(gasto));
            dispatch(getGastos());
        }).catch(e=>{
            throw e
        })
};


export const EDIT_GASTO_SUCCESS = 'EDIT_GASTO_SUCCESS';
export function editGastoSucces(gasto) {
    return{
        type: EDIT_GASTO_SUCCESS, gasto
    }
}

export const editGasto=(gasto)=>(dispatch, getState)=>{
    return api.editGastoGanado(gasto)
        .then(r=>{
            dispatch(editGastoSucces(r));
            dispatch(getGastos());
        }).catch(e=>{
            throw e
        })
};