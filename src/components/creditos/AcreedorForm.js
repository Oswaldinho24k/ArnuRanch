import {Button, DatePicker, Form, Input, InputNumber, Modal, Select} from "antd";
import React from "react";


const FormItem = Form.Item;


class AcreedoresForm extends React.Component{

    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            this.props.handleSubmit(values)
        })



    }
    render(){
        let {form}  = this.props
    return(
    <Form onSubmit={this.handleSubmit} >
        <div >
            <FormItem
                label="Banco"
            >
                {form.getFieldDecorator('banco', {
                    rules: [{
                        required: true, message: 'Completa el campo!',
                    }],

                })(
                    <Input  />
                )}
            </FormItem>

            <FormItem
                label="Credito "
            >
                {form.getFieldDecorator('credito', {
                    rules: [{
                        required: true, message: 'Completa el campo!',
                    }],

                })(
                    <InputNumber />
                )}
            </FormItem>
            <FormItem
                label="Saldo "
            >
                {form.getFieldDecorator('saldo', {
                    initialValue:form.getFieldValue('credito'),
                    rules: [{
                        required: true, message: 'Completa el campo!',

                    }],

                })(
                    <InputNumber disabled/>
                )}
            </FormItem>
        </div>
        <FormItem>
            <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                Guardar
            </Button>
        </FormItem>

    </Form>
)}}

const AcreedoresF = Form.create()(AcreedoresForm)
export default AcreedoresF;