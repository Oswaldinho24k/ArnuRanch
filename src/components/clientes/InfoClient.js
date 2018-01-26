import React, {Fragment} from 'react';
import {List, Avatar, Form, Input, InputNumber, Upload, DatePicker, Icon, Button, Select} from 'antd';

const Option = Select.Option;

const FormItem = Form.Item;


const InfoClient = ({form,editCliente,id,editMode, handleEditMode, client, address, email, phone_number,}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id'] = id;
                editCliente(values)
                    .then(r => {
                        console.log("Editado con éxito");
                        handleEditMode()
                    }).catch(e => {
                    console.log(e)
                })
            }
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
                            initialValue: client

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Dirección"
                    >
                        {form.getFieldDecorator('address', {
                            initialValue: address

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Correo electrónico"
                    >
                        {form.getFieldDecorator('email', {
                            initialValue: email

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {form.getFieldDecorator('phone_number', {
                            initialValue: phone_number

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