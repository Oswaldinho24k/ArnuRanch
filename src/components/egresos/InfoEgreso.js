import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message} from 'antd';
import {editEgreso} from "../../redux/actions/administracion/egresosActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoEgreso = ({form,editEgreso,id,editMode, handleEditMode, business_egreso, searchProvider, paid, purchase_check, no_check, options, proveedores, total, types, type, searchLine, lineHandle, linea, provider_egreso, concepto_purchase, compra_check, compra_egreso, searchCompra, compras}) => {
    console.log("COMPRAS", compras)

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {

            if (!err) {
                console.log(values);
                values['id']=id;
                editEgreso(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        handleEditMode();
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

                    {provider_egreso?
                        <FormItem
                            label={"Razón Social"}
                        >
                            {form.getFieldDecorator('provider_egreso_id',{
                                initialValue:provider_egreso.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Proveedor"}
                                    showSearch
                                    onSearch={searchProvider}
                                    filterOption={false}
                                >
                                    {proveedores.length >0? proveedores.map((a, key) => <Option key={key} value={a.id} >{a.provider}</Option>):<Option key={999999} disabled >No </Option>}
                                </Select>
                            )}
                        </FormItem>:
                        <FormItem
                            label={"Razón Social"}
                        >
                            {form.getFieldDecorator('provider_egreso.id',{
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Select
                                    disabled={!editMode}
                                    filterOption={false}
                                    showSearch
                                    onSearch={searchProvider}
                                    placeholder={"Proveedor"}>
                                    {proveedores.length >0? proveedores.map((a, key) => <Option key={key} value={a.id} >{a.provider}</Option>):<Option key={999999} disabled >No cliente</Option>}
                                </Select>
                            )}
                        </FormItem>}


                    {business_egreso?

                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {form.getFieldDecorator('business_egreso_id',{
                                initialValue:business_egreso.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Linea de Negocio"}
                                    showSearch
                                    onSearch={searchLine}
                                    filterOption={false}
                                >
                                    {
                                        options.length >0? options.map((a, key) => <Option key={key} value={a.id} >{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                    }

                                </Select>
                            )}</FormItem>:
                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {form.getFieldDecorator('business_egreso_id',{
                                initialValue:business_egreso.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Linea de Negocio"}
                                    showSearch
                                    onSearch={searchLine}
                                    filterOption={false}
                                >
                                    {
                                        options.length >0? options.map((a, key) => <Option key={key} value={a.id} >{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                    }

                                </Select>
                            )}


                        </FormItem>
                    }

                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem>
                            {form.getFieldDecorator('compra_check', {
                                valuePropName: 'checked',
                                initialValue: compra_check,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Checkbox
                                    disabled={!editMode}
                                >
                                    Compra?
                                </Checkbox>
                            )}
                        </FormItem>

                        {compra_egreso && compra_egreso !== null?

                                <FormItem
                                    style={{width:'200px'}}
                                >
                                    {form.getFieldDecorator('compra_egreso_id',{
                                        initialValue:compra_egreso.id,
                                        rules: [{
                                            required: true, message: 'Completa el campo!',
                                        }],
                                    })(
                                        <Select
                                            disabled={!editMode}
                                            placeholder={"Compra"}
                                            showSearch
                                            onSearch={searchCompra}
                                            filterOption={false}
                                        >
                                            {
                                                compras.length >0? compras.map((a, key) => <Option key={key} value={a.id} >{a.no_factura}</Option>):<Option key={999999} disabled >No encontrado</Option>
                                            }

                                        </Select>
                                    )}</FormItem>:
                                <FormItem
                                    style={{width:'200px'}}
                                >
                                    {form.getFieldDecorator('compra_egreso_id',{
                                        initialValue:compra_egreso.id,
                                        rules: [{
                                            required: true, message: 'Completa el campo!',
                                        }],
                                    })(
                                        <Select
                                            disabled={!editMode}
                                            placeholder={"Compra"}
                                            showSearch
                                            onSearch={searchCompra}
                                            filterOption={false}
                                        >
                                            {
                                                compras.length >0? compras.map((a, key) => <Option key={key} value={a.id} >{a.no_factura}</Option>):<Option key={999999} disabled >No encontrado</Option>
                                            }

                                        </Select>
                                    )}


                                </FormItem>


                        }
                    </div>

                    <FormItem
                        label="Concepto"
                    >
                        {form.getFieldDecorator('concepto_purchase', {
                            initialValue: concepto_purchase,
                            rules: [{
                                required: false, message: 'Completa el campo!',
                            }],
                        })(
                            <Input
                                disabled={!editMode}
                            />
                        )}
                    </FormItem>

                    {type?
                        <FormItem
                            label={"Tipo de egreso"}
                        >
                            {form.getFieldDecorator('type',{
                                initialValue:type,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Tipo de egreso"}>
                                    {types}
                                </Select>
                            )}
                        </FormItem>:
                        <FormItem
                            label={"Tipo de egreso"}
                        >
                            {form.getFieldDecorator('type',{
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Select
                                    disabled={!editMode}

                                    placeholder={"Tipo de egreso"}>
                                    {types}
                                </Select>
                            )}
                        </FormItem>}

                    <FormItem
                        label="Monto">
                        {form.getFieldDecorator('total', {
                            initialValue:total,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                disabled={!editMode}
                                step={0.01}
                                min={0}
                                style={{width:'100%'}}
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
                            {form.getFieldDecorator('no_check',{
                                initialValue:no_check,
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
const EgresoInfo = Form.create()(InfoEgreso);
export default EgresoInfo;
