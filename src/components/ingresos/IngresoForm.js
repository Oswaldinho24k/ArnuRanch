import React from 'react';
import { Form, Input, Button, Select, InputNumber, Checkbox, Modal } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
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

const FormIngreso = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, options_clientes, options, handleChange, factura, lineHandle, searchLine}=props;
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
                    <div style={styles.form}>
                        <FormItem
                            label={"Razón Social"}
                            hasFeedback
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
                            hasFeedback
                        >
                            <Select
                                placeholder={"Linea de Negocio"}
                                mode={'combobox'}
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.name} >{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>


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
                                    min={0}
                                    style={{width:'100%'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <div style={styles.formSection}>
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
                                {getFieldDecorator('no_scheck', {initialValue: ""})(<Input disabled={!factura}/>)}
                            </FormItem>

                        </div>

                        <div style={styles.sectionCheck}>

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
                        <Button type="primary" onClick={onCreate} size="large" style={styles.buttonSave}>
                            Guardar
                        </Button>
                    </FormItem>

                </Form>

            </Modal>

        )
    }
);
export default FormIngreso;