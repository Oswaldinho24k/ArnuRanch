import api from '../../../Api/Django';


export const GET_RAZAS_SUCCESS = 'GET_RAZAS_SUCCESS';

export function getRazasSuccess(razas){
    return{
        type:GET_RAZAS_SUCCESS, razas
    }
}

export const getRazas=()=>(dispatch, getState)=>{
    return api.getRazas()
        .then(r=>{
            dispatch(getRazasSuccess(r))
        }).catch(e=>{
            throw e
        })
};


export const NEW_RAZA_SUCCESS = 'NEW_RAZA_SUCCESS';

export function newRazaSuccess(raza){
    return{
        type:NEW_RAZA_SUCCESS, raza
    }
}

export const newRaza=(raza)=>(dispatch, getState)=>{
    return api.newRaza(raza)
        .then(r=>{
            dispatch(newRazaSuccess(r))
        }).catch(e=>{
            throw e
        })
};

export const DELETE_RAZA_SUCCESS = 'DELETE_RAZA_SUCCESS';

export function deleteRazaSuccess(raza){
    return{
        type:DELETE_RAZA_SUCCESS, raza
    }
}

export const deleteRaza=(raza)=>(dispatch, getState)=>{
    return api.deleteRaza(raza)
        .then(r=>{
            dispatch(deleteRazaSuccess(raza))
        }).catch(e=>{
            throw e
        })
};