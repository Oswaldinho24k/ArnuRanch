import React from 'react';
import {Spin} from 'antd';

const MainLoader = ({props}) => {
    return (
        <div className="main-loader">
            <Spin size="large"/>
        </div>
    )
};

export default MainLoader;