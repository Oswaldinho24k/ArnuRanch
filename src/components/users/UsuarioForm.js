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
        console.log(user)
        const{getFieldDecorator} = form;
        const {profile} = user
        let theKeys = []
        if(profile){
            let sectionKeys = Object.keys(profile)

            for(let key of sectionKeys){
                if(profile[key])theKeys.push(key)
            }

        }

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
                                initialValue:user.first_name?user.first_name:user.username
                            })(
                                <Input />
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
                                <Input />
                            )}
                        </FormItem>
                       

                        <FormItem
                            label="Contraseña"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                initialValue:user.password?user.password:''
                            })(
                                <Input type={'password'} />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Sección de Trabajo"}
                        >
                            {getFieldDecorator('section', {                                                                
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            initialValue:theKeys
                                
                            })(
                                <Select mode="multiple" placeholder={"Selecciona un Permiso"}  >
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
                           initialValue:user.is_superuser?['SuperUser', 'Admin', 'Just user']:user.is_staff?['Admin', 'Just user']:['Just User']
                            })(
                                <Select mode="multiple" placeholder={"Selecciona un Permiso"}  >
                                    {options_permissions}
                                </Select>
                            )}

                        </FormItem>


                    </div>
                    <FormItem>
                        <Button type="primary" htmlType={'submit'} size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            {canEdit?'Editar':'Guardar'}
                        </Button>
                    </FormItem>
                    
                </Form>

            </Modal>

        )
    }
);

export default UsuarioForm;
