import React, {Component} from 'react';
import { Form, Input, Button, Modal, Checkbox } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;

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


const ProveedorForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, rfc, phone, handleChange, contacto, on, handleChangeOn} = props;
        const{getFieldDecorator} = form;

        const style = {
            display: on ? 'none' : 'block',
        };

        return(
            <Modal
                visible={visible}
                title={"Nuevo Proveedor"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form onSubmit={this.handleSubmit} >
                    <div style={styles.form}>
                        <FormItem
                            label="Nombre del Proveedor/Razón Social"
                        >
                            {getFieldDecorator('provider', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
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
                                    {getFieldDecorator('name_contact', {initialValue: "",})
                                    (<Input disabled={on} hidden={on} placeholder={"Nombre Completo"} />)}
                                </FormItem>

                                <FormItem>
                                    {getFieldDecorator('phone_contact', {initialValue: "",})
                                    (<Input disabled={on} hidden={on} placeholder={"Telefono"} />)}
                                </FormItem>

                                <FormItem>
                                    {getFieldDecorator('comments_contact', {initialValue: "",})
                                    (<Input disabled={on} hidden={on} placeholder={"Comentarios"} />)}
                                </FormItem>
                            </div>

                        </div>


                        <FormItem
                            label="RFC del Proveedor"
                        >
                            {getFieldDecorator('rfc', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                    {validator: rfc}
                                ],
                            })(
                                <Input minLength={"13"} maxLength={"13"}/>
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
                                }, {validator: phone}],
                            })(
                                <Input minLength={"10"} maxLength={"10"} />
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

export default ProveedorForm;
