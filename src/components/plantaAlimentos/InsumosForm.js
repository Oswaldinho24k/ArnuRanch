import React from "react";
import {Button, Form, Input, InputNumber} from 'antd';
const FormItem = Form.Item;

//TODO create CRUD of this component
const style = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    flexWrap:'wrap'
};
let InsumosDisplay = ({form, onSubmit}) => {
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                console.log("good");
                onSubmit(values);
            }
        });
    };
    const { getFieldDecorator } = form;
    return (
        <Form style={style} onSubmit={handleSubmit}>
            <FormItem label="Nombre">
                {
                    getFieldDecorator(
                        'name',
                        {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        }
                    )(<Input/>)
                }
            </FormItem>
            <FormItem label="Precio unitario">
                {
                    getFieldDecorator('unit_price', {
                        rules: [{
                            required: true, message: 'Completa el campo!',
                        }],
                    })(<InputNumber width="100%" min={1} max={10000}/>)
                }
            </FormItem>

            <FormItem label="Unidad">
                {
                    getFieldDecorator('unit', {
                        rules: [{
                            required: true, message: 'Completa el campo!',
                        }],
                    })(<Input/>)
                }

            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                        borderColor: '#72c6cd',
                        backgroundColor: '#72c6cd',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '0 auto',
                        width: '100%'
                    }}
                > Guardar
                </Button>
            </FormItem>
        </Form>
    );
};

InsumosDisplay = Form.create()(InsumosDisplay);
export default InsumosDisplay;