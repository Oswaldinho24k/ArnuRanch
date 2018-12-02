import React, {Fragment} from 'react';
import {Table, Button} from 'antd';
import moment from 'moment';
import 'moment/locale/es';



const columns = [{
    title: 'Fecha',
    dataIndex: 'created',
    render:val=><p>{moment(val).format('LL')}</p>
}, {
    title: 'Peso',
        dataIndex: 'peso',
        render:val=><p>{val} Kg</p>

},];

const PesadasComponent = ({animal, rowSelection, showModal}) => {
    moment.locale('es');
    return (
        <Fragment>
        <Table rowKey={record => record.id}  rowSelection={rowSelection} columns={columns} dataSource={animal.pesadas} pagination={false}/>
    <Button onClick={showModal} style={{margin:'1% 0'}}>Agregar Pesada</Button>
    </Fragment>
)
};

export default PesadasComponent;