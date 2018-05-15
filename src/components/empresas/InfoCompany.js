import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;


const InfoCompany = ({form,editEmpresa,id,editMode, handleEditMode, company, line_comp, options, phone_compa, rfc_comp, email_comp, phone, rfcR, searchLine, lineHandle, linea }) => {

    let blineselected = [];
    if(line_comp){
        for(let i in line_comp){
            blineselected.push(line_comp[i].id)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(linea.length > 0 ){
                values['line_comp_id'] = linea;

            }else{
                values['line_comp_id'] = blineselected;

            }


            if (!err) {
                console.log(values);
                values['id']=id;

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
                        <FormItem>

                            <Select
                                disabled={!editMode}
                                defaultValue={blineselected}
                                placeholder={"Linea de Negocio"}
                                mode={'multiple'}
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.id}>{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>


                        </FormItem>:
                        <FormItem
                            label={"Linea de negocio"}
                            hasFeedback
                        >
                            <Select
                                disabled={!editMode}
                                placeholder={"Linea de Negocio"}
                                mode={'multiple'}
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.id}>{a.name}</Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>


                        </FormItem>
                    }


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