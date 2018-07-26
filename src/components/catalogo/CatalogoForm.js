import React from 'react';
import { Form, Input, Button, Modal,DatePicker,InputNumber,Select  } from 'antd';
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


const CatalogoForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form,activeTab,saveLine,options,searchLine} = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Agregar a Catálogo"}
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
                            label="Nombre"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input  />
                            )}
                        </FormItem>

                        <FormItem
                            label="Código"
                        >
                            {getFieldDecorator('code', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label={"Linea de negocio"}
                            hasFeedback
                        >
                            {getFieldDecorator('bl', {
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
                                        options.length >0? options.map((a, key) => <Option key={key} value={a.name} ><div onClick={()=>saveLine(a.id)}><span>{a.name}</span></div></Option>):<Option key={999999} disabled >No Lineas</Option>
                                    }

                                </Select>
                            )}
                        </FormItem>
                        {activeTab === "budget" ?
                            <div>
                                <FormItem
                                    label="Concepto"
                                >
                                    {getFieldDecorator('concepto', {
                                        rules: [{
                                            required: true, message: 'Completa el campo!',
                                        }],

                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Monto"

                                >
                                    {getFieldDecorator('monto', {
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
                                    label="Fecha"
                                >
                                    {getFieldDecorator('pay_date', {
                                        initialValue:moment( new Date(), 'YYYY-MM-DD'),
                                        rules: [{ type: 'object', required: true, message: 'Selecciona una fecha válida!' }],
                                    })(
                                        <DatePicker style={{width:'100%'}} />
                                    )}
                                </FormItem>
                            </div>



                            : null
                        }

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

export default CatalogoForm;