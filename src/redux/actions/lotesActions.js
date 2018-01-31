import api from "../../Api/Django";

export const GET_LOTES_SUCCESS = 'GET_LOTES_SUCCESS';

export function getLotesSuccess(lotes){
    return{
        type:GET_LOTES_SUCCESS, lotes
    }
}

export const getLotes=()=>(dispatch, getState)=>{
    api.getLotes()
        .then(r=>{
            dispatch(getLotesSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};

/*FORM LOTE SAVE*/

export const SAVE_LOTE_SUCCESS = 'SAVE_LOTE_SUCCESS';

export function saveLoteSuccess(batch){
    return{
        type:SAVE_LOTE_SUCCESS, batch
    }
}

export const saveLote=(batch)=>(dispatch, getState)=>{
    api.newLote(batch)
        .then(r=>{
            console.log(r);
            dispatch(saveLoteSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};

//editLote
export const EDIT_LOTE_SUCCESS = 'EDIT_LOTE_SUCCESS';

export function editLoteSuccess(lote){
    return{
        type: EDIT_LOTE_SUCCESS,lote
    }
}

export const editLote=(lote)=>(dispatch, getState)=>{
    api.editLote(lote)
        .then(r=>{
            dispatch(editLoteSuccess(r))
        }).catch(e=>{
            console.log(e)
    })
};