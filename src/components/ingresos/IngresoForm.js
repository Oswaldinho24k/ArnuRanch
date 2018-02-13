import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button, Select, InputNumber, Checkbox } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

const opciones = [{
    name :'Cerdos',
    id: 1
},
    {
        name:'Ganado',
        id:2
    },
    {
        name:'Granos',
        id:3
    },
    {
        name:'Planta de alimentos',
        id:4
    },
    {
        name:'Campo',
        id:5
    },

];


class IngresoForm extends Component {
    state = {
        value: '',
        factura:false,
        contacto_directo:true,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log(values);
                this.props.saveIngreso(values)
            }
        });
    };

    handleChange = e => {
        this.setState({
            factura: e.target.checked,
            })
        };

    handleChangeD = e => {
        this.setState({
            contacto_directo:e.target.checked
        })
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options_clients = this.props.clientes.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.client}</Option>);
        return (

            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label={"Razón Social"}
                    >
                        {getFieldDecorator('client', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                            props:{
                                placeholder:'Selecciona un Cliente',
                            }
                        })(


                            <Select  placeholder={"Selecciona un Cliente"}>
                                {options_clients}
                            </Select>
                        )}

                    </FormItem>


                    <FormItem>
                        {getFieldDecorator('contact_check', {
                            valuePropName: 'checked',
                            initialValue: true,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Checkbox
                                value={this.state.contacto_directo}
                                onChange={this.handleChangeD}
                            >
                                Contacto directo?
                            </Checkbox>
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('contact')(<Input disabled={this.state.contacto_directo}/>)}
                    </FormItem>


                    <FormItem
                        label={"Linea de negocio"}
                    >
                        {getFieldDecorator('business_line', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                            props:{
                                placeholder:'Linea de Negocio',
                            }
                        })(
                            <Select  placeholder={"Linea de Negocio"}>
                                {options}
                            </Select>
                        )}

                    </FormItem>

                    <FormItem
                        label="Monto"
                    >
                        {getFieldDecorator('total', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                style={{width:'100%'}}
                                step={0.01}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>

                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                        <FormItem>
                            {getFieldDecorator('sale_check', {
                                valuePropName: 'checked',
                                initialValue: false,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Checkbox
                                    value={this.state.factura}
                                    onChange={this.handleChange}
                                >
                                    Factura?
                                </Checkbox>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('no_scheck')(<Input disabled={!this.state.factura}/>)}
                        </FormItem>

                    </div>

                    <div style={{display:'flex',justifyContent:'flex-end'}}>

                        <FormItem >
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

const FormIngreso = Form.create()(IngresoForm);

IngresoForm = connect(mapStateToProps, mapDispatchToProps)(IngresoForm);
export default FormIngreso;