import React, {Fragment} from 'react';
import {Form, Input, Select, Button, InputNumber, message} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;


const InfoVacuna = ({form,editVacuna,id,editMode, handleEditMode, typeofv, vaccine, dose, content, concentration, cost, unity }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {

                values['id']=id;
                editVacuna(values)
                    .then(r=>{

                        handleEditMode();
                        message.success('Guardado con éxito');
                    }).catch(e=>{

                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };

    const selectAfter = (
        <FormItem style={{height:5, padding:0}}>
            {form.getFieldDecorator('unity',{
                initialValue:unity
            })(
                <Select  style={{ width: 100 }} disabled={!editMode}>
                    <Option value="ml">ml</Option>
                    <Option value="unidad">unidad</Option>
                </Select>
            )}
        </FormItem>

    );



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
                        {form.getFieldDecorator('typeofv', {
                            initialValue: typeofv,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'}}>

                    <FormItem
                        label="Dosis Recomendada"
                        style={{width:'1000%'}}
                    >
                        {form.getFieldDecorator('dose', {
                            initialValue:dose,

                        })(
                            <Input
                                disabled={!editMode}
                                addonAfter={selectAfter}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        label="Contenido ml"
                        style={{width:'50%'}}
                    >
                        {form.getFieldDecorator('content', {
                            initialValue:content,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                min={0}
                                style={{width:'90%'}}
                                disabled={!editMode}
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
                        {form.getFieldDecorator('concentration', {
                            initialValue:concentration,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                min={0}
                                style={{width:'90%'}}
                                disabled={!editMode}
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
                        {form.getFieldDecorator('cost', {
                            initialValue:cost,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <InputNumber
                                min={0}
                                style={{width:'90%'}}
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `${value}$`}
                                parser={value => value.replace('$', '')}
                            />
                        )}
                    </FormItem>
                    </div>





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