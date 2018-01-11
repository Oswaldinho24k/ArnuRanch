import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, Row, Col, DatePicker, Upload, Checkbox, InputNumber } from 'antd';
import './detailAnimal.css';

const MonthPicker = DatePicker.MonthPicker;
const FormItem = Form.Item;
const TextArea = Input;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

class FormAnimal extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)

            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {handleText, data} = this.props;
        return (
            <div className={"formulario"} style={{backgroundColor: 'white'}}>
                <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem
                            label="Fecha Registro"
                        >
                            {getFieldDecorator('fecha-registro', config)(
                                <DatePicker />
                            )}
                        </FormItem>

                        <FormItem
                            label="Owner"
                        >
                            {getFieldDecorator('owner', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Factura"
                        >
                            {getFieldDecorator('factura', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Peso Entrada"
                        >
                            {getFieldDecorator('peso-entrada', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <InputNumber
                                    step={0.01}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}kg`}
                                    parser={value => value.replace('kg', '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Arete Siniga"
                        >
                            {getFieldDecorator('Arete Siniga', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Arete Rancho"
                        >
                            {getFieldDecorator('Arete Rancho', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo Inicial"
                        >
                            {getFieldDecorator('costo-inicial', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <InputNumber
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo Kilo"
                        >
                            {getFieldDecorator('costo-kilo', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <InputNumber
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Raza"
                        >
                            {getFieldDecorator('raza', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Color"
                        >
                            {getFieldDecorator('color', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Lote"
                        >
                            {getFieldDecorator('lote', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Cuarto"
                        >
                            {getFieldDecorator('cuarto', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <InputNumber min={1} max={100} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Año"
                        >
                            {getFieldDecorator('ano', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <Input type={"number"}/>
                            )}
                        </FormItem>

                        <FormItem
                            label="Mes"
                        >
                            {getFieldDecorator('mes', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <InputNumber min={1} max={12} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Semana"
                        >
                            {getFieldDecorator('numero-semana', {
                                rules: [{
                                    required: true, message: 'Escribe prro!',
                                }],
                            })(
                                <InputNumber min={1} max={5} />
                            )}
                        </FormItem>

                    </div>

                    <FormItem
                        label="Comentarios"
                    >
                        {getFieldDecorator('comentarios', {
                            rules: [{
                                required: true, message: 'Escribe prro!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Descripción"
                    >
                        {getFieldDecorator('descripcion', {
                            rules: [{
                                required: true, message: 'Escribe prro!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Fierro Original"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('fierro-original', {
                                valuePropName: 'fierroOriginal',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>

                    <FormItem
                        label="Fierro Nuevo"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('fierro-nuevo', {
                                valuePropName: 'fierroNuevo',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = () => ({

});

const FormAnimals = Form.create()(FormAnimal);

FormAnimal = connect(mapStateToProps, mapDispatchToProps)(FormAnimal);
export default FormAnimals;