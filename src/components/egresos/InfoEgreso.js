import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber} from 'antd';
import {editEgreso} from "../../redux/actions/egresosActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoEgreso = ({form,editEgreso,id,editMode, handleEditMode, business_line, provider, paid, purchase_check, no_check, options, proveedores, total}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id']=id;
                editEgreso(values)
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
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                    {proveedores?
                        <FormItem
                            label={"Proveedor"}
                        >
                            {form.getFieldDecorator('provider',{
                                initialValue:provider.id
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Proveedor"}>
                                    {proveedores}
                                </Select>
                            )}
                        </FormItem>:
                        <FormItem
                            label={"Proveedor"}
                        >
                            {form.getFieldDecorator('provider',{

                            })(
                                <Select
                                    disabled={!editMode}

                                    placeholder={"Proveeder"}>
                                    {proveedores}
                                </Select>
                            )}
                        </FormItem>}

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
                            {form.getFieldDecorator('purchase_check', {
                                valuePropName: 'checked',
                                initialValue: purchase_check,
                            })(
                                <Checkbox
                                    disabled={!editMode}
                                >
                                    Factura?
                                </Checkbox>
                            )}
                        </FormItem>

                        <FormItem>
                            {form.getFieldDecorator('no_check',{
                                initialValue:no_check
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
const EgresoInfo = Form.create()(InfoEgreso);
export default EgresoInfo;