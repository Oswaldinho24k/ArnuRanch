import React from 'react';
import { Form, Input, Button, Select, InputNumber, Checkbox, Modal } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

const FormEgreso = Form.create()(
    (props) => {
        const {visible, onCancel, onCreate, form, options_proveedores, options, handleChange, factura, type, lineHandle, searchLine, searchProvider, compras, compraSearch, compraChange, compra} = props;
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
                            {getFieldDecorator('provider_egreso_id', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Selecciona un Proveedor',
                                }
                            })(


                                <Select
                                    placeholder={"Razón Social"}
                                    showSearch
                                    onSearch={searchProvider}
                                    filterOption={false}
                                >
                                    {
                                        options_proveedores.length >0? options_proveedores.map((a, key) => <Option key={key} value={a.id} >{a.provider}</Option>):<Option key={999999} disabled >No encontrado</Option>
                                    }

                                </Select>
                            )}

                        </FormItem>


                        <FormItem
                            label={"Linea de negocio"}

                        >
                            {getFieldDecorator('business_egreso_id', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Select
                                    placeholder={"Linea de Negocio"}
                                    showSearch
                                    onSearch={searchLine}
                                    filterOption={false}
                                >
                                    {
                                        options.length >0? options.map((a, key) => <Option key={key} value={a.id} >{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                    }

                                </Select>
                            )}

                        </FormItem>

                        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                            <FormItem>
                                {getFieldDecorator('compra_check', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox
                                        value={compra}
                                        onChange={compraChange}
                                    >
                                        Compra?
                                    </Checkbox>
                                )}
                            </FormItem>

                            <FormItem style={{width:'200px'}} >
                                {getFieldDecorator('compra_egreso_id', {
                                    rules: [{
                                        required: false, message: 'Completa el campo!',
                                    },
                                    ],
                                })(
                                    <Select
                                        placeholder={"Compra"}
                                        showSearch
                                        onSearch={compraSearch}
                                        filterOption={false}
                                        disabled={!compra}
                                    >
                                        {
                                            compras.length >0? compras.map((a, key) => <Option key={key} value={a.id} >{a.no_factura}</Option>):<Option key={999999} disabled >No encontrado</Option>
                                        }

                                    </Select>
                                )}

                            </FormItem>

                        </div>

                        <FormItem
                            label="Concepto"
                        >
                            {getFieldDecorator('concepto_purchase', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Input disabled={compra}/>
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