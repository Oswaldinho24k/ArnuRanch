import React, {Component} from 'react';
import { Form, Input, Button, Modal, Checkbox } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const ClienteForm = Form.create()(
    (props)=>{
        const{visible, onCancel, onCreate, form, rfc, phone, handleChange, contacto} = props;
        const {getFieldDecorator} = form;

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
                            label="Nombre del Cliente"
                        >
                            {getFieldDecorator('client', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('contact_check', {
                                valuePropName: 'checked',
                                initialValue: true,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Checkbox
                                    value={contacto}
                                    onChange={handleChange}
                                >
                                    Contacto Directo?
                                </Checkbox>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('contact')(<Input maxLength={"13"} disabled={contacto}/>)}
                        </FormItem>

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
                                <Input minLength={"13"} maxLength={"13"}  />
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
                                <Input />
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
                                <Input />
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
                                <Input minLength={"10"} maxLength={"10"}  />
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