import React, {Fragment} from 'react';
import {Form, Input, Button, Select, message, Checkbox} from 'antd';

const Option = Select.Option;

const FormItem = Form.Item;


const InfoClient = ({form,editCliente,id,editMode, handleEditMode, client, address, email, phone_number, rfc, rfcR, phone, contact_check, contact}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id'] = id;
                editCliente(values)
                    .then(r => {
                        message.success('Guardado con éxito');
                        handleEditMode()
                    }).catch(e => {
                    console.log(e)
                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };

    return (
        <Fragment>
            <Form style={{width: '100%'}} onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>

                    <FormItem
                        label="Nombre del Cliente"
                    >
                        {form.getFieldDecorator('client', {
                            initialValue: client,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    {/*<FormItem>
                        {form.getFieldDecorator('contact_check', {
                            valuePropName: 'checked',
                            initialValue: contact_check,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Checkbox
                                disabled={!editMode}
                            >
                                Contacto Directo?
                            </Checkbox>
                        )}
                    </FormItem>

                    <FormItem>
                        {form.getFieldDecorator('contact',{
                            initialValue:contact,
                        })(
                            <Input
                                disabled={!editMode}
                            />
                        )}
                    </FormItem>*/}

                    <FormItem
                        label="RFC del Cliente"
                    >
                        {form.getFieldDecorator('rfc', {
                            initialValue:rfc,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            },
                                {validator: rfcR}
                            ],

                        })(
                            <Input maxLength={"13"} disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Dirección"
                    >
                        {form.getFieldDecorator('address', {
                            initialValue: address,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Correo electrónico"
                    >
                        {form.getFieldDecorator('email', {
                            initialValue: email,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            },{
                                type: 'email', message: 'No es una dirección de correo válida!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {form.getFieldDecorator('phone_number', {
                            initialValue: phone_number,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            },
                                {validator: phone}
                            ],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                </div>
                <FormItem>
                    {editMode ?
                        <Button
                            htmlType="submit"
                            size="large"
                            type={"primary"}
                            style={{width: '100%'}}
                        >
                            Guardar
                        </Button> : ""
                    }
                </FormItem>

            </Form>
            {!editMode ?
                <Button
                    htmlType={"button"}
                    onClick={handleEditMode}
                    style={{width: '90%', display: 'flex', justifyContent: 'center', margin: '0 auto'}}
                >
                    Editar
                </Button> : ""
            }
        </Fragment>
    )
};

const ClientInfo = Form.create()(InfoClient);
export default ClientInfo;