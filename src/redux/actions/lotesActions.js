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