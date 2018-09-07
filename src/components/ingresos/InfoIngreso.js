import React, {Fragment} from 'react';
import {Form, Input,DatePicker, Select, Button, Checkbox, InputNumber, message} from 'antd';
import {editIngreso} from "../../redux/actions/administracion/ingresosActions";
import moment from 'moment'

const Option = Select.Option;
const FormItem = Form.Item;


const InfoIngreso = ({form,editIngreso,id,editMode, handleEditMode, business_line, cuentas, client, paid, sale_check, no_scheck, options, clientes, total, contact_check, contact, searchLine, lineHandle, linea, concepto, receivable, cuentaHandle, searchCuenta, clientHandle, searchClient, saveClient, stateClient, saveBline, stateBline, saveCuentas, stateCuentas, empresa, saveCompany, venta , companies, is_sale, cantidad, unidad, comment, sale_date, stateCompany  }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {

            if (!err) {

                values['receivable_id']=stateCuentas !==null ? stateCuentas: receivable.id ;
                values['business_line_id']=stateBline !== null ? stateBline: business_line.id;
                values['empresa_id']=stateCompany !== null ? stateCompany: empresa.id;
                if( values['client_id']){
                    values['client_id']=stateClient !== null?stateClient:client.id;
                }else {
                    delete  values['client_id']
                }

                values['id']=id;
                console.log("ENVIADO", values)
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


                        <FormItem
                            label={"Razón Social"}
                            hasFeedback>
                            {form.getFieldDecorator('empresa_id', {
                                initialValue:empresa?empresa.company:'',
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Select
                                    placeholder={"Razón Social de Empresa"}
                                    showSearch
                                    disabled={!editMode}
                                    filterOption={false}
                                >
                                    {
                                        companies?companies.length >0? companies.map((a, key) => <Option key={key} value={a.company} ><div onClick={()=>saveCompany(a.id)}><span>{a.company}</span></div></Option>):<Option key={999999} disabled >No encontrado</Option>:''
                                    }

                                </Select>
                            )}
                        </FormItem>
                       

                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {form.getFieldDecorator('business_line_id',{
                                initialValue:business_line ? business_line.name:'',
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                            <Select
                                disabled={!editMode}
                                placeholder={"Linea de Negocio"}
                                showSearch
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.name} ><div onClick={()=>saveBline(a.id)}><span>{a.name}</span></div></Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>
                            )}

                        </FormItem>
                    <FormItem
                        label="Fecha de venta"
                    >
                        {form.getFieldDecorator('sale_date', {
                            initialValue:moment(sale_date),
                            rules: [{ type: 'object', required: false, message: 'Selecciona una fecha válida!' }],
                        })(
                            <DatePicker style={{width:'100%'}}  disabled={!editMode}/>
                        )}
                    </FormItem>

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


                        <FormItem
                            label={"No. Cuenta"}
                        >
                            {form.getFieldDecorator('receivable_id',{
                                initialValue:receivable?receivable.cuenta:'',
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                            <Select
                                disabled={!editMode}
                                placeholder={"No. Cuenta"}
                                showSearch
                                onChange={cuentaHandle}
                                onSearch={searchCuenta}
                                filterOption={false}
                            >
                                {
                                    cuentas.length >0? cuentas.map((a, key) => <Option key={key} value={a.cuenta} ><div onClick={()=>saveCuentas(a.id)}><span>{a.cuenta}</span></div></Option>):<Option key={999999} disabled >No encontrado</Option>
                                }

                            </Select>
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
                    <div>
                            <FormItem>
                                {form.getFieldDecorator('is_sale', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox
                                        value={venta}
                                        disabled={!editMode}
                                    >
                                        Venta?
                                    </Checkbox>
                                )}
                            </FormItem>


                             <div>
                           <FormItem
                            label={"Razón Social del Cliente"}
                        >
                            {form.getFieldDecorator('client_id',{
                                initialValue:client?client.client:'',
                                rules: [{
                                    required: false, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Cliente"}
                                    showSearch
                                    onChange={clientHandle}
                                    onSearch={searchClient}
                                    filterOption={false}
                                >
                                    {clientes.length >0? clientes.map((a, key) => <Option key={key} value={a.client} ><div onClick={()=>saveClient(a.id)}><span>{a.client}</span></div></Option>):<Option key={999999} disabled >No </Option>}
                                </Select>
                            )}
                        </FormItem>
                       



                        <FormItem
                            label="Cantidad"
                        >
                            {form.getFieldDecorator('cantidad', {
                                initialValue:cantidad,
                                rules: [{  required: false, message: 'Complete el campo!' }],
                            })(
                             <Input 
                                disabled={!editMode}
                                addonAfter={
                                 
                                     <FormItem style={{height:5, padding:0}}>
                                         {form.getFieldDecorator('unidad',{
                                             initialValue:unidad
                                         })(
                                             <Select  style={{ width: 100 }}  disabled={!editMode}>
                                                 <Option value="ml">ml</Option>
                                                 <Option value="ml">L</Option>
                                                 <Option value="ml">Kg</Option>
                                                 <Option value="ml">g</Option>
                                                 <Option value="unidad">unidad</Option>
                                             </Select>
                                         )}
                                     </FormItem>
                             }/>
                            )}
                        </FormItem>
                                                                     
                        <FormItem
                            label="Comentarios"
                        >
                            {form.getFieldDecorator('comment', {
                                initialValue:comment,
                                rules: [{
                                    required: false, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Input  disabled={!editMode} />
                            )}
                        </FormItem>
                    </div>:


                            {/* <FormItem>
                                {getFieldDecorator('no_seller_check', {initialValue: false})(
                                   <div>

                                           
                                       
                                   </div>

                                )}
                            </FormItem> */}

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