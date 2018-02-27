import React from 'react';
import { Form, Input, Button, Modal, InputNumber } from 'antd';


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


const VacunaForm = Form.create()(
    (props)=>{
        const{visible, onCancel, onCreate, form,} = props;
        const {getFieldDecorator} = form;

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
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={" Tipo de Fórmula"} />
                            )}
                        </FormItem>

                        <div style={styles.formSection}>


                        <FormItem
                            label="Dosis ml"
                            style={{width:'50%'}}
                        >
                            {getFieldDecorator('dose', {
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
                            label="Contenido ml"
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
                            label="Concentración ml"
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
                            label="Costo"
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