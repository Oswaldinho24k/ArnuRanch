import api from '../../../Api/Django'

export const GET_FIERROSO_SUCCESS = 'GET_FIERROSO_SUCCESS'

export function getFierrosOSuccess(fierros){
    return{
        type:GET_FIERROSO_SUCCESS, fierros
    }
}

export const getFierrosO=()=>(dispatch, getState)=>{
    return api.getFierrosO()
        .then(r=>{
            dispatch(getFierrosOSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const NEW_FIERROO_SUCCESS = 'NEW_FIERROO_SUCCESS'

export function newFierroOSuccess(fierro){
    return {
        type:NEW_FIERROO_SUCCESS, fierro
    }
}
export const newFierroO=(object)=>(dispatch, getState)=>{
    return api.newFierrosO(object)
        .then(r=>{
            dispatch(newFierroOSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const EDIT_FIERROO_SUCCESS = 'EDIT_FIERROO_SUCCESS'

export function editFierroOSuccess(fierro){
    return {
        type:EDIT_FIERROO_SUCCESS, fierro
    }
}
export const editFierroO=(object)=>(dispatch, getState)=>{
    return api.editFierroO(object)
        .then(r=>{
            dispatch(editFierroOSuccess(r))
        }).catch(e=>{
            throw e
        })
}

