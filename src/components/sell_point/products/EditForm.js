import React, { Component } from 'react';
import {Form, Input, Select,Switch, Modal, InputNumber, Upload, Button, Icon, Checkbox} from 'antd'
import MainLoader from '../../common/Main Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productActions from '../../../redux/actions/sellpoint/products/productActions'

const Option = Select.Option;

const FormItem = Form.Item;

class EditForm extends Component {



    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if(!err){
                console.log(values, this.props.match.params.id.toString())
                values['id']=this.props.match.params.id
                this.props.productActions.editProduct(values)
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
      
    let {form, categories, fetched, product} = this.props
    
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
                initialValue:product.name,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Input/>
            )}
        </FormItem>

        <FormItem label="Descripción">
            {form.getFieldDecorator('description', {
                initialValue:product.description,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Input/>
            )}
        </FormItem>

        <FormItem label={product.image?<a href={product.image} target="_blank">Imágen</a>:'Imágen'}>
            {form.getFieldDecorator('image', {
                rules: [{
                    required: false, message: 'Completa!',
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
                initialValue:product.sell_price,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
        <FormItem label="Precio de compra">
            {form.getFieldDecorator('buy_price', {
                initialValue:product.buy_price,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
        <FormItem label="Precio de oferta">
            {form.getFieldDecorator('offer_price', {
                initialValue:product.offer_price,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <InputNumber/>
            )}
        </FormItem>
        <FormItem label="En oferta?">
            {form.getFieldDecorator('in_offer', {
                initialValue:product.in_offer,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Switch defaultChecked={product.in_offer} />,
            )}
        </FormItem>
        
        
        <FormItem label="Categoría">
            {form.getFieldDecorator('category_id', {
                initialValue:product.category.id,
                rules: [{
                    required: true, message: 'Completa!',
                }],
            })(
                <Select style={{ width: 120 }}>
                    {categories.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.name}</Option>) }
                </Select>
            )}
        </FormItem>
        <FormItem label="Stock">
            {form.getFieldDecorator('in_stock', {
                initialValue:product.in_stock,
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
    let product = state.products.list.find(p=>{
        return p.id ==ownProps.match.params.id
    })
    return{
        product,
        categories:state.categories.list,
        fetched:state.categories.list!==undefined && product!==undefined,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        productActions:bindActionCreators(productActions, dispatch),
    }
};

EditForm = Form.create()(EditForm);

EditForm = connect(mapStateToProps, mapDispatchToProps)(EditForm);


export default EditForm
