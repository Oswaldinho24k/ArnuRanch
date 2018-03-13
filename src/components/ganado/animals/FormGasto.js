import React from 'react';
import {Form, InputNumber, Select, Button, Input} from 'antd';
const Option = Select.Option;

const FormItem = Form.Item;


class FormGasto extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
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

                {tipo==='Alimento'?
                    <div>
                        <FormItem>

                        </FormItem>
                        <FormItem  label="Cantidad">
                            {getFieldDecorator('cantidad', {
                                rules: [{
                                    required: true, message: 'Completa!',
                                }],
                            })(
                                <Input
                                    addonAfter={<FormItem style={{height:5, padding:0}}>
                                        {getFieldDecorator('unity',{
                                            initialValue:'g'
                                        })(
                                            <Select  style={{ width: 100 }}>
                                                <Option value="g">g</Option>
                                            </Select>
                                        )}
                                    </FormItem>}
                                />
                            )}
                        </FormItem>
                    </div>
                    :tipo==='Vacuna'?
                        <div>
                            <FormItem>

                            </FormItem>
                            <FormItem  label="Cantidad">
                                {getFieldDecorator('cantidad', {
                                    rules: [{
                                        required: true, message: 'Completa!',
                                    }],
                                })(
                                    <Input
                                        addonAfter={
                                            <FormItem style={{height:5, padding:0}}>
                                                {getFieldDecorator('unity',{
                                                    initialValue:'ml'
                                                })(
                                                    <Select  style={{ width: 100 }}>
                                                        <Option value="ml">ml</Option>
                                                        <Option value="unidad">unidad</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        }
                                    />
                                )}
                            </FormItem>
                        </div>:''}

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
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </FormItem>
            </Form>
        )
    }
}
FormGasto = Form.create()(FormGasto);
export default FormGasto;
