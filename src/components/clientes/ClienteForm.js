import React from 'react';
import { Form, Input, Button, Modal, Checkbox } from 'antd';


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


const ClienteForm = Form.create()(
    (props)=>{
        const{visible, onCancel, onCreate, form, rfc, phone, on, handleChangeOn} = props;
        const {getFieldDecorator} = form;

        const style = {
            display: on ? 'none' : 'block',
        };

        return(
            <Modal
                visible={visible}
                title={"Nuevo Cliente"}
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
                            label="Nombre del Cliente / Razón Social"
                        >
                            {getFieldDecorator('client', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Nombre del cliente"} />
                            )}
                        </FormItem>

                        <div style={styles.sectionCheck}>
                            <FormItem>
                                {getFieldDecorator('direct_contact', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox
                                        value={on}
                                        onChange={handleChangeOn}
                                    >
                                        Contacto Directo?
                                    </Checkbox>
                                )}

                            </FormItem>

                            <div style={style}>
                                <FormItem>
                                    {getFieldDecorator('name_contact', {initialValue: "",})(<Input disabled={on} hidden={on} placeholder={"Nombre Completo"} />)}
                                </FormItem>

                                <FormItem>
                                    {getFieldDecorator('phone_contact', {initialValue: "",})(<Input disabled={on} hidden={on} placeholder={"Telefono"} />)}
                                </FormItem>

                                <FormItem>
                                    {getFieldDecorator('comments_contact', {initialValue: "",})(<Input disabled={on} hidden={on} placeholder={"Comentarios"} />)}
                                </FormItem>
                            </div>

                        </div>

                        <FormItem
                            label="RFC del Cliente"
                        >
                            {getFieldDecorator('rfc', {
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
                            label="Dirección"
                        >
                            {getFieldDecorator('address', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Dirección del cliente"} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Correo electrónico"
                        >
                            {getFieldDecorator('email', {
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
                            {getFieldDecorator('phone_number', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                    {validator: phone}
                                ],
                            })(
                                <Input minLength={"10"} maxLength={"10"}  placeholder={"Teléfono a 10 dígitos"}/>
                            )}
                        </FormItem>


                        <FormItem
                            label="Plazo de crédito en días"
                        >
                            {getFieldDecorator('credit', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Plazo de crédito"} />
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

export default ClienteForm