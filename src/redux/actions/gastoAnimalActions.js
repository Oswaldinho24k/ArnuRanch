import api from "../../Api/Django";



export const SAVE_ANIMAL_GASTO_SUCCESS = 'SAVE_ANIMAL_GASTO_SUCCESS';

export function saveAnimalGastoSuccess(gasto){
    return{
        type:SAVE_ANIMAL_GASTO_SUCCESS, gasto
    }
}

export const saveAnimalGasto=(gasto)=>(dispatch, getState)=>{
    return api.newGasto(gasto)
        .then(r=>{
            console.log(r);
            dispatch(saveAnimalGastoSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};