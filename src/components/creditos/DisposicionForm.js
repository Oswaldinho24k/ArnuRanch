import React from "react";
import moment from 'moment';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select, Switch} from "antd";


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
        let {form, disposicion}  = this.props
        if(!disposicion)disposicion={}
        return(
            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>

                    <FormItem style={{margin:0}}
                        label="Folio "
                    >
                        {form.getFieldDecorator('numero', {
                            initialValue:disposicion.numero,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input style={{width:'250px'}}/>

                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Credito "
                    >
                        {form.getFieldDecorator('tipo_credito', {
                            initialValue:disposicion.tipo_credito,
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
                    <FormItem style={{margin:0}}
                        label="Monto "
                    >
                        {form.getFieldDecorator('monto', {

                            initialValue:disposicion.monto,
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Plazo "
                    >
                        {form.getFieldDecorator('plazo', {
                            initialValue:disposicion.plazo,
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Fecha Inicio "
                    >
                        {form.getFieldDecorator('fecha_inicio', {
                            initialValue:moment(disposicion.fecha_inicio),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <DatePicker style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Fecha Vencimiento "
                    >
                        {form.getFieldDecorator('fecha_vencimiento', {
                            initialValue:moment(disposicion.fecha_vencimiento),
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <DatePicker style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Tasa "
                    >
                        {form.getFieldDecorator('tasa', {
                            initialValue:disposicion.tasa,
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Gracia "
                    >
                        {form.getFieldDecorator('gracia', {
                            initialValue:disposicion.gracia,
                            rules: [{
                                required: true, message: 'Completa el campo!',

                            }],

                        })(
                            <InputNumber style={{width:'250px'}}/>
                        )}
                    </FormItem>
                    <FormItem style={{margin:0}}
                        label="Periodo de Intereses "
                    >
                        {form.getFieldDecorator('periodo_intereses', {
                            initialValue:disposicion.periodo_intereses,
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
                    <FormItem style={{margin:0}}
                        label="Periodo Capital"
                    >
                        {form.getFieldDecorator('periodo_capital', {
                            initialValue:disposicion.periodo_capital,
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
                    <FormItem style={{margin:0}}
                              label="Pagado"
                    >
                        {form.getFieldDecorator('paid', {
                            initialValue:disposicion.paid,
                            rules: [{
                                required: false

                            }],
                        })(
                            <Switch/>
                        )}
                    </FormItem>
                </div>
                <FormItem style={{margin:0}}>
                    <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                        Guardar
                    </Button>
                </FormItem>

            </Form>
        )}}

const DisposicionF = Form.create()(DisposicionForm)
export default DisposicionF;