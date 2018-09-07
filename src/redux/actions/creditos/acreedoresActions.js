import api from '../../../Api/Django'


export const GET_ACREEDORES_SUCCESS = 'GET_ACREEDORES_SUCCESS'

export const getAcreedoresSuccess=(items)=>{
    return {
        type:GET_ACREEDORES_SUCCESS, items
    }
}

export const getAcreedores = () => (dispatch, getState)=>{
    return api.getAcreedores()
        .then(r=>{
            dispatch(getAcreedoresSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const NEW_ACREEDOR_SUCCESS = 'NEW_ACREEDOR_SUCCESS'

export const newAcreedorSuccess = (item) =>{
    return {
        type:NEW_ACREEDOR_SUCCESS, item
    }
}

export const newAcreedor=(item)=>(dispatch, getState)=>{
    return api.newAcreedor(item)
        .then(r=>{
            dispatch(newAcreedorSuccess(r))
        }).catch(e=>{
            throw e
        })
}

export const EDIT_ACREEDOR_SUCCESS = 'EDIT_ACREEDOR_SUCCESS'

export const editAcreedorSucess=(item)=>{
    return {
        type:EDIT_ACREEDOR_SUCCESS, item
    }
}

export const editAcreedor=(item)=>(dispatch, getState)=>{
    return api.editAcreedor(item)
        .then(r=>{
            dispatch(editAcreedorSucess(r))
        }).catch(e=>{
            throw e
        })
}

export const DELETE_ACREEDOR_SUCCESS = 'DELETE_ACREEDOR_SUCCESS'

export const deleteAcreedorSuccess = (item)=>{
 return {
     type:DELETE_ACREEDOR_SUCCESS, item
 }
}

export const deleteAcreedor=(item)=>(dispatch, getState)=>{
    return api.deleteAcreedor(item)
        .then(r=>{
            dispatch(deleteAcreedorSuccess(r))
        })
}




