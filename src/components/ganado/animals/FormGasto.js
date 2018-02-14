import React from 'react';
import {Form, InputNumber, Select, Button} from 'antd';
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
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let tipo = getFieldValue('tipo');
        return(

            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Tipo">
                    {getFieldDecorator('tipo', {
                        rules: [{
                            required: true, message: 'Completa!',
                        }],
                    })(
                        <Select>
                            <Option value="Alimento">Alimento</Option>
                            <Option value="Vacuna">Vacuna</Option>

                        </Select>
                    )}
                </FormItem>
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
                {tipo==='Alimento'?
                    <FormItem  label="Cantidad">
                        {getFieldDecorator('cantidad', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <InputNumber
                                step={0.01}
                                min={0}
                                style={{width:'100%'}}
                                formatter={value => `${value}g`}
                                parser={value => value.replace('g', '')}
                            />
                        )}
                    </FormItem>:''}

                <FormItem>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </FormItem>
            </Form>
        )
    }
}
FormGasto = Form.create()(FormGasto);
export default FormGasto;
