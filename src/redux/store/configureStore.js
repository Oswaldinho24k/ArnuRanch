import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';



export default function configureStore(){
    const store = createStore(
        applyMiddleware(thunk)
    );
    return store;
}
