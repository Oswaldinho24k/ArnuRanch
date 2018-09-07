import React from 'react';
import { Form, Input, Button, Select, InputNumber, Checkbox, Modal,DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
//const TextArea = Input;
const Option = Select.Option;

const styles = {
    form:{
        display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap'

    },
    formSection:{
        display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'
    },
    sectionCheck:{
        display:'flex',justifyContent:'flex-end', flexWrap:'wrap'
    },
    buttonSave:{
        borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'
    }
};

const FormIngreso = Form.create()(
    (props) => {
        const{searchEmpresas,options_empresas,saveCompany,visible, venta, onCancel, onCreate, form, options_clientes, options, handleChange, factura, searchLine, cuentas, searchCuenta, cuentaHandle, saveLine, searchCliente, saveClient, saveReceivable,   }=props;
        const {getFieldDecorator} = form;

        return(
            <Modal
                visible={visible}
                title={"Nuevo Ingreso"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form style={{overflow:'auto', maxHeight:'600px'}} >
                    <div style={styles.form}>

                       

                         <FormItem
                            label={"Razón Social"}
                            hasFeedback>
                            {getFieldDecorator('empresa_id', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Select
                                    placeholder={"Razón Social de Empresa"}
                                    showSearch
                                    onSearch={searchEmpresas}
                                    filterOption={false}
                                >
                                    {
                                        options_empresas.length >0? options_empresas.map((a, key) => <Option key={key} value={a.company} ><div onClick={()=>saveCompany(a.id)}><span>{a.company}</span></div></Option>):<Option key={999999} disabled >No encontrado</Option>
                                    }

                                </Select>
                            )}
                        </FormItem>


                        <FormItem
                            label={"Linea de negocio"}
                            hasFeedback
                        >
                            {getFieldDecorator('business_line_id', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                            <Select
                                placeholder={"Linea de Negocio"}
                                showSearch
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.name} ><div onClick={()=>saveLine(a.id)}><span>{a.name}</span></div></Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="Fecha de venta"
                        >
                            {getFieldDecorator('sale_date', {
                                initialValue:moment( new Date(), 'YYYY-MM-DD'),
                                rules: [{ type: 'object', required: false, message: 'Selecciona una fecha válida!' }],
                            })(
                                <DatePicker style={{width:'100%'}} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Concepto"
                        >
                            {getFieldDecorator('concepto', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Input />
                            )}
                        </FormItem>


                        <FormItem
                            label="Monto"
                        >
                            {getFieldDecorator('total', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    min={0}
                                    style={{width:'100%'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label={"No. Cuenta"}
                            hasFeedback
                        >
                            {getFieldDecorator('receivable_id', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                },
                                ],
                            })(
                            <Select
                                placeholder={"No. Cuenta"}
                                showSearch
                                onChange={cuentaHandle}
                                onSearch={searchCuenta}
                                filterOption={false}
                            >
                                {
                                    cuentas.length >0? cuentas.map((a, key) => <Option key={key} value={a.cuenta} ><div onClick={()=>saveReceivable(a.id)}><span>{a.cuenta}</span></div></Option>):<Option key={999999} disabled >No encontrado</Option>
                                }

                            </Select>
                            )}
                        </FormItem>

                        <div style={styles.formSection}>
                            <FormItem>
                                {getFieldDecorator('sale_check', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox
                                        value={factura}
                                        onChange={handleChange}
                                    >
                                        Factura?
                                    </Checkbox>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('no_scheck', {initialValue: ""})(<Input disabled={!factura}/>)}
                            </FormItem>

                        </div>
                        <div>
                            <FormItem>
                                {getFieldDecorator('is_sale', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox
                                        value={venta}
                                        onChange={handleChange}
                                    >
                                        Venta?
                                    </Checkbox>
                                )}
                            </FormItem>

                            {venta?
                             <div>
                             <FormItem
                                 label={"Razón Social Cliente"}
                                 hasFeedback
                             >
                                 {getFieldDecorator('client_id', {
                                     rules: [{
                                         required: false, message: 'Completa el campo!',
                                     },
                                     ],
                                 })(
                                 <Select
                                     placeholder={"Razón Social de Cliente"}
                                     showSearch
                                 onSearch={searchCliente}
                                 filterOption={false}
                             >
                                 {
                                     options_clientes.length >0? options_clientes.map((a, key) => <Option key={key} value={a.client} ><div onClick={()=>saveClient(a.id)}><span>{a.client}</span></div></Option>):<Option key={999999} disabled >No encontrado</Option>
                                 }

                             </Select>
                             )}
                         </FormItem>
                       



                        <FormItem
                            label="Cantidad"
                        >
                            {getFieldDecorator('cantidad', {
                                initialValue:0,
                                rules: [{  required: false, message: 'Complete el campo!' }],
                            })(
                             <Input addonAfter={
                                 
                                     <FormItem style={{height:5, padding:0}}>
                                         {getFieldDecorator('unidad',{
                                             initialValue:'ml'
                                         })(
                                             <Select  style={{ width: 100 }}>
                                                 <Option value="ml">ml</Option>
                                                 <Option value="l">L</Option>
                                                 <Option value="kg">Kg</Option>
                                                 <Option value="g">g</Option>
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
                            {getFieldDecorator('comment', {
                                rules: [{
                                    required: false, message: 'Completa el campo!',
                                },
                                ],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </div>:''
                    }

                            {/* <FormItem>
                                {getFieldDecorator('no_seller_check', {initialValue: false})(
                                   <div>

                                           
                                       
                                   </div>

                                )}
                            </FormItem> */}

                        </div>

                        <div style={styles.sectionCheck}>

                            <FormItem >
                                {getFieldDecorator('paid', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Checkbox>Cobrado</Checkbox>
                                )}
                            </FormItem>


                        </div>
                    </div>
                    <FormItem>
                        <Button type="primary" onClick={onCreate} size="large" style={styles.buttonSave}>
                            Guardar
                        </Button>
                    </FormItem>

                </Form>

            </Modal>

        )
    }
);
export default FormIngreso;