import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;


const InfoCompany = ({form,editEmpresa,id,editMode, handleEditMode, company, line_comp, options, phone_compa, rfc_comp, email_comp, phone, rfcR }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id']=id;
                let newBlines = [];
                for(let i in values.line_comp_id){
                    newBlines.push(values.line_comp_id[i])
                }
                values['line_comp_id'] = newBlines;

                editEmpresa(values)
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

    let blineselected = [];
    if(line_comp){
        for(let i in line_comp){
            blineselected.push(line_comp[i].id)
        }
    }


    return (
        <Fragment>
            <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label="Nombre de la Empresa"
                    >
                        {form.getFieldDecorator('company', {
                            initialValue: company,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>


                    {line_comp?
                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {form.getFieldDecorator('line_comp_id',{
                                initialValue:blineselected,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Select
                                    disabled={!editMode}
                                    mode={'multiple'}
                                    placeholder={"Linea de negocio"}>
                                    {options}
                                </Select>
                            )}
                        </FormItem>:
                        <FormItem
                            label={"Linea de negocio"}
                        >
                            {form.getFieldDecorator('line_comp_id',{
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Select
                                    disabled={!editMode}
                                    mode={'multiple'}
                                    placeholder={"Lina de negocio"}>
                                    {options}
                                </Select>
                            )}
                        </FormItem>}


                    <FormItem
                        label="RFC de la Empresa"
                    >
                        {form.getFieldDecorator('rfc_comp', {
                            initialValue:rfc_comp,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }

                            ],

                        })(
                            <Input maxLength={"13"} disabled={!editMode}/>
                        )}
                    </FormItem>


                    <FormItem
                        label="Correo electrónico"
                    >
                        {form.getFieldDecorator('email_comp', {
                            initialValue: email_comp,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            },{
                                type: 'email', message: 'No es una dirección de correo válida!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {form.getFieldDecorator('phone_compa', {
                            initialValue: phone_compa,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            },
                                {validator: phone}
                            ],

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
                    style={{width: '100%', display:'flex', justifyContent:'center', margin:'0 auto'}}
                >
                    Editar
                </Button> : ""
            }
        </Fragment>
    )
};
const CompanyInfo = Form.create()(InfoCompany);
export default CompanyInfo;