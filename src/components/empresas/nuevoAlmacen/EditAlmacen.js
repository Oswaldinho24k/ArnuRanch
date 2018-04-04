import React, {Fragment} from 'react';
import { Form, Input, Button, Select, message } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

const InfoAlmacen = ({form,editAlmacen, regresar, bline, empresa, onCreate, name, editMode, handleEditMode, id})=>{

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                editAlmacen(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        handleEditMode();
                        message.success('Guardado con éxito');
                        regresar();
                    }).catch(e=>{
                    console.log(e)
                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };

        return(
            <Fragment>
                <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                    <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem
                            label="Nombre del almacén"
                        >
                            {form.getFieldDecorator('name', {
                                initialValue:name,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input placeholder={"Nombre del almacén"} disabled={false}/>
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

                        <FormItem

                        >

                            {form.getFieldDecorator('id',{
                                initialValue:id,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input hidden={true}/>
                            )}

                        </FormItem>

                    </div>

                    <FormItem>

                            <Button
                                htmlType="submit"
                                size="large"
                                type={"primary"}
                                style={{width: '100%'}}
                            >
                                Guardar
                            </Button>

                    </FormItem>
                </Form>


            </Fragment>

        )
    }

const EditAlmacen = Form.create()(InfoAlmacen)
export default EditAlmacen;