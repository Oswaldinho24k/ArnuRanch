import React from 'react';
import {Form, InputNumber, Select, Button, Input} from 'antd';
import MainLoader from "../../common/Main Loader";
import {connect} from "react-redux";
const Option = Select.Option;

const FormItem = Form.Item;


class FormGasto extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                //values['cantidad']=values['cantidad'].toFixed(2);
                //values['costo']=values['costo'].toFixed(2);
                this.props.saveGasto(values);
                this.props.form.resetFields()
            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };


    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let {fetched, vacunas, formulas} = this.props;
        let tipo = getFieldValue('tipo');
        if(!fetched) return <MainLoader/>;

        let vacunasOptions = vacunas.map((v, key)=>(<Option value={parseInt(v.id)} key={key}>{v.vaccine}</Option>));
        let formulasOptions = formulas.map((f, key)=>(<Option value={parseInt(f.id)} key={key}>{f.name}</Option>));

        return(

            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Tipo">
                    {getFieldDecorator('tipo', {
                        rules: [{
                            required: true, message: 'Completa!',
                        }],
                    })(
                        <Select>
                            <Option value="Alimento">Alimento</Option>
                            <Option value="Vacuna">Vacuna</Option>

                        </Select>
                    )}
                </FormItem>

                {tipo==='Alimento'?
                    <div>
                        <FormItem label={'Fórmula'}>
                            {getFieldDecorator('formula', {
                                rules: [{
                                    required: true, message: 'Rellena el campo!',
                                }],
                            })(
                                <Select>
                                    {formulasOptions}
                                </Select>
                            )}

                        </FormItem>
                        <FormItem  label="Cantidad">
                            {getFieldDecorator('cantidad', {
                                rules: [{
                                    required: true, message: 'Completa!',
                                }],
                            })(
                                <Input
                                    addonAfter={<FormItem style={{height:5, padding:0}}>
                                        {getFieldDecorator('unity',{
                                            initialValue:'Kg'
                                        })(
                                            <Select  style={{ width: 100 }}>
                                                <Option value="Kg">g</Option>
                                            </Select>
                                        )}
                                    </FormItem>}
                                />
                            )}
                        </FormItem>
                    </div>
                    :tipo==='Vacuna'?
                        <div>
                            <FormItem label={'Vacuna'}>
                                {getFieldDecorator('vacuna', {
                                    rules: [{
                                        required: true, message: 'Rellena el campo!',
                                    }],
                                })(
                                   <Select>
                                       {vacunasOptions}
                                   </Select>
                                )}

                            </FormItem>
                            <FormItem  label="Cantidad">
                                {getFieldDecorator('cantidad', {
                                    rules: [{
                                        required: true, message: 'Completa!',
                                    }],
                                })(
                                    <Input
                                        addonAfter={
                                            <FormItem style={{height:5, padding:0}}>
                                                {getFieldDecorator('unity',{
                                                    initialValue:'ml'
                                                })(
                                                    <Select  style={{ width: 100 }}>
                                                        <Option value="ml">ml</Option>
                                                        <Option value="unidad">unidad</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        }
                                    />
                                )}
                            </FormItem>
                        </div>:''}

                <FormItem  label="Monto">
                    {getFieldDecorator('costo', {
                        rules: [{
                            required: true, message: 'Completa!',
                        }],
                    })(
                        <InputNumber
                            step={0.01}
                            min={0}
                            style={{width:'100%'}}
                            formatter={value => `$${value}`}
                            parser={value => value.replace('$', '')}
                        />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </FormItem>
            </Form>
        )
    }
}
FormGasto = Form.create()(FormGasto);

function mapStateToProps(state, ownProps) {
    return {
        vacunas:state.vacunas.list,
        formulas:state.formulas.list,
        fetched:state.vacunas.list!==undefined && state.formulas.list!==undefined
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

FormGasto = connect(mapStateToProps, mapDispatchToProps)(FormGasto);
export default FormGasto
