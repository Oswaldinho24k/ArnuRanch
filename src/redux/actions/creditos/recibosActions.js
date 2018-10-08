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
            dispatch(updateReciboSucess(r.data))
        }).catch(e=>{
            throw e
    })
}