import React from 'react';
import { Form, Input, Button, Modal, Select, DatePicker, InputNumber } from 'antd';

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


const GastoForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, } = props;
        const{getFieldDecorator} = form;

        return(
            <Modal
                visible={visible}
                title={"Nueva Gasto"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >

                <Form onSubmit={onCreate} >
                    <div style={styles.form}>


                        <FormItem
                            label="Concepto"
                        >
                            {getFieldDecorator('concepto', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Monto"

                        >
                            {getFieldDecorator('monto', {
                                initialValue:0,
                                rules: [{
                                    required:true
                                }],
                            })(
                                <InputNumber
                                    style={{width:'100%'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>


                    </div>
                    <FormItem>
                        <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>

                </Form>

            </Modal>

        )
    }
);

export default GastoForm;