import api from "../../../Api/Django";



export const SAVE_ANIMAL_GASTO_SUCCESS = 'SAVE_ANIMAL_GASTO_SUCCESS';

export function saveAnimalGastoSuccess(gasto){
    return{
        type:SAVE_ANIMAL_GASTO_SUCCESS, gasto
    }
}

export const saveAnimalGasto=(gasto)=>(dispatch, getState)=>{
    return api.newGasto(gasto)
        .then(r=>{
            dispatch(saveAnimalGastoSuccess(r))
        }).catch(e=>{
        throw e
    })
};


export const GET_ANIMAL_GASTOS_SUCCESS = 'GET_ANIMAL_GASTOS_SUCCESS'
export function getAnimalGastosSuccess(gastos){
    return{
        type:GET_ANIMAL_GASTOS_SUCCESS, gastos
    }
}

export const GET_ANIMAL_GASTOS_DATA = 'GET_ANIMAL_GASTOS_DATA'
export function getAnimalGastosData(data){
    return{
        type:GET_ANIMAL_GASTOS_DATA, data
    }
}


export const getAnimalGastos=(url)=>(dispatch, getState)=>{
    return api.getGastos(url)
        .then(r=>{
            dispatch(getAnimalGastosSuccess(r.results))
            dispatch(getAnimalGastosData(r))
        }).catch(e=>{
            throw e
        })
}