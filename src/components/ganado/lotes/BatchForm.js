import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, Row, Col, DatePicker, Upload, Checkbox, InputNumber, Select } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const opciones = [{
    name :'Corral1',
    id: 12
},{
    name:'Corral2',
    id:23
}
];

class BatchForm extends Component {
    state = {
        value: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                //this.props.saveAnimal(values)

            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        let options = opciones.map((a) => <Option key={a.id}>{a.name}</Option>);
        return (

                <Form onSubmit={this.handleSubmit} >
                    <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>
                        <FormItem
                            label="Nombre"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Corral"}
                        >
                            {getFieldDecorator('corral', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Selecciona un Corral',
                                    defaultValue: 'Home'
                                }
                            })(


                                <Select  placeholder={"Selecciona un Corral"}>
                                    {options}
                                </Select>
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

const FormBatch = Form.create()(BatchForm);

BatchForm = connect(mapStateToProps, mapDispatchToProps)(BatchForm);
export default FormBatch;