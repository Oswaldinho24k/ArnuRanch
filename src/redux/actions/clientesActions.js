import api from "../../Api/Django";

export const GET_CLIENTES_SUCCESS = 'GET_CLIENTES_SUCCESS';

export function getClientesSuccess(clientes){
    return{
        type:GET_CLIENTES_SUCCESS, clientes
    }
}

export const getClientes=()=>(dispatch, getState)=>{
    api.getClientes()
        .then(r=>{
            dispatch(getClientesSuccess(r))
        }).catch(e=>{
        console.log(e)
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
    api.newCliente(cliente)
        .then(r=>{
            console.log(r);
            dispatch(saveClienteSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};