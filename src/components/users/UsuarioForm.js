import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';


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


const UsuarioForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, options_sections, options_permissions, user ,canEdit} = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Nuevo Usuario"}
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
                            label="Nombre usuario"
                        >
                            {getFieldDecorator('first_name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                initialValue:''
                            })(
                                <Input disabled={canEdit}/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Email del usuario"
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                initialValue:user.email
                            })(
                                <Input disabled={canEdit}/>
                            )}
                        </FormItem>
                       

                        <FormItem
                            label="Contraseña"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                initialValue:canEdit?'********':''
                            })(
                                <Input type={'password'} disabled={canEdit}/>
                            )}
                        </FormItem>

                        <FormItem
                            label={"Sección de Trabajo"}
                        >
                            {getFieldDecorator('section', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                           //initialValue:user.is_staff?'super':user.profile?user.profile.admin?'admin':'ganado':null

                            })(
                                <Select mode="multiple" placeholder={"Selecciona un Permiso"} disabled={canEdit} >
                                    {options_sections}
                                </Select>
                            )}

                        </FormItem>
                        <FormItem
                            label={"Permisos de Usuario"}
                        >
                            {getFieldDecorator('permiso', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                           //initialValue:user.is_staff?'super':user.profile?user.profile.admin?'admin':'ganado':null

                            })(
                                <Select mode="multiple" placeholder={"Selecciona un Permiso"} disabled={canEdit} >
                                    {options_permissions}
                                </Select>
                            )}

                        </FormItem>


                    </div>
                    {!canEdit?<FormItem>
                        <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>:''}
                    {/*canEdit?<Button type="primary" size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>Editar</Button >:''*/}



                </Form>

            </Modal>

        )
    }
);

export default UsuarioForm;
