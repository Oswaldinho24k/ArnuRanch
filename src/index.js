import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from "./redux/store/configureStore";
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import sp from 'antd/lib/locale-provider/es_ES';
import 'ant-design-pro/dist/ant-design-pro.css';

import {checkIfUser} from "./redux/actions/userActions";



export const store = configureStore();
store.dispatch(checkIfUser());


const WithRouter = () => (
    <BrowserRouter>
        <LocaleProvider locale={sp}>
            <App/>
        </LocaleProvider>
    </BrowserRouter>
);

const ReduxProvider = () => (
    <Provider store={store}>
        <WithRouter/>
    </Provider>
);



ReactDOM.render(<ReduxProvider/>, document.getElementById('root'));
unregisterServiceWorker();