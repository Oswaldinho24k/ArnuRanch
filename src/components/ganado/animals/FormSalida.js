import React from 'react';
import { Divider, Form, Button, Input, Select } from 'antd';

const Option = {Select};



const FormSalida=({clients, form, saveSalida, disabled, price, kilograms, client, carro, flete, chofer})=>{
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                saveSalida(values);
                form.resetFields()
            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };
    return(
        <div>
             <Form onSubmit={handleSubmit}>
                <Form.Item label="Total">
                {form.getFieldDecorator('price', {
                    initialValue:price,
                    })(
                        <Input disabled={disabled}/>
                    )}
                </Form.Item>
                <Form.Item label="Kilogramos">
                {form.getFieldDecorator('kilograms', {
                    initialValue:kilograms,
                    })(
                        <Input disabled={disabled}/>
                    )}
                </Form.Item>
                <Form.Item label={'Cliente'}>
                    {form.getFieldDecorator('client_id', {
                        initialValue:client?client.client:'No asignado',
                    })(
                        <Select disabled={disabled}>
                            {clients.map((a, key) => <Option key={key} value={parseInt(a.id)} >{a.client}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Carro">
                {form.getFieldDecorator('carro', {
                    initialValue:carro,
                    })(
                        <Input disabled={disabled}/>
                    )}
                </Form.Item>
                <Form.Item label="Chofer">
                {form.getFieldDecorator('chofer', {
                    initialValue:chofer,
                    })(
                        <Input disabled={disabled}/>
                    )}
                </Form.Item>
                <Form.Item label="Flete">
                {form.getFieldDecorator('flete', {
                    initialValue:flete,
                    })(
                        <Input disabled={disabled}/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button disabled={disabled} type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>

            </Form>
        </div>
    )
}

let FormSalidas=Form.create()(FormSalida);
export default FormSalidas;