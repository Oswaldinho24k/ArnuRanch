import api from '../../../Api/Django'

export const GET_FIERROSN_SUCCESS = 'GET_FIERROSN_SUCCESS'

export function getFierrosNSuccess(fierros){
    return{
        type:GET_FIERROSN_SUCCESS, fierros
    }
}

export const getFierrosN=()=>(dispatch, getState)=>{
    return api.getFierrosN()
        .then(r=>{
            dispatch(getFierrosNSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const NEW_FIERRON_SUCCESS = 'NEW_FIERRON_SUCCESS'

export function newFierroNSuccess(fierro){
    return {
        type:NEW_FIERRON_SUCCESS, fierro
    }
}
export const newFierroN=(object)=>(dispatch, getState)=>{
    return api.newFierrosN(object)
        .then(r=>{
            dispatch(newFierroNSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const EDIT_FIERRON_SUCCESS = 'EDIT_FIERRON_SUCCESS'

export function editFierroNSuccess(fierro){
    return {
        type:EDIT_FIERRON_SUCCESS, fierro
    }
}
export const editFierroN=(object)=>(dispatch, getState)=>{
    return api.editFierroN(object)
        .then(r=>{
            dispatch(editFierroNSuccess(r))
        }).catch(e=>{
            throw e
        })
}

