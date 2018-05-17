import React, { Component } from 'react';
import {Button, Modal, List} from 'antd';
import {MyList} from './MyList';
import { ItemCard } from './ItemCard';

class ProductsCart extends Component {
    state={
        visible:false,
        
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
        this.props.saveOrder()
      }
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
  render() {
      let {visible} = this.state
      let {cart, addItem, removeItem, saveOrder} = this.props
    return (
      <span className="products-cart-container">
         <Button 
            onClick={this.showModal}
            type="primary" 
            shape="circle" 
            icon="shopping-cart"
            size="large" />
         <Modal
        style={{ top: 10, left:'37%' }}
        width={'25%'}
          bodyStyle={{height:'85vh', overflowY:'scroll'}}
          title={`Compra Actual $${cart.total}`}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        > 
        <MyList cart={cart} removeItem={removeItem} addItem={addItem}/>
        </Modal>
      </span>
    )
  }
};

export default ProductsCart;
