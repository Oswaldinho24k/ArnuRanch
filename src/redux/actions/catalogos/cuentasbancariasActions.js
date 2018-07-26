import api from "../../../Api/Django";

export const GET_CUENTASBAN_SUCCESS = 'GET_CUENTASBAN_SUCCESS';

export function getCuentasBSuccess(cuentasB){
    return{
        type:GET_CUENTASBAN_SUCCESS, cuentasB
    }
}

export const getCatBanks=()=>(dispatch, getState)=>{
    return api.getCatBanks()
        .then(r=>{
            dispatch(getCuentasBSuccess(r))
        }).catch(e=>{

        })
};



//save
export const SAVE_CUENTASBAN_SUCCESS = 'SAVE_CUENTASBAN_SUCCESS';

export function saveCuentasBSuccess(cuentasB){
    return{
        type:SAVE_CUENTASBAN_SUCCESS, cuentasB
    }
}

export const newCatBank=(cuentasB)=>(dispatch, getState)=>{
    return api.newCatBank(cuentasB)
        .then(r=>{

            dispatch(saveCuentasBSuccess(r));
        }).catch(e=>{

            throw e
        })
};

//EDIT

export const EDIT_CUENTASBAN_SUCCESS = 'EDIT_CUENTASBAN_SUCCESS';
export function editCuentasBSuccess(cuentasB) {
    return{
        type: EDIT_CUENTASBAN_SUCCESS, cuentasB
    }
}

export const editCatBank=(cuentasB)=>(dispatch, getState)=>{
    return api.editCatBank(cuentasB)
        .then(r=>{
            dispatch(editCuentasBSuccess(r))

        }).catch(e=>{

        })
};



//Delete

export const DELETE_CUENTASBAN_SUCCESS = 'DELETE_CUENTASBAN_SUCCESS';

export function deleteCuentasBSuccess(cuentasB){
    return {
        type:DELETE_CUENTASBAN_SUCCESS, cuentasB
    }
}

export const deleteCatBank=(cuentasB)=>(dispatch, getState)=>{
    return api.deleteCatBank(cuentasB.id)
        .then(r=>{
            dispatch(deleteCuentasBSuccess(cuentasB))
        }).catch(e=>{
            throw e;
        })
};

