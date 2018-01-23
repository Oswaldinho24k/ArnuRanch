import React from 'react';
import {Form, InputNumber, Input, Select, Button, message} from 'antd';
const Option = Select.Option;

const FormItem = Form.Item;


class FormGasto extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(this.props);

                this.props.saveGasto(values)



            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem  label="Monto">
                    {getFieldDecorator('costo', {
                        rules: [{
                            required: true, message: 'Completa!',
                        }],
                    })(
                        <InputNumber
                            step={0.01}
                            min={0}
                            style={{width:'100%'}}
                            formatter={value => `$${value}`}
                            parser={value => value.replace('$', '')}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('tipo', {
                        rules: [{
                            required: true, message: 'Completa!',
                        }],
                    })(
                    <Select defaultValue="Alimento">
                        <Option value="Alimento">Alimento</Option>
                        <Option value="Vacuna">Vacuna</Option>

                    </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </FormItem>
            </Form>
        )
    }
}
FormGasto = Form.create()(FormGasto);
export default FormGasto;
