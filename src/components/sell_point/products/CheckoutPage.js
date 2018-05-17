import React, { Component } from 'react';
import {Modal} from 'antd'
import {MyList} from './MyList'


class CheckouPage extends Component {
  
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
  render() {
    let {visible} = this.state
    let {cart, addItem, removeItem} = this.props
    console.log(cart)

    return (
        <div>
            <Modal
            style={{ top: 10 }}
            width={'50%'}
            bodyStyle={{height:'85vh', overflowY:'scroll'}}
            titile={`Tota: $${cart.total}`}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            > 
                <MyList cart={cart} removeItem={removeItem} addItem={addItem}/>
            </Modal>
        </div>
    )
  }
};


export default CheckouPage
