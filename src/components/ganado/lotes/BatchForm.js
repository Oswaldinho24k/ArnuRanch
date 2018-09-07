import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button, Select } from 'antd';


const FormItem = Form.Item;


const Option = Select.Option;

/*const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};*/

class BatchForm extends Component {
    state = {
        value: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.saveLote(values)
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const {corrales} = this.props;
        let options_corral = corrales.filter(c=> c.lotes===null);

        options_corral = options_corral.map((a) => <Option value={parseInt(a.id,10)} key={a.id}>{a.no_corral}</Option>);
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

                                props:{
                                    placeholder:'Selecciona un Corral',
                                    defaultValue: 'Home'
                                }
                            })(


                                <Select  placeholder={"Selecciona un Corral"}>

                                    {options_corral}
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