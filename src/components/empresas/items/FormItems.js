import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';


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
        const{visible, onCancel, onCreate, form, bline, empresa, almacen} = props;
        const {getFieldDecorator} = form;

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

                        <FormItem
                            label="Cantidad"
                        >
                            {getFieldDecorator('cantidad', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Cantidad item"} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Tipo"
                        >
                            {getFieldDecorator('product_type', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Product Type"} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Unidad"
                        >
                            {getFieldDecorator('unity', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Unidad item"} />
                            )}
                        </FormItem>


                        <FormItem
                            label="Costo Unitario"
                        >
                            {getFieldDecorator('costo_u', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Costo unitario"} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Total"
                        >
                            {getFieldDecorator('total', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Total"} />
                            )}
                        </FormItem>

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