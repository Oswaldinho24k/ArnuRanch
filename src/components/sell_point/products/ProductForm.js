import React, { Component } from 'react';
import {Form, Input, Select, Modal, InputNumber, Upload, Button, Icon, Checkbox} from 'antd'
import MainLoader from '../../common/Main Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productActions from '../../../redux/actions/sellpoint/products/productActions'

const Option = Select.Option;

const FormItem = Form.Item;

class ProductForm extends Component {



    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if(!err){
                console.log(values)
                this.props.productActions.newProduct(values)
                    .then(r=>{
                        this.props.history.push('/admin/sp')
                    }).catch(e=>{
                        console.log(e)
                    })
                
                
            }

        })
       
    }
    handleCancel = (e) => {
    this.props.history.push('/admin/sp')
    }

  render() {
      
    let {form, categories, fetched} = this.props
    
    if(!fetched)return(<MainLoader/>)
    return (
    <Modal
        title="Basic Modal"
        visible={true}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
    >
        <Form onSubmit={this.handleOk}>
          <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap' }}>
          <FormItem label="Nombre del producto">
            {form.getFieldDecorator('name', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Input/>
            )}
        </FormItem>

        <FormItem label="Descripción">
            {form.getFieldDecorator('description', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Input/>
            )}
        </FormItem>

        <FormItem label="Imágen">
            {form.getFieldDecorator('image', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Upload >
                    <Button>
                    <Icon type="upload" /> Image
                    </Button>
                </Upload>
            )}
        </FormItem>

        <FormItem label="Precio de venta">
            {form.getFieldDecorator('sell_price', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
        <FormItem label="Precio de compra">
            {form.getFieldDecorator('buy_price', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
        <FormItem label="Precio de oferta">
            {form.getFieldDecorator('offer_price', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
        <FormItem label="En oferta?">
            {form.getFieldDecorator('in_offer', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Checkbox>Oferta?</Checkbox>
            )}
        </FormItem>
        
        
        <FormItem label="Categoría">
            {form.getFieldDecorator('category_id', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Select defaultValue="lucy" style={{ width: 120 }}>
                    {categories.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.name}</Option>) }
                </Select>
            )}
        </FormItem>
        <FormItem label="Stock">
            {form.getFieldDecorator('in_stock', {
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
          </div>
       
        
      </Form>
    </Modal>
      
    )
  }
};
const mapStateToProps = (state, ownProps) => {
    return{
        categories:state.categories.list,
        fetched:state.categories.list!==undefined
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        productActions:bindActionCreators(productActions, dispatch),
    }
};

ProductForm = Form.create()(ProductForm);

ProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductForm);


export default ProductForm
