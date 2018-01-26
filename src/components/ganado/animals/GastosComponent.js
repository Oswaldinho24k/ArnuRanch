import React, {Fragment} from 'react';
import {Table, Button} from 'antd';





const columns = [{
    title: 'Tipo',
    dataIndex: 'tipo',
}, {
    title: 'Costo',
    dataIndex: 'costo',
    render:val=><p>${val}</p>
},];

const GastosComponent = ({animal, rowSelection, showModal}) => {
    return (
        <Fragment>
            <Table rowSelection={rowSelection} columns={columns} dataSource={animal.aliments} pagination={false} rowKey={record => record.id} />
            <Button onClick={showModal}>Agregar Gasto</Button>
        </Fragment>
    )
};

export default GastosComponent;