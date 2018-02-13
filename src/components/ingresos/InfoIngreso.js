import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber} from 'antd';
import {editIngreso} from "../../redux/actions/ingresosActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoIngreso = ({form,editIngreso,id,editMode, handleEditMode, business_line, client, paid, sale_check, no_scheck, options, clientes, total, contact_check, contact}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id']=id;
                editIngreso(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        handleEditMode()
                    }).catch(e=>{
                    console.log(e)
                })
            }
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
                                initialValue:client.id
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

                            })(
                                <Select
                                    disabled={!editMode}

                                    placeholder={"Cliente"}>
                                    {clientes}
                                </Select>
                            )}
                        </FormItem>}

                    <FormItem>
                        {form.getFieldDecorator('contact_check', {
                            valuePropName: 'checked',
                            initialValue: contact_check,
                        })(
                            <Checkbox
                                disabled={!editMode}
                            >
                                Contacto directo?
                            </Checkbox>
                        )}
                    </FormItem>

                    <FormItem>
                        {form.getFieldDecorator('contact',{
                            initialValue:contact
                        })(
                            <Input
                                disabled={!editMode}
                            />
                        )}
                    </FormItem>


                    {business_line?
                        <FormItem
                            label={"Linea de negocio"}
                            >
                            {form.getFieldDecorator('business_line',{
                                initialValue:business_line
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Linea de negocio"}>
                                    {options}
                                </Select>
                            )}
                        </FormItem>:
                        <FormItem
                            label={"Linea de negocio"}
                            >
                            {form.getFieldDecorator('business_line',{

                            })(
                                <Select
                                    disabled={!editMode}

                                    placeholder={"Linea de negocio"}>
                                    {options}
                                </Select>
                            )}
                        </FormItem>}

                    <FormItem
                        label="Monto">
                        {form.getFieldDecorator('total', {
                            initialValue:total
                        })(
                            <InputNumber
                                disabled={!editMode}
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
                                initialValue:no_scheck
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