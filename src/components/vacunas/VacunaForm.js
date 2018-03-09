import React from 'react';
import { Form, Input, Button, Modal, InputNumber, Select } from 'antd';

const Option = Select.Option;


const FormItem = Form.Item;

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




const VacunaForm = Form.create()(({visible, onCancel, onCreate, form,})=>{

        const {getFieldDecorator} = form;
        const selectAfter = (
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

        );

        return(
            <Modal
                visible={visible}
                title={"Nueva Vacuna"}
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
                            label="Nombre de Fórmula"
                        >
                            {getFieldDecorator('vaccine', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Nombre de Fórmula"} />
                            )}
                        </FormItem>


                        <FormItem
                            label="Tipo de Fórmula"
                        >
                            {getFieldDecorator('typeofv', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={" Tipo de Fórmula"} />
                            )}
                        </FormItem>

                        <div style={styles.formSection}>


                        <FormItem
                            label="Dosis Recomendada"
                            style={{width:'100%'}}
                        >
                            {getFieldDecorator('dose', {

                            })(

                                <Input

                                    addonAfter={selectAfter}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Contenido (ml)"
                            style={{width:'50%'}}
                        >
                            {getFieldDecorator('content', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    min={0}
                                    style={{width:'90%'}}
                                    step={0.01}
                                    formatter={value => `${value}ml`}
                                    parser={value => value.replace('ml', '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Concentración (ml)"
                            style={{width:'50%'}}
                        >
                            {getFieldDecorator('concentration', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    min={0}
                                    style={{width:'90%'}}
                                    step={0.01}
                                    formatter={value => `${value}ml`}
                                    parser={value => value.replace('ml', '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo por envase"
                            style={{width:'50%'}}
                        >
                            {getFieldDecorator('cost', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <InputNumber
                                    min={0}
                                    style={{width:'90%'}}
                                    step={0.01}
                                    formatter={value => `${value}$`}
                                    parser={value => value.replace('$', '')}
                                />
                            )}
                        </FormItem>
                    </div>




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

export default VacunaForm;