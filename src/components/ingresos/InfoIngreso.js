import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message} from 'antd';
import {editIngreso} from "../../redux/actions/administracion/ingresosActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoIngreso = ({form,editIngreso,id,editMode, handleEditMode, business_line, client, paid, sale_check, no_scheck, options, clientes, total, contact_check, contact, searchLine, lineHandle, linea, concepto}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(linea !== ''){
                values['business_line']=linea;
            }else{
                values['business_line']=business_line;
            }

            if (!err) {
                console.log(values);
                values['id']=id;
                editIngreso(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        handleEditMode()
                        message.success('Guardado con éxito');
                    }).catch(e=>{
                    console.log(e)
                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };

    return (
        <Fragment>
            <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                    {clientes?
                        <FormItem
                            label={"Razón Social"}
                        >
                            {form.getFieldDecorator('client',{
                                initialValue:client.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Cliente"}>
                                    {clientes}
                                </Select>
                            )}
                        </FormItem>:
                        <FormItem
                            label={"Razón Social"}
                        >
                            {form.getFieldDecorator('client',{
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Select
                                    disabled={!editMode}

                                    placeholder={"Cliente"}>
                                    {clientes}
                                </Select>
                            )}
                        </FormItem>}

                    {business_line?

                        <FormItem
                            label={"Linea de negocio"}
                            hasFeedback
                        >
                            <Select
                                disabled={!editMode}
                                defaultValue={business_line}
                                placeholder={"Linea de Negocio"}
                                mode={'combobox'}
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.name} >{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>


                        </FormItem>:
                        <FormItem
                            label={"Linea de negocio"}
                            hasFeedback
                        >
                            <Select
                                disabled={!editMode}
                                placeholder={"Linea de Negocio"}
                                mode={'combobox'}
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.name} >{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>


                        </FormItem>
                    }

                    <FormItem
                        label="Concepto"
                    >
                        {form.getFieldDecorator('concepto', {
                            initialValue: concepto,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input
                                disabled={!editMode}
                             />
                        )}
                    </FormItem>

                    <FormItem
                        label="Monto">
                        {form.getFieldDecorator('total', {
                            initialValue:total,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                min={0}
                                disabled={!editMode}
                                style={{width:'100%'}}
                                step={0.01}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>

                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem>
                            {form.getFieldDecorator('sale_check', {
                                valuePropName: 'checked',
                                initialValue: sale_check,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Checkbox
                                    disabled={!editMode}
                                >
                                    Factura?
                                </Checkbox>
                            )}
                        </FormItem>

                        <FormItem>
                            {form.getFieldDecorator('no_scheck',{
                                initialValue:no_scheck,
                            })(
                                <Input
                                    disabled={!editMode}
                                />
                            )}
                        </FormItem>

                    </div>

                    <FormItem>
                        {form.getFieldDecorator('paid', {
                            valuePropName: 'checked',
                            initialValue: paid,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Checkbox
                                disabled={!editMode}
                            >
                                Pagado
                            </Checkbox>
                        )}
                    </FormItem>


                </div>

                <FormItem>
                    {editMode ?
                        <Button
                            htmlType="submit"
                            size="large"
                            type={"primary"}
                            style={{width: '100%'}}
                        >
                            Guardar
                        </Button> : ""
                    }
                </FormItem>
            </Form>
            {!editMode ?
                <Button
                    htmlType={"button"}
                    onClick={handleEditMode}
                    style={{width: '90%', display:'flex', justifyContent:'center', margin:'0 auto'}}
                >
                    Editar
                </Button> : ""
            }
        </Fragment>
    )
};
const IngresoInfo = Form.create()(InfoIngreso);
export default IngresoInfo;