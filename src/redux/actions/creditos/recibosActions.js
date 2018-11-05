import api from '../../../Api/Django'

//get recibos
export const GET_RECIBOS_SUCCESS = 'GET_RECIBOS_SUCCESS'

export const getRecibosSuccess=(recibos)=>{
    return {
        type:GET_RECIBOS_SUCCESS, recibos
    }
}

export const getRecibos=()=>(dispatch)=>{
    return api.getRecibos()
        .then(r=>{
            dispatch(getRecibosSuccess(r))
        }).catch(e=>{throw e})
}
//update recibos
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

//delete recibo
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
//create recibo
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