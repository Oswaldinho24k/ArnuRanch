import React, {Fragment} from 'react';
import {Form, Input, Button, Select, message, Checkbox} from 'antd';

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


const Info = ({form,editCliente,id,editMode, handleEditMode, name,code}) => {

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

const InfoPage = Form.create()(Info);
export default InfoPage;