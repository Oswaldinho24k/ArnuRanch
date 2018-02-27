import React from 'react';
import { Form, Input, Button, Select, InputNumber, Checkbox, Modal } from 'antd';


const FormItem = Form.Item;

const FormEgreso = Form.create()(
    (props) => {
        const {visible, onCancel, onCreate, form, options_proveedores, options, handleChange, factura, type} = props;
        const {getFieldDecorator} = form;


        return (
            <Modal
                visible={visible}
                title={"Nuevo Egreso"}
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
                            {getFieldDecorator('provider', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Selecciona un Proveedor',
                                }
                            })(


                                <Select  placeholder={"Selecciona un Proveedor"}>
                                    {options_proveedores}
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
                            label={"Tipo de egreso"}
                        >
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(


                                <Select  placeholder={"Tipo de egreso"}>

                                    {type}
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
                                    min={0}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>


                        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                            <FormItem>
                                {getFieldDecorator('purchase_check', {
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
                                {getFieldDecorator('no_check')(<Input maxLength={"13"} disabled={!factura}/>)}
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
                                    <Checkbox>Pagado</Checkbox>
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
export default FormEgreso;