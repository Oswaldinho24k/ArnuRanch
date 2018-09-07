import React, {Component} from 'react';
import {Table} from 'antd'


const columns=[
    {
        title:'Acredor',
        dataIndex:'id',
        key:'id'
    },{
        title:'Saldo Disponible',
        dataIndex:'lote',
        key:'lote'
    }
]

const items = [
    {
        id:'Acreedor1',
        lote:45678
    },{
        id:'Acreedor2',
        lote:3333566
    },{
        id:'Acreedor3',
        lote:756764
    }
]

class BasicTable extends Component{
    render(){
        return(
            <div>
                <Table dataSource={items} columns={columns}/>
            </div>
        )
    }
}

export default BasicTable