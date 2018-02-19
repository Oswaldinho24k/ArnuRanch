import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button, Select, InputNumber, Checkbox, Modal } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

const FormIngreso = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, options_clientes, options, handleChange, factura}=props;
        const {getFieldDecorator} = form;

        return(
            <Modal
                visible={visible}
                title={"Nuevo Ingreso"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form >
                    <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem
                            label={"Razón Social"}
                        >
                            {getFieldDecorator('client', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Selecciona un Cliente',
                                }
                            })(


                                <Select  placeholder={"Selecciona un Cliente"}>
                                    {options_clientes}
                                </Select>
                            )}

                        </FormItem>

                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {getFieldDecorator('business_line', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Linea de Negocio',
                                }
                            })(
                                <Select  placeholder={"Linea de Negocio"}>
                                    {options}
                                </Select>
                            )}

                        </FormItem>

                        <FormItem
                            label="Monto"
                        >
                            {getFieldDecorator('total', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    style={{width:'100%'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                            <FormItem>
                                {getFieldDecorator('sale_check', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox
                                        value={factura}
                                        onChange={handleChange}
                                    >
                                        Factura?
                                    </Checkbox>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('no_scheck')(<Input disabled={!factura}/>)}
                            </FormItem>

                        </div>

                        <div style={{display:'flex',justifyContent:'flex-end'}}>

                            <FormItem >
                                {getFieldDecorator('paid', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox>Cobrado</Checkbox>
                                )}
                            </FormItem>
                        </div>

                    </div>
                    <FormItem>
                        <Button type="primary" onClick={onCreate} size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>

                </Form>

            </Modal>

        )
    }
);
export default FormIngreso;