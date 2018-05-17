import api from "../../../../Api/Django";

export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';

export function getOrdersSuccess(orders){
    return{
        type: GET_ORDERS_SUCCESS, orders
    }
}

export const getOrders=(url)=>(dispatch, getState)=>{
    return api.getOrders(url)
        .then(r=>{
            dispatch(getOrdersSuccess(r));
        }).catch(e=>{
            throw e
    })
}

export const SAVE_ORDER_SUCCESS = 'SAVE_ORDER_SUCCESS'

export function saveOrderSuccess(order){
    return {type: SAVE_ORDER_SUCCESS, order}
}

export const saveOrder=(order)=>(dispatch, getState)=>{
    return api.saveOrder(order)
        .then(r=>{
            dispatch(saveOrderSuccess(r))
        }).catch(e=>{
            throw e
        })
}

//uptade and delete actions missing