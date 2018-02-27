import api from "../../Api/Django";

export const GET_VACUNAS_SUCCESS = 'GET_VACUNAS_SUCCESS';

export function getVacunasSuccess(vacunas){
    return{
        type:GET_VACUNAS_SUCCESS, vacunas
    }
}

export const getVacunas=()=>(dispatch, getState)=>{
    return api.getVacunas()
        .then(r=>{
            dispatch(getVacunasSuccess(r))
        }).catch(e=>{
            console.log(e)
        })
};


/*FORM VACUNAS SAVE*/

export const SAVE_VACUNA_SUCCESS = 'SAVE_VACUNA_SUCCESS';

export function saveVacunaSuccess(vacuna){
    return{
        type:SAVE_VACUNA_SUCCESS, vacuna
    }
}

export const saveVacuna=(vacuna)=>(dispatch, getState)=>{
    return api.newVacuna(vacuna)
        .then(r=>{
            console.log(r);
            dispatch(saveVacunaSuccess(r));
        }).catch(e=>{
            console.log(e)
            throw e
        })
};

/*EDIT VACUNA*/

export const EDIT_VACUNA_SUCCESS = 'EDIT_VACUNA_SUCCESS';
export function editVacunaSucces(vacuna) {
    return{
        type: EDIT_VACUNA_SUCCESS, vacuna
    }
}

export const editVacuna=(vacuna)=>(dispatch, getState)=>{
    return api.editVacuna(vacuna)
        .then(r=>{
            dispatch(editVacunaSucces(r))
        }).catch(e=>{
            console.log(e)
        })
};

/*DELETE VACUNA*/

export const DELETE_VACUNA_SUCCESS = 'DELETE_VACUNA_SUCCESS';

export function deleteVacunaSuccess(vacunaId){
    return {
        type:DELETE_VACUNA_SUCCESS, vacunaId
    }
}

export const deleteVacuna=(vacunaId)=>(dispatch, getState)=>{
    return api.deleteVacuna(vacunaId)
        .then(r=>{
            dispatch(deleteVacunaSuccess(vacunaId))
        }).catch(e=>{
            console.log(e)
        })
};