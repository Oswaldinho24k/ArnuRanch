import api from "../../../Api/Django";

/*************************get All********************************+*/
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';

export const getItemsSuccess = items => ({
    type:GET_ITEMS_SUCCESS,
    items
});


export const getItems = url => (dispatch, getState) => {
    api.getItems( url )
        .then( r => {
            dispatch(getItemsSuccess(r));
        }).catch( e => {
        
    });
};

/*************************save new********************************+*/

export const SAVE_ITEM_SUCCESS = 'SAVE_ITEM_SUCCESS';

export const saveItemSuccess = item => ({
    type:SAVE_ITEM_SUCCESS,
    item
});

export const saveItem = item => (dispatch, getState) => {
    return api.newItem(item)
        .then( r => {
            
            const provider = getState().proveedores.list.find( provider => provider.id === r.provider);
            r.provider = provider;
            dispatch(saveItemSuccess(r));
            return r;
        })
        .catch(e=>{
            
        });
};

/*************************edit********************************+*/

export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';

export const editItemSuccess = item => ({
    type: EDIT_ITEM_SUCCESS,
    item
});

export const editItem = item => (dispatch, getState) => {
    
    return api.updateItem(item)
        .then( r => {
            const provider = getState().proveedores.list.find( provider => provider.id === r.provider);
            r.provider = provider;
            dispatch(editItemSuccess(r));
            
        }).catch(e=>{
            
        });
};

/*************************delete********************************+*/

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';

export const deleteItemSuccess = itemId => ({
    type:DELETE_ITEM_SUCCESS,
    itemId
});

export const deleteItem = itemId => (dispatch, getState) =>{
    return api.removeItem(itemId)
        .then( r => {
            dispatch(deleteItemSuccess(itemId));
            return r;
        })
        .catch(e=>{
            return e;
        });
};
