import api from '../../../Api/Django'

export const UPDATE_RECIBO_SUCCESS = 'UPDATE_RECIBO_SUCCESS'

export const updateReciboSucess=(recibo)=>{
    return{
        type:UPDATE_RECIBO_SUCCESS,recibo
    }
}

export const updateRecibo  = (item) => (dispatch) => {
    return api.editRecibo(item)
        .then(r=>{
            dispatch(updateReciboSucess(r))
        }).catch(e=>{
            throw e
    })
}


export const DELETE_RECIBO_SUCCESS = 'DELETE_RECIBO_SUCCESS'

export const deleteReciboSucess=(recibo)=>{
    return{
        type:DELETE_RECIBO_SUCCESS,recibo
    }
}

export const deleteRecibo  = (item) => (dispatch) => {
    return api.deleteRecibo(item)
        .then(r=>{
            dispatch(deleteReciboSucess(item))
        }).catch(e=>{
            throw e
        })
}

export const CREATE_RECIBO_SUCCESS = 'CREATE_RECIBO_SUCCESS'

export const createReciboSucess=(recibo)=>{
    return{
        type:CREATE_RECIBO_SUCCESS,recibo
    }
}

export const createRecibo  = (item) => (dispatch) => {
    return api.createRecibo(item)
        .then(r=>{
            dispatch(createReciboSucess(item))
        }).catch(e=>{
            throw e
        })
}