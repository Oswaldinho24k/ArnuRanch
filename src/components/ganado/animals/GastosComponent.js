import React, {Fragment} from 'react';
import {Table, Button} from 'antd';
import moment from 'moment';




const columns = [{
    title: 'Tipo',
    dataIndex: 'tipo',
}, {
    title: 'Costo',
    dataIndex: 'costo',
    render:val=><p>${val}</p>
},{
    title: 'Fecha',
    dataIndex: 'created',
    render:val=><p>{moment(val).format('LL')}</p>
}];

const GastosComponent = ({animal, rowSelection, showModal}) => {
    return (
        <Fragment>
            <Table rowSelection={rowSelection} columns={columns} dataSource={animal.aliments} pagination={false} rowKey={record => record.id} />
            <Button onClick={showModal}>Agregar Gasto</Button>
        </Fragment>
    )
};

export default GastosComponent;