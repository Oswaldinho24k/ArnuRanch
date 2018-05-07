import api from "../../Api/Django";

export const GET_EMPRESAS_SUCCESS = 'GET_EMPRESAS_SUCCESS';

export function getEmpresasSuccess(empresas){
    return{
        type:GET_EMPRESAS_SUCCESS, empresas
    }
}

export const GET_EMPRESAS_DATA_SUCCESS = 'GET_EMPRESAS_DATA_SUCCESS';

export function getAllEmpresasSuccess(dataEmpresa){
    return{
        type:GET_EMPRESAS_DATA_SUCCESS, dataEmpresa
    }
}

export const getEmpresas=(url)=>(dispatch, getState)=>{
    return api.getEmpresas(url)
        .then(r=>{
            dispatch(getEmpresasSuccess(r.results));
            dispatch(getAllEmpresasSuccess(r));
        }).catch(e=>{
            console.log(e)
        })
};


/*FORM EMPRESA SAVE*/

export const SAVE_EMPRESA_SUCCESS = 'SAVE_EMPRESA_SUCCESS';

export function saveEmpresaSuccess(empresa){
    return{
        type:SAVE_EMPRESA_SUCCESS, empresa
    }
}

export const saveEmpresa=(empresa)=>(dispatch, getState)=>{
    return api.newEmpresa(empresa)
        .then(r=>{
            console.log(r);
            dispatch(saveEmpresaSuccess(r));
        }).catch(e=>{
            console.log(e)
            throw e
        })
};

/*EDIT EMPRESA*/

export const EDIT_EMPRESA_SUCCESS = 'EDIT_EMPRESA_SUCCESS';
export function editEmpresaSucces(empresa) {
    return{
        type: EDIT_EMPRESA_SUCCESS, empresa
    }
}

export const editEmpresa=(empresa)=>(dispatch, getState)=>{
    return api.editEmpresa(empresa)
        .then(r=>{
            dispatch(editEmpresaSucces(r))
            console.log(r);
        }).catch(e=>{
            console.log(e)
        })
};

/*DELETE EMPRESA*/

export const DELETE_EMPRESA_SUCCESS = 'DELETE_EMPRESA_SUCCESS';

export function deleteEmpresaSuccess(empresaId){
    return {
        type:DELETE_EMPRESA_SUCCESS, empresaId
    }
}

export const deleteEmpresa=(empresaId)=>(dispatch, getState)=>{
    return api.deleteEmpresa(empresaId)
        .then(r=>{
            dispatch(deleteEmpresaSuccess(empresaId))
        }).catch(e=>{
            console.log(e)
        })
};