import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';


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


const CompanyForm = Form.create()(
    (props)=>{
        const{visible, onCancel, onCreate, form, rfc, phone, options} = props;
        const {getFieldDecorator} = form;

        return(
            <Modal
                visible={visible}
                title={"Nueva Empresa"}
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
                            label="Nombre de la Empresa / Razón Social"
                        >
                            {getFieldDecorator('company', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Nombre de la empresa"} />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {getFieldDecorator('line_comp', {
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
                            label="RFC de la Empresa"
                        >
                            {getFieldDecorator('rfc_comp', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                    {validator: rfc}
                                ],
                            })(
                                <Input minLength={"13"} maxLength={"13"} placeholder={" RFC a trece dígitos"}  />
                            )}
                        </FormItem>

                        <FormItem
                            label="Correo electrónico"
                        >
                            {getFieldDecorator('email_comp', {
                                rules: [{
                                    type: 'email', message: 'No es una dirección de correo válida!',
                                }, {
                                    required: true, message: 'Ingresa un E-mail!',
                                }],
                            })(
                                <Input placeholder={"correo@gmail.com"}/>
                            )}
                        </FormItem>

                        <FormItem
                            label="Teléfono"
                        >
                            {getFieldDecorator('phone_compa', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                    {validator: phone}
                                ],
                            })(
                                <Input minLength={"10"} maxLength={"10"}  placeholder={"Teléfono a 10 dígitos"}/>
                            )}
                        </FormItem>



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

export default CompanyForm