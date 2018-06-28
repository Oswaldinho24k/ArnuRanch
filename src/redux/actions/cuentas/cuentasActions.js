import api from '../../../Api/Django';

///GET CUENTA SEARCH

export const GET_CUSEARCH_SUCCESS = 'GET_CUSEARCH_SUCCESS';

export function getCuSearchSuccess(cuentaS){
    return{
        type:GET_CUSEARCH_SUCCESS, cuentaS
    }
}

export const getCuSearch=(url)=>(dispatch, getState)=>{
    return api.getCuentas(url)
        .then(r=>{
            dispatch(getCuSearchSuccess(r.results));
        }).catch(e=>{
            throw e
        })
};

///end
export const GET_CUENTAS_SUCCESS = 'GET_CUENTAS_SUCCESS';

export function getCuentasSuccess(cuentas){
    return{
        type:GET_CUENTAS_SUCCESS, cuentas
    }
}

export const GET_CUENTAS_DATA_SUCCESS = 'GET_CUENTAS_DATA_SUCCESS';

export function getAllCuentasSuccess(dataCue){
    return{
        type:GET_CUENTAS_DATA_SUCCESS, dataCue
    }
}

export const getCuentas=(url)=>(dispatch, getState)=>{
    return api.getCuentas(url)
        .then(r=>{
            
            dispatch(getCuentasSuccess(r.results));
            dispatch(getAllCuentasSuccess(r));
            dispatch(getCuSearch());
        }).catch(e=>{
            throw e
        })
};


export const NEW_CUENTA_SUCCESS = 'NEW_CUENTA_SUCCESS';

export function newCuentaSuccess(cuenta){
    return{
        type:NEW_CUENTA_SUCCESS, cuenta
    }
}

export const newCuenta=(cuenta)=>(dispatch, getState)=>{
    return api.newCuenta(cuenta)
        .then(r=>{
            dispatch(newCuentaSuccess(r));
            dispatch(getCuentas());
        }).catch(e=>{
            throw e
        })
};

export const DELETE_CUENTA_SUCCESS = 'DELETE_CUENTA_SUCCESS';

export function deleteCuentaSuccess(cuenta){
    return{
        type:DELETE_CUENTA_SUCCESS, cuenta
    }
}

export const deleteCuenta=(cuenta)=>(dispatch, getState)=>{
    return api.deleteCuenta(cuenta)
        .then(r=>{
            dispatch(deleteCuentaSuccess(cuenta));
            dispatch(getCuentas());
        }).catch(e=>{
            throw e
        })
};


export const EDIT_CUENTA_SUCCESS = 'EDIT_CUENTA_SUCCESS';
export function editCuentaSucces(cuenta) {
    return{
        type: EDIT_CUENTA_SUCCESS, cuenta
    }
}

export const editCuenta=(cuenta)=>(dispatch, getState)=>{
    return api.editCuenta(cuenta)
        .then(r=>{
            dispatch(editCuentaSucces(r));
            dispatch(getCuentas());
        }).catch(e=>{
            throw e
        })
};

