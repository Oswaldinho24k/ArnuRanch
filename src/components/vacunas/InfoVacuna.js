import React, {Fragment} from 'react';
import {Form, Input, Select, Button, InputNumber, message} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;


const InfoVacuna = ({form,editVacuna,id,editMode, handleEditMode, type, vaccine, dose, content, concentration, cost }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id']=id;
                editVacuna(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        handleEditMode();
                        message.success('Guardado con éxito');
                    }).catch(e=>{
                    console.log(e)
                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };



    return (
        <Fragment>
            <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label="Nombre de la Vacuna"
                    >
                        {form.getFieldDecorator('vaccine', {
                            initialValue: vaccine,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Tipo de Vacuna"
                    >
                        {form.getFieldDecorator('type', {
                            initialValue: type,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Dosis ml">
                        {form.getFieldDecorator('dose', {
                            initialValue:dose,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `${value}ml`}
                                parser={value => value.replace('ml', '')}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        label="Contenido ml">
                        {form.getFieldDecorator('content', {
                            initialValue:content,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `${value}ml`}
                                parser={value => value.replace('ml', '')}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        label="Concentración ml">
                        {form.getFieldDecorator('concentration', {
                            initialValue:concentration,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `${value}ml`}
                                parser={value => value.replace('ml', '')}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        label="Costo">
                        {form.getFieldDecorator('cost', {
                            initialValue:cost,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `${value}$`}
                                parser={value => value.replace('$', '')}
                            />
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
const VacunaInfo = Form.create()(InfoVacuna);
export default VacunaInfo;