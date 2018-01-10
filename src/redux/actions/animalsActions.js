import api from "../../Api/Django";

export const GET_ANIMALS_SUCCESS = 'GET_ANIMALS_SUCCESS';

export function getAnimalsSuccess(animals){
    return{
        type:GET_ANIMALS_SUCCESS, animals
    }
}

export const getAnimals=()=>(dispatch, getState)=>{
    api.getAnimals()
        .then(r=>{
            console.log(r.results)
        }).catch(e=>{
            console.log(e)
    })
};