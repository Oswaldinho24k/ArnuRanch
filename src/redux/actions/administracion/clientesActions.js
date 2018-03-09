import api from "../../../Api/Django";

export const GET_CLIENTES_SUCCESS = 'GET_CLIENTES_SUCCESS';

export function getClientesSuccess(clientes){
    return{
        type:GET_CLIENTES_SUCCESS, clientes
    }
}

export const getClientes=()=>(dispatch, getState)=>{
    return api.getClientes()
        .then(r=>{
            dispatch(getClientesSuccess(r))
        }).catch(e=>{
            throw e
    })
};


/*FORM CLIENTE SAVE*/

export const SAVE_CLIENTE_SUCCESS = 'SAVE_CLIENTE_SUCCESS';

export function saveClienteSuccess(cliente){
    return{
        type:SAVE_CLIENTE_SUCCESS, cliente
    }
}

export const saveCliente=(cliente)=>(dispatch, getState)=>{
    return api.newCliente(cliente)
        .then(r=>{
            dispatch(saveClienteSuccess(r));
        }).catch(e=>{


        console.log(e)

            throw e
    })
};

/*EDIT CLIENTE*/

export const EDIT_CLIENTE_SUCCESS = 'EDIT_CLIENTE_SUCCESS';
export function editClienteSucces(cliente) {
    return{
        type: EDIT_CLIENTE_SUCCESS, cliente
    }
}

export const editCliente=(cliente)=>(dispatch, getState)=>{
    return api.editCliente(cliente)
        .then(r=>{
            dispatch(editClienteSucces(r))
        }).catch(e=>{
            throw e
        })
};

/*DELETE CLIENTE*/

export const DELETE_CLIENTE_SUCCESS = 'DELETE_CLIENTE_SUCCESS';

export function deleteClienteSuccess(clienteId){
    return {
        type:DELETE_CLIENTE_SUCCESS, clienteId
    }
}

export const deleteCliente=(clienteId)=>(dispatch, getState)=>{
    return api.deleteCliente(clienteId)
        .then(r=>{
            dispatch(deleteClienteSuccess(clienteId))
        }).catch(e=>{
            throw e
        })
};