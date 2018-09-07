import React, {Component, Fragment} from 'react';
import {Button, Form, Input, Select, Upload, Icon} from "antd";

const Option = Select.Option;
const FormItem = Form.Item;


class FierrosForm extends Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                values['imagen'] = values.imagen.file.originFileObj
               if(values['tipo']=='original'){
                   this.props.saveFierroO(values)
               }else{
                   this.props.saveFierroN(values)
               }
               this.props.form.resetFields()
            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };

    render(){
        let {getFieldDecorator} = this.props.form
        return(
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Tipo">
                        {getFieldDecorator('tipo', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Select>
                                <Option value={"original"}>Fierro Original</Option>
                                <Option value={"nuevo"}>Fierro Nuevo</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="Código">
                        {getFieldDecorator('codigo', {
                            rules: [{
                                required: true, message: 'Completa!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Imágen"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('imagen', {
                                valuePropName: 'imagen',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="imagen" multiple={false}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>

                                    <p className="ant-upload-hint">Click o arrastra una imagen</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>


                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>Guardar</Button>
                    </FormItem>
                </Form>
            </Fragment>
        )
    }
}

const FierrosWForm = Form.create()(FierrosForm);

export default FierrosWForm;



