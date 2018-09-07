import React from 'react';
import { Form, Input, Button, Modal, Select, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const styles = {
    form:{
        display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap'

    },
    formSection:{
        display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'
    },
    sectionCheck:{
        display:'flex',justifyContent:'flex-end', flexWrap:'wrap'
    },
    buttonSave:{
        borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'
    }
};


const CompraForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, blines, searchLine, proveedores, searchProveedor, saveProvider, saveLine} = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Nueva Compra"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >

                <Form onSubmit={onCreate} >
                    <div style={styles.form}>

                        <FormItem
                            label={"Razón Social"}
                            hasFeedback
                        >
                            {getFieldDecorator('proveedor_id', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Select
                                    placeholder={"Razón Social"}
                                    showSearch
                                    onSearch={searchProveedor}
                                    filterOption={false}
                                >
                                    {
                                        proveedores.length >0? proveedores.map((a, key) => <Option key={key} value={a.provider} ><div onClick={()=>saveProvider(a.id)} ><span>{a.provider}</span></div></Option>):<Option key={999999} disabled >No encontrado</Option>
                                    }

                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label={"Linea de negocio"}
                            hasFeedback
                        >
                            {getFieldDecorator('linea_compras_id', {
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
                                        blines.length >0? blines.map((a, key) => <Option key={key} value={a.name} ><div onClick={()=>saveLine(a.id)} ><span>{a.name}</span></div></Option>):<Option key={999999} disabled >No Lineas</Option>
                                    }

                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Numero de factura"
                        >
                            {getFieldDecorator('no_factura', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo"

                        >
                            {getFieldDecorator('costo_final', {
                                initialValue:0,
                                rules: [{
                                    required:true
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

                        <FormItem
                            label="Descripción"
                        >
                            {getFieldDecorator('descripcion', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Fecha"
                        >
                            {getFieldDecorator('fecha_creacion', {
                                initialValue:moment( new Date(), 'YYYY-MM-DD'),
                                rules: [{ type: 'object', required: true, message: 'Selecciona una fecha válida!' }],
                            })(
                                <DatePicker style={{width:'100%'}} />
                            )}
                        </FormItem>
                    </div>
                    <FormItem>
                        <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>

                </Form>

            </Modal>

        )
    }
);

export default CompraForm;