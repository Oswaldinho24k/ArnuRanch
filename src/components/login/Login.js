import React, {Component} from 'react';
import './LogStyles.css';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" >
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Ingresa tú nombre de usuario!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" size="large" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Ingresa tú contraseña!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" size="large" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button ant-btn-primary" size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd'}}>
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const Log = Form.create()(Login);

export default Log;
