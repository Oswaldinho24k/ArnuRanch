import React, { Component } from 'react';
import {Table, Card, Avatar} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment'

class OrdersPage extends Component {

    state={}
   
  render() {
      let {orders} = this.props;
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key:'date',
            render: (text, record) => (
                <span>
                  {moment(text).format('LLLL')}
                </span>
            ),
            width:200
        },{
            title: 'User',
            dataIndex: 'user',
            key:'user',
            render: (text, record) => (
                <span>
                  {record.employee.username}
                </span>
            ),
            width:200
        },{
            title: 'Total',
            dataIndex: 'total',
            key:'total',
            render: (text, record) => (
                <span>
                  ${text}
                </span>
            ),
            width:200
        }
        ];
    return (
      <div>
        {/*<Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={animals}
            rowKey={record => record.id}
            pagination={{
            pageSize: 20,
            total:animalsData.count,
            onChange:this.handlePagination,
            showTotal:total => `Total: ${total} aretes`}}
            scroll={{x:650, y:400}}/>*/}
        <Table
            columns={columns}
            rowKey={record => record.id}
            expandedRowRender={record => <p>{record.items.map((i, key)=>(
                <Card.Grid>x{i.quantity} of {i.product.name} <Avatar src={i.product.image} size="large"/></Card.Grid>
            ))}</p>}
            dataSource={orders}/>
      </div>
    )
  }
};

function mapStateToProps(state, ownProps){
    return {
        orders:state.orders.list,
        fetched:state.orders.list!==undefined
    }
}

function mapDispatchToProps(dispatch){
    return {
        //orderActions:bindActionCreators(orderActions, dispatch)
    }
}
OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
export default OrdersPage;
