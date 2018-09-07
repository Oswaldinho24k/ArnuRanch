import React, {Component, Fragment} from 'react';
import {Button, Form, Input, InputNumber, Select, DatePicker} from "antd";

const Option = Select.Option;
const FormItem = Form.Item;


class RequisicionesForm extends Component{

    render(){
        let {getFieldDecorator} = this.props.form
        return(
            <Fragment>
                <Form>
                    <FormItem label="Fecha de Entrega">
                        {getFieldDecorator('fecha_entrega', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <DatePicker />
                        )}
                    </FormItem>

                    <FormItem label="Fecha de Límite">
                        {getFieldDecorator('fecha_limite', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <DatePicker />
                        )}
                    </FormItem>

                    <FormItem label="Línea de Negocio">
                        {getFieldDecorator('bl', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Select>
                                <Option value={"1"}>1</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="Producto">
                        {getFieldDecorator('prducto', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Select>
                                <Option value={"1"}>1</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="Tipo de egreso">
                        {getFieldDecorator('prducto', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Select>
                                <Option value={"gasto"}>Gasto</Option>
                                <Option value={"costo"}>Costo</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="Solicitante">
                        {getFieldDecorator('solicitante', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem label="Último Precio">
                        {getFieldDecorator('ultimo_precio', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem label="Comentarios">
                        {getFieldDecorator('comentarios', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit">Guardar</Button>
                    </FormItem>
                </Form>
            </Fragment>
        )
    }
}

const RequisicionesWForm = Form.create()(RequisicionesForm);

export default RequisicionesWForm;



