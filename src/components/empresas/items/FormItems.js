import React from 'react';
import { Form, Input, Button, Modal, Select, InputNumber } from 'antd';


const FormItem = Form.Item;
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


const FormItems = Form.create()(
    (props)=>{
        const{visible, onCancel, onCreate, form, bline, empresa, almacen, insumos, vacunas, onChangeSelect, selectChange} = props;
        const {getFieldDecorator, getFieldValue} = form;
        
        return(
            <Modal
                visible={visible}
                title={"Nuevo Almacén"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form >
                    <div style={styles.form}>
                        <div style={styles.formSection} >

                            <FormItem
                                label="Tipo"
                                hasFeedback
                                style={{width:'60%'}}
                            >
                                {getFieldDecorator('product_type', {
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <Select placeholder="Product Type" onChange={onChangeSelect}>
                                        <Option value="insumo">Insumo</Option>
                                        <Option value="vacuna">Vacuna</Option>
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="Cantidad"
                                style={{width:'30%', marginLeft:5}}
                            >
                                {getFieldDecorator('cantidad', {
                                    initialValue:0,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                })(
                                    <InputNumber
                                        min={0}
                                    />
                                )}
                            </FormItem>




                        </div>

                        <div style={styles.formSection}>

                        {selectChange === "insumo"
                            ?
                            <FormItem
                                label={"Tipo"}
                                style={{width:'60%'}}
                            >
                                {getFieldDecorator('insumo_id', {

                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                    props:{
                                        placeholder:'Selecciona un insumo',
                                    }
                                })(


                                    <Select  placeholder={"Selecciona un insumo"}>

                                        {insumos}
                                    </Select>
                                )}

                            </FormItem>
                            :""
                        }


                        {selectChange === "vacuna"
                            ?
                            <FormItem
                                label={"Tipo"}
                                style={{width:'60%'}}
                            >
                                {getFieldDecorator('vacuna_id', {

                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                    props:{
                                        placeholder:'Selecciona una vacuna',
                                    }
                                })(


                                    <Select  placeholder={"Selecciona una vacuna"}>

                                        {vacunas}
                                    </Select>
                                )}

                            </FormItem>
                            :""
                        }

                        <FormItem
                            label="Unidad"
                            style={{width:'30%', marginLeft:5}}
                        >
                            {getFieldDecorator('unity', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select style={{ width: 90 }}>
                                    <Option value="kg">kg</Option>
                                    <Option value="ml">ml</Option>
                                    <Option value="pieza">pieza</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>

                        <div style={styles.formSection}>



                        <FormItem
                            label="Costo Unitario"
                            style={{width:'40%'}}
                        >
                            {getFieldDecorator('costo_u', {
                                initialValue:0,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    min={0}
                                    style={{width:'150px'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Total"
                            style={{width:'40%'}}
                        >
                            {getFieldDecorator('total', {
                                initialValue:(getFieldValue('cantidad')*getFieldValue('costo_u')).toFixed(2),
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    disabled={true}
                                    style={{width:'150px'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        </div>

                        <FormItem
                            label="Nombre del almacén"
                        >
                            {form.getFieldDecorator('almacen_id', {
                                initialValue:almacen.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select disabled={true}>
                                    <Option key={almacen.id} value={almacen.id} >{almacen.name}</Option>
                                </Select>
                            )}
                        </FormItem>


                    </div>
                    <FormItem>
                        <Button type="primary" onClick={onCreate} size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>



                </Form>

            </Modal>

        )
    }
);

export default FormItems;