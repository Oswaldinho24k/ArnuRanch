import React from 'react';
import {Form, InputNumber, Select, Button} from 'antd';
const Option = Select.Option;

const FormItem = Form.Item;


class FormPesada extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(this.props);
                this.props.savePesada(values)
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
                    {getFieldDecorator('peso', {
                        rules: [{
                            required: true, message: 'Completa!',
                        }],
                    })(
                        <InputNumber
                            step={0.01}
                            min={0}
                            style={{width:'100%'}}
                            formatter={value => `${value}Kg`}
                            parser={value => value.replace('Kg', '')}
                        />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </FormItem>
            </Form>
        )
    }
}
FormPesada = Form.create()(FormPesada);
export default FormPesada;
