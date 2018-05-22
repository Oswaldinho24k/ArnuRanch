import React from 'react';
import { Form, Input, Button, Modal } from 'antd';


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


const BLineForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form} = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Nueva Bussines Line"}
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
                            label="Nombre de la Bussines Line"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
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

export default BLineForm;