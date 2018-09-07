import api from '../../../Api/Django'


export const GET_DISPOSICIONES_SUCCESS = 'GET_DISPOSICIONES_SUCCESS'

export const getDisposicionesSuccess=(items)=>{
    return {
        type:GET_DISPOSICIONES_SUCCESS, items
    }
}

export const getDisposiciones = () => (dispatch, getState)=>{
    return api.getDisposiciones()
        .then(r=>{dispatch(getDisposicionesSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const NEW_DISPOSICION_SUCCESS = 'NEW_DISPOSICION_SUCCESS'

export const newDisposicionSuccess = (item) =>{
    return {
        type:NEW_DISPOSICION_SUCCESS, item
    }
}

export const newDisposicion=(item)=>(dispatch, getState)=>{
    return api.newDisposicion(item)
        .then(r=>{
            dispatch(newDisposicionSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const EDIT_DISPOSICION_SUCCESS = 'EDIT_DISPOSICION_SUCCESS'

export const editDisposicionSucess=(item)=>{
    return {
        type:EDIT_DISPOSICION_SUCCESS, item
    }
}

export const editDisposicion=(item)=>(dispatch, getState)=>{
    return api.editDisposicion(item)
        .then(r=>{
            dispatch(editDisposicionSucess(r))
        }).catch(e=>{
            throw e
        })
}

export const DELETE_DISPOSICION_SUCCESS = 'DELETE_DISPOSICION_SUCCESS'

export const deleteDisposicionSuccess = (item)=>{
    return {
        type:DELETE_DISPOSICION_SUCCESS, item
    }
}

export const deleteDisposicion=(item)=>(dispatch, getState)=>{
    return api.deleteDisposicion(item)
        .then(r=>{
            dispatch(deleteDisposicionSuccess(r))
        })
}
