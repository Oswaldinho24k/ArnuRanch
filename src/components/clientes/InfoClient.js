import React, {Fragment} from 'react';
import {List, Avatar, Form, Input, InputNumber, Upload, DatePicker, Icon, Button, Select} from 'antd';

const Option = Select.Option;

const FormItem = Form.Item;


const InfoClient = ({form, client, address, email, phone_number,}) => {
    console.log(client)
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };

    return (
        <Fragment>
            <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label="Nombre del Cliente"
                    >
                        {form.getFieldDecorator('client', {
                            initialValue:client

                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Dirección"
                    >
                        {form.getFieldDecorator('address', {
                            initialValue:address

                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Correo electrónico"
                    >
                        {form.getFieldDecorator('email', {
                            initialValue:email

                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {form.getFieldDecorator('phone_number', {
                            initialValue:phone_number

                        })(
                            <Input />
                        )}
                    </FormItem>



                </div>

            </Form>
        </Fragment>
    )
};
const ClientInfo = Form.create()(InfoClient);
export default ClientInfo;