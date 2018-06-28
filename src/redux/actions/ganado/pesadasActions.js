import api from "../../../Api/Django";



export const SAVE_PESADA_SUCCESS = 'SAVE_PESADA_SUCCESS';

export function savePesadaSuccess(pesada){
    return{
        type:SAVE_PESADA_SUCCESS, pesada
    }
}

export const savePesada=(pesada)=>(dispatch, getState)=>{
    return api.newPesada(pesada)
        .then(r=>{
            
            dispatch(savePesadaSuccess(r))
        }).catch(e=>{
            
        })
};


export const GET_PESADAS_SUCCESS = 'GET_PESADAS_SUCCESS';

export function getPesadasSuccess(pesadas){
    return{
        type:GET_PESADAS_SUCCESS, pesadas
    }
}

export const getPesadas=()=>(dispatch, getState)=>{
  return api.getPesadas()
      .then(r=>{
          dispatch(getPesadasSuccess(r))
      }).catch(e=>{
          
      })
};