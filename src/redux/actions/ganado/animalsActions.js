import api from "../../../Api/Django";



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
    return api.getAnimals(url)
        .then(r=>{

            dispatch(getAnimalsSuccess(r.results));
            dispatch(getAllDataSuccess(r));
        }).catch(e=>{
            throw e
    })
}
/*************************get a single animal********************************+*/

export const GET_SINGLE_ANIMAL_SUCCESS = 'GET_SINGLE_ANIMAL_SUCCESS';

export function getSingleAnimalSuccess(animal){
    return{
        type:GET_SINGLE_ANIMAL_SUCCESS, animal
    }
}
export const getSingleAnimal=(id)=>(dispatch, getState)=>{
    return api.getSingleAnimal(id)
        .then(r=>{
            console.log(r)
            dispatch(getSingleAnimalSuccess(r))
        }).catch(e=>{
            throw e
        })
}

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
            //let lote = getState().lotes.list.find(l=>l.id===r.lote);
            //let raza = getState().razas.list.find(ra=>ra.id===r.raza);
            //r['raza'] = raza;
           // r['lote'] = lote;
            dispatch(saveAnimalSuccess(r));
            dispatch(getAnimals());
        })
        .catch(e=>{
            throw e;
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
            // let lote = getState().lotes.list.find(l=>l.id===r.lote);
            // let raza = getState().razas.list.find(ra=>ra.id===r.raza);
            // let empresa = getState().empresas.list.find(e=>e.id===r.empresa);
            // r['raza'] = raza;
            // r['lote'] = lote;
            // r['empresa'] = empresa;
            dispatch(editAnimalSuccess(r))
        }).catch(e=>{
            throw e;
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
            dispatch(deleteAnimalSuccess(animalId));
            dispatch(getAnimals());
        }).catch(e=>{
            throw e;
        })
};
