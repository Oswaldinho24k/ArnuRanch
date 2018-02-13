import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button, } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

class ClienteForm extends Component {
    state = {
        value: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.saveCliente(values);

            }
        });
    };

    checkRfc = (rule, value, callback) => {
        const form = this.props.form;
        if (value.length <13) {
            callback('Verifica el RFC ingresado');
        } else {
            callback();
        }
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label="Nombre del Cliente"
                    >
                        {getFieldDecorator('client', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="RFC del Cliente"
                    >
                        {getFieldDecorator('rfc', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            },
                                {validator: this.checkRfc}
                            ],
                        })(
                            <Input maxLength={"13"} />
                        )}
                    </FormItem>


                    <FormItem
                        label="Dirección"
                    >
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Correo electrónico"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'No es una dirección de correo válida!',
                            }, {
                                required: true, message: 'Ingresa un E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {getFieldDecorator('phone_number', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
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

const FormCliente = Form.create()(ClienteForm);

ClienteForm = connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
export default FormCliente;