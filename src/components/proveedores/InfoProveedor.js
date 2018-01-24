import React, {Fragment} from 'react';
import {List, Avatar, Form, Input, InputNumber, Upload, DatePicker, Icon, Button, Select} from 'antd';

const Option = Select.Option;

const FormItem = Form.Item;


const InfoProveedor = ({form, provider, address, email, phone_number,}) => {
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
                        label="Nombre del Proveedor"
                    >
                        {form.getFieldDecorator('provider', {
                            initialValue:provider

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
const ProveedorInfo = Form.create()(InfoProveedor);
export default ProveedorInfo;