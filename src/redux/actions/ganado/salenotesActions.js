import api from '../../../Api/Django';




export const GET_SALENOTES_SUCCESS = 'GET_SALENOTES_SUCCESS';

export function getSaleNotesSuccess(saleNotes){
    return{
        type:GET_SALENOTES_SUCCESS, saleNotes
    }
}

export const GET_SALENOTES_DATA_SUCCESS = 'GET_SALENOTES_DATA_SUCCESS';

export function getAllDataSuccess(data){
    return{
        type:GET_SALENOTES_DATA_SUCCESS, data
    }
}

export const getSaleNotes=()=>(dispatch, getState)=>{
    return api.getSaleNotes()
        .then(r=>{
            dispatch(getSaleNotesSuccess(r.results))
            dispatch(getAllDataSuccess(r))
        }).catch(e=>{
            throw e
        })
}
/*saving new saleNote*/ 

export const NEW_SALENOTE_SUCCESS = 'NEW_SALENOTE_SUCCESS';

export function newSaleNoteSuccess(saleNote){
    return{
        type: NEW_SALENOTE_SUCCESS, saleNote
    }
}

export const newSaleNote=(sn)=>(dispatch, getState)=>{
    return api.newSaleNote(sn)
        .then(r=>{
            dispatch(newSaleNoteSuccess(r))
        }).catch(e=>{
            throw e
        })
}
//EDITING saleNote
export const  EDIT_SALENOTE_SUCCESS = 'EDIT_SALENOTE_SUCCESS';

export function editSaleNoteSuccess(saleNote){
    return {
        type:EDIT_SALENOTE_SUCCESS, saleNote
    }
}
export const editSaleNote=(sn)=>(dispatch, getState)=>{
    return api.editSaleNote(sn)
        .then(r=>{
            dispatch(editSaleNoteSuccess(r))            
        }).catch(e=>{
            throw e
        })
}
//deleting saleNoteDELETE_SALENOTE_SUCCESS
export const  DELETE_SALENOTE_SUCCESS = 'DELETE_SALENOTE_SUCCESS';

export function deleteSaleNoteSuccess(saleNote){
    return {
        type:DELETE_SALENOTE_SUCCESS, saleNote
    }
}
export const deleteSaleNote=(snId)=>(dispatch, getState)=>{
    return api.deleteSaleNote(snId)
        .then(r=>{
            dispatch(deleteSaleNoteSuccess(snId))            
        }).catch(e=>{
            throw e
        })
}