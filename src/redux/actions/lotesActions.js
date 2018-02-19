import api from "../../Api/Django";

export const GET_LOTES_SUCCESS = 'GET_LOTES_SUCCESS';

export function getLotesSuccess(lotes){
    return{
        type:GET_LOTES_SUCCESS, lotes
    }
}
export const GET_LOTES_DATA_SUCCESS = 'GET_LOTES_DATA_SUCCESS';

export function getAllDataSuccess(data){
    return{
        type:GET_LOTES_DATA_SUCCESS, data
    }
}

export const getLotes=(url)=>(dispatch, getState)=>{
    return api.getLotes(url)
        .then(r=>{
            dispatch(getLotesSuccess(r.results));
            dispatch(getAllDataSuccess(r));
        }).catch(e=>{
       throw e
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
    return api.newLote(batch)
        .then(r=>{
            let corral = getState().corrales.list.find(c=>c.id===r.corral);
            r['corral']=corral;
            console.log(r);
            dispatch(saveLoteSuccess(r))
        }).catch(e=>{
       throw e
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
    return api.editLote(lote)
        .then(r=>{
            dispatch(editLoteSuccess(r))
        }).catch(e=>{
           throw e
    })
};