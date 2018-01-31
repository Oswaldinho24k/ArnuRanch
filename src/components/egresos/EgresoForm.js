import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button, Select, InputNumber, Checkbox } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

const opciones = [{
    name :'Tarjeta Credito',
    id: 1
},{
    name:'Tarjeta Debito',
    id:2
},{
    name:'Efectivo',
    id:3
},

];


class EgresoForm extends Component {
    state = {
        value: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.saveEgreso(values)
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options_proveedores = this.props.proveedores.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.provider}</Option>);
        return (

            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label={"Proveedor"}
                    >
                        {getFieldDecorator('provider', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                            props:{
                                placeholder:'Selecciona un Proveedor',
                            }
                        })(


                            <Select  placeholder={"Selecciona un Proveedor"}>
                                {options_proveedores}
                            </Select>
                        )}

                    </FormItem>

                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem
                            label="Unidades"
                        >
                            {getFieldDecorator('units', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber min={1} max={1000} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Kg Total"
                        >
                            {getFieldDecorator('kg_total', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    step={0.01}
                                    min={0}
                                    max={5000}
                                    formatter={value => `${value}kg`}
                                    parser={value => value.replace('kg', '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Total"
                        >
                            {getFieldDecorator('total', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                    </div>

                    <FormItem
                        label={"Forma de Pago"}
                    >
                        {getFieldDecorator('payment', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                            props:{
                                placeholder:'Selecciona forma de pago',
                            }
                        })(


                            <Select  placeholder={"Selecciona forma de pago"}>

                                {options}
                            </Select>
                        )}

                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('paid', {
                            valuePropName: 'checked',
                            initialValue: true,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Checkbox>Pagado</Checkbox>
                        )}
                    </FormItem>

                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                        Guardar
                    </Button>
                </FormItem>



            </Form>

        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = () => ({

});

const FormEgreso = Form.create()(EgresoForm);

EgresoForm = connect(mapStateToProps, mapDispatchToProps)(EgresoForm);
export default FormEgreso;