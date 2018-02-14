import api from "../../Api/Django";
import {getAnimals} from "./animalsActions";
import {getLotes} from "./lotesActions";
import {getCorrales} from './corralesActions';
import {getProveedores} from "./proveedoresActions";
import {getClientes} from "./clientesActions";
import {getPesadas} from "./pesadasActions";
import {getIngresos} from "./ingresosActions";

import {getFormulas} from "./plantaAlimentos/formulasActions";
import {getInsumos} from "./plantaAlimentos/insumosActions";

import {getEgresos} from "./egresosActions";


export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export function logInSuccess(user){
    return{
        type:LOG_IN_SUCCESS, user
    }
}


export const logIn=(data)=>(dispatch, getState)=>{
    return api.logIn(data)
        .then(r=>{
            localStorage.setItem('userRanchoToken', JSON.stringify(r.token));
        }).catch(e=>{
        throw e
    })

};

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export function getUserSuccess(user){
    return{
        type:GET_USER_SUCCESS, user
    }
}

export const getUser=()=>(dispatch, getState)=>{
    return api.getUser()
        .then(r=>{
            dispatch(getUserSuccess(r))
        }).catch(e=>{
            throw e
        })
};

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

export function logOutSuccess(){
    return{
        type:LOG_OUT_SUCCESS
    }
}

export const logOut=()=>(dispatch)=>{
    localStorage.removeItem('userRanchoToken');
    dispatch(logOutSuccess())
};

export const checkIfUser=()=>(dispatch, getState)=>{
    console.log(getState());
    const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
    if(userToken){
        //dispatch the functions
        dispatch(getUser());
        dispatch(getAnimals());
        dispatch(getLotes());
        dispatch(getCorrales());
        dispatch(getProveedores());
        dispatch(getClientes());
        dispatch(getPesadas());
        dispatch(getIngresos());

        dispatch(getFormulas());
        dispatch(getInsumos());

        dispatch(getEgresos());

    }
};

