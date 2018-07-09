import React, {Fragment} from 'react';
import {Form, Input, Button, Select, message, InputNumber,DatePicker} from 'antd';
import moment from 'moment';
const Option = Select.Option;

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


const InfoPresupuesto = ({form,editCliente,id,editMode, handleEditMode, name,code,business_line,lineHandle,searchLine,options,saveBline}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id'] = id;
                editCliente(values)
                    .then(r => {
                        message.success('Guardado con éxito');
                        handleEditMode()
                    }).catch(e => {
                    console.log(e)
                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };
    const{getFieldDecorator} = form;



    return (
        <Fragment>
            <Form style={{width: '100%'}} onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>

                    <FormItem
                        label="Nombre"
                    >
                        {form.getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>




                    <FormItem
                        label="Código"
                    >
                        {form.getFieldDecorator('code', {
                            initialValue:code,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
                        )}
                    </FormItem>

                    <FormItem
                        label={"Linea de negocio"}
                    >
                        {form.getFieldDecorator('business_line_id',{
                            initialValue:business_line ? business_line.name:'',
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Select
                                disabled={!editMode}
                                placeholder={"Linea de Negocio"}
                                showSearch
                                onChange={lineHandle}
                                onSearch={searchLine}
                                filterOption={false}
                            >
                                {
                                    options.length >0? options.map((a, key) => <Option key={key} value={a.name} ><div onClick={()=>saveBline(a.id)}><span>{a.name}</span></div></Option>):<Option key={999999} disabled >No Lineas</Option>
                                }

                            </Select>
                        )}

                    </FormItem>
                    <FormItem
                        label="Concepto"
                    >
                        {getFieldDecorator('concept', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],

                        })(
                            <Input disabled={!editMode}/>
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

                                disabled={!editMode}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        label="Fecha"
                    >
                        {getFieldDecorator('date', {
                            initialValue:moment( new Date(), 'YYYY-MM-DD'),
                            rules: [{ type: 'object', required: true, message: 'Selecciona una fecha válida!' }],
                        })(
                            <DatePicker style={{width:'100%'}} disabled={!editMode} />
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
                    style={{width: '90%', display: 'flex', justifyContent: 'center', margin: '0 auto'}}
                >
                    Editar
                </Button> : ""
            }
        </Fragment>
    )
};

const InfoPage = Form.create()(InfoPresupuesto);
export default InfoPage;