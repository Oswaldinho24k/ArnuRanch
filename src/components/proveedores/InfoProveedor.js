import React, {Fragment} from 'react';
import {Form, Input, Select, Button} from 'antd';
import {editProveedor} from "../../redux/actions/proveedoresActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoProveedor = ({form,editProveedor,id,editMode, handleEditMode, provider, address, email, phone_number, rfc}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id']=id;
                editProveedor(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        handleEditMode()
                    }).catch(e=>{
                        console.log(e)
                })
            }
        });
    };

    return (
        <Fragment>
            <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label="Nombre del Proveedor"
                    >
                        {form.getFieldDecorator('provider', {
                            initialValue:provider

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="RFC del Proveedor"
                    >
                        {form.getFieldDecorator('rfc', {
                            initialValue:rfc

                        })(
                            <Input maxLength={"13"} disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Dirección"
                    >
                        {form.getFieldDecorator('address', {
                            initialValue:address

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Correo electrónico"
                    >
                        {form.getFieldDecorator('email', {
                            initialValue:email

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {form.getFieldDecorator('phone_number', {
                            initialValue:phone_number

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>


                </div>

                <FormItem>
                    {editMode ?
                        <Button
                            htmlType="submit"
                            size="large"
                            type={"primary"}
                            style={{width: '100%'}}
                        >
                            Guardar
                        </Button> : ""
                    }
                </FormItem>
            </Form>
            {!editMode ?
                <Button
                    htmlType={"button"}
                    onClick={handleEditMode}
                    style={{width: '90%', display:'flex', justifyContent:'center', margin:'0 auto'}}
                >
                    Editar
                </Button> : ""
            }
        </Fragment>
    )
};
const ProveedorInfo = Form.create()(InfoProveedor);
export default ProveedorInfo;