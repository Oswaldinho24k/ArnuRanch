import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button,  InputNumber } from 'antd';


const FormItem = Form.Item;

class CorralForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.saveCorral(values)
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label="No. Corral"
                    >
                        {getFieldDecorator('no_corral', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber />
                        )}
                    </FormItem>

                    <FormItem
                        label="No. Serial"
                    >
                        {getFieldDecorator('numero_serial', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label={"Comentarios"}
                    >
                        {getFieldDecorator('comentarios', {
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

const FormCorral = Form.create()(CorralForm);

CorralForm = connect(mapStateToProps, mapDispatchToProps)(CorralForm);
export default FormCorral;