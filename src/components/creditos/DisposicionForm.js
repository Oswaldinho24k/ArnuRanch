import {Button, DatePicker, Form, Input, InputNumber, Modal, Select} from "antd";
import React from "react";

const Option = Select.Option


const FormItem = Form.Item;


class DisposicionForm extends React.Component{

    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            values['acreedor_id'] = this.props.acreedorId
            this.props.handleSubmit(values)
        })



    }
    render(){
        let {form}  = this.props
        return(
            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>

                    <FormItem
                        label="Credito "
                    >
                        {form.getFieldDecorator('tipo_credito', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Select style={{width:'250px'}}>
                                <Option key={1} value={'revolvente'}>Revolvente</Option>
                                <Option key={2} value={'simple'}>Simple</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="Monto "
                    >
                        {form.getFieldDecorator('monto', {
                            initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Plazo "
                    >
                        {form.getFieldDecorator('plazo', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Fecha Inicio "
                    >
                        {form.getFieldDecorator('fecha_inicio', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <DatePicker style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Fecha Vencimiento "
                    >
                        {form.getFieldDecorator('fecha_vencimiento', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <DatePicker style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Tasa "
                    >
                        {form.getFieldDecorator('tasa', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Gracia "
                    >
                        {form.getFieldDecorator('gracia', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Periodo de Intereses "
                    >
                        {form.getFieldDecorator('periodo_intereses', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <Select style={{width:'250px'}}>
                                <Option key={1} value={'mensual'}>Mensual</Option>
                                <Option key={2} value={'vencimiento'}>Vencimiento</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="Periodo Capital"
                    >
                        {form.getFieldDecorator('periodo_capital', {
                            //initialValue:form.getFieldValue('credito'),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <Select style={{width:'250px'}}>
                                <Option key={1} value={'mensual'}>Mensual</Option>
                                <Option key={2} value={'trimestral'}>Trimestral</Option>
                                <Option key={3} value={'semestral'}>Semestral</Option>
                                <Option key={4} value={'anual'}>Anual</Option>
                                <Option key={5} value={'vencimiento'}>Vencimiento</Option>
                            </Select>
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

const DisposicionF = Form.create()(DisposicionForm)
export default DisposicionF;