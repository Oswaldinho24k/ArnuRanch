import React from "react";
import {Button, DatePicker,Form, Input, InputNumber, Modal, Select} from "antd";
import moment from 'moment'

const Option = Select.Option
const FormItem = Form.Item;


const dateFormat = 'YYYY/MM/DD';

class ReciboForm extends React.Component{
    submit=(e)=>{
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            console.log(values)
            let date = moment(values.fecha).toDate()

            values['fecha'] = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            console.log(values)
            this.props.handleSubmit(values)
            this.props.form.resetFields()
        })
    }
    render(){
        const {form} = this.props
        return(
            <Form onSubmit={this.submit}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'0 auto', width:'100%'}}>
                    <FormItem
                        label="Fecha "
                    >
                        {form.getFieldDecorator('fecha', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <DatePicker/>

                        )}
                    </FormItem>
                    <FormItem
                        label="Capital "
                    >
                        {form.getFieldDecorator('capital', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input/>

                        )}
                    </FormItem>
                    <FormItem
                        label="Saldo "
                    >
                        {form.getFieldDecorator('saldo', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input/>

                        )}
                    </FormItem>
                    <FormItem
                        label="Intereses"
                    >
                        {form.getFieldDecorator('intereses', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input/>

                        )}
                    </FormItem>
                    <FormItem >
                        <Button type="primary" shape="circle" icon="plus" size='large'  htmlType={'submit'} style={{marginLeft:10}}/>
                    </FormItem>
                </div>
            </Form>
        )
    }

}

const ReciboF = Form.create()(ReciboForm)
export default ReciboF;