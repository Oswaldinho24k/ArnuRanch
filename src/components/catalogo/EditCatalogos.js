import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message, Modal,DatePicker} from 'antd';


import moment from 'moment'
const Option = Select.Option;
const FormItem = Form.Item;
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

const InfoCatalogo = ({form,onCancel, visible, data,activeTab,onEdit,options,searchLine,saveLine }) => {
    const{getFieldDecorator} = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {

            if (!err) {
                console.log("VALUES",values);
                values['id']=data.id;
                console.log("ENVIAR", values)

                onEdit(values)
                    /*.then(r=>{
                        console.log("Editado con éxito");
                        message.success('Guardado con éxito');
                        onCancel()
                        form.resetFields();
                    }).catch(e=>{
                    console.log(e)
                })*/
                    onCancel()
                form.resetFields();

            }else{message.error('Algo fallo, verifica los campos');}
        });
    };



    return (
        <Fragment>
            <Modal
                visible={visible}
                title={"Editar a Catálogo"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form onSubmit={handleSubmit} >
                    <div style={styles.form}>
                        <FormItem
                            label="Nombre"
                        >
                            {getFieldDecorator('name', {
                                initialValue:data.name,
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
                                initialValue:data.code,
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
                            {getFieldDecorator('bl_id', {
                                initialValue:data.bl?data.bl.name:'',
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
                                        initialValue:data.concepto,
                                        rules: [{
                                            required: false, message: 'Completa el campo!',
                                        }],

                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem
                                    label="Monto"

                                >
                                    {getFieldDecorator('monto', {
                                        initialValue:data.monto,
                                        rules: [{
                                            required:false
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
                                        rules: [{ type: 'object', required: false, message: 'Selecciona una fecha válida!' }],
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
        </Fragment>
    )
};
const EditCatalogos = Form.create()(InfoCatalogo);
export default EditCatalogos;