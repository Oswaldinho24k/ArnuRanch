import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, DatePicker, Upload, InputNumber, Select} from 'antd';
import './detailAnimal.css';

const MonthPicker = DatePicker.MonthPicker;
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const opciones = [{
    name :'becerro',
    id: 1
},{
    name:'toro',
    id:3
},{
    name:'vaca',
    id:4
},{
    name:'vaquilla',
    id:5
}

];

class FormAnimal extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                if(!values.lote){
                    delete values.lote
                }
                this.props.saveAnimal(values);
                //this.props.form.resetFields()


            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options_lote = this.props.lotes.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.name}</Option>);
        return (
            <div className={"formulario"} style={{backgroundColor: 'white'}}>
                <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem
                            label="Arete Rancho"
                        >
                            {getFieldDecorator('arete_rancho', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Arete Siniga"
                        >
                            {getFieldDecorator('arete_siniga', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Fecha Registro"
                        >
                            {getFieldDecorator('fecha_entrada', config)(
                                <DatePicker />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Tipo"}
                            style={{width:'200px'}}
                        >
                            {getFieldDecorator('tipo_animal', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Selecciona un tipo',
                                }
                            })(


                                <Select  placeholder={"Selecciona un tipo"}>

                                    {options}
                                </Select>
                            )}

                        </FormItem>

                        <FormItem
                            label="Owner"
                        >
                            {getFieldDecorator('owner', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Factura Inicial"
                            style={{width:'200px'}}
                        >
                            {getFieldDecorator('ref_factura_original', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Peso Entrada"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('peso_entrada', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
                                    step={0.01}
                                    min={0}
                                    max={1000}
                                    formatter={value => `${value}kg`}
                                    parser={value => value.replace('kg', '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo Inicial"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('costo_inicial', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo Kilo"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('costo_kilo', {
                                initialValue:(getFieldValue('costo_inicial')/getFieldValue('peso_entrada')).toFixed(2),
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
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
                                    required: true, message: 'Completa el campo!',
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
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Lote"}
                            style={{width:'30%'}}
                        >
                            {getFieldDecorator('lote', {
                                props:{
                                    placeholder:'Selecciona un Lote',
                                }
                            })(
                                <Select  placeholder={"Selecciona un Lote"}>

                                    {options_lote}

                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Descripción"
                            style={{width:'30%'}}
                        >
                            {getFieldDecorator('descripcion', {

                            })(
                                <TextArea autosize />
                            )}
                        </FormItem>

                    </div>


                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label="Fierro Propietario"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('fierro_original', {
                                valuePropName: 'fierroOriginal',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" multiple={false}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>

                                    <p className="ant-upload-hint">Click o arrastra una imagen</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>
                    <FormItem
                        label="Fierro Nuevo"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('fierro_nuevo', {
                                valuePropName: 'fierroNuevo',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" multiple={false}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>

                                    <p className="ant-upload-hint">Click o arrastra una imagen</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>
                    </div>

                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
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



FormAnimal = connect(mapStateToProps, mapDispatchToProps)(FormAnimal);
const FormAnimals = Form.create()(FormAnimal);
export default FormAnimals;