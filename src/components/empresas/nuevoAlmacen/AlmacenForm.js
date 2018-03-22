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


const AlmacenForm = Form.create()(
    (props)=>{
        const{visible, onCancel, onCreate, form, bline, empresa} = props;
        console.log(empresa)
        const {getFieldDecorator} = form;

        /*let datos = [empresa.line_comp[this.state.key]];
        let almacenes = datos.map(a=> a.almacenes);
        let info = almacenes[0];*/


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
                            label="Nombre del almacén"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Nombre del almacén"} />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Linea de negocio"}
                        >

                            {form.getFieldDecorator('bline',{
                                initialValue:bline.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select disabled={true}>
                                    <Option key={bline.id} value={bline.id} >{bline.name}</Option>
                                </Select>

                            )}

                        </FormItem>

                        <FormItem
                            label={"Empresa"}
                        >

                            {form.getFieldDecorator('company',{
                                initialValue:empresa.id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select disabled={true}>
                                    <Option key={empresa.id} value={empresa.id} >{empresa.company}</Option>
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

export default AlmacenForm;