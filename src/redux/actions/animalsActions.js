import api from "../../Api/Django";





/*************************get All********************************+*/
export const GET_ANIMALS_SUCCESS = 'GET_ANIMALS_SUCCESS';

export function getAnimalsSuccess(animals){
    return{
        type:GET_ANIMALS_SUCCESS, animals
    }
}

export const GET_ANIMALS_DATA_SUCCESS = 'GET_ANIMALS_DATA_SUCCESS';

export function getAllDataSuccess(data){
    return{
        type:GET_ANIMALS_DATA_SUCCESS, data
    }
}

export const getAnimals=(url)=>(dispatch, getState)=>{
    api.getAnimals(url)
        .then(r=>{
            //console.log(r.results)
            dispatch(getAnimalsSuccess(r.results));
            dispatch(getAllDataSuccess(r));
        }).catch(e=>{
            console.log(e)
    })
};

/*************************save new********************************+*/

export const SAVE_ANIMAL_SUCCESS = 'SAVE_ANIMAL_SUCCESS';

export function saveAnimalSuccess(animal){
    return{
        type:SAVE_ANIMAL_SUCCESS, animal
    }
}

export const saveAnimal=(animal)=>(dispatch, getState)=>{
    return api.newAnimal(animal)
        .then(r=>{

            let lote = getState().lotes.list.find(l=>l.id===r.lote);
            r['lote'] = lote;
            console.log(r);
            dispatch(saveAnimalSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};

/*************************edit********************************+*/

export const EDIT_ANIMAL_SUCCESS = 'EDIT_ANIMAL_SUCCESS';

export function editAnimalSuccess(animal){
    return{
        type: EDIT_ANIMAL_SUCCESS, animal
    }
}

export const editAnimal=(animal)=>(dispatch, getState)=>{
    return api.editAnimal(animal)
        .then(r=>{
            let lote = getState().lotes.list.find(l=>l.id===r.lote);
            r['lote'] = lote;
            dispatch(editAnimalSuccess(r));
            console.log(r)
        }).catch(e=>{
            console.log(e)
    })
};

/*************************delete********************************+*/

export const DELETE_ANIMAL_SUCCESS = 'DELETE_ANIMAL_SUCCESS';

export function deleteAnimalSuccess(animalId){
    return {
        type:DELETE_ANIMAL_SUCCESS, animalId
    }
}

export const deleteAnimal=(animalId)=>(dispatch, getState)=>{
    return api.deleteAnimal(animalId)
        .then(r=>{
            dispatch(deleteAnimalSuccess(animalId))
        }).catch(e=>{
            console.log(e)
        })
};
