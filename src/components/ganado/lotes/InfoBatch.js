import React, {Fragment} from 'react';
import {Form, Input, Button, Switch, Select} from 'antd';


const FormItem = Form.Item;




const InfoBatch = ({form, name, id, status, corral, corrales, handleEdit, canEdit, edit, option_corrales }) => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values['id']=id;
                edit(values);
                handleEdit();
            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };

    return (
            <Fragment>

                <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                    {canEdit?
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label={"Nombre de Lote"}
                    >
                        {form.getFieldDecorator('name', {
                            initialValue:name
                        })(
                            <Input
                                disabled={!canEdit}/>
                        )}
                    </FormItem>
                    <FormItem
                        label={"Corral"}
                    >
                        {form.getFieldDecorator('corral', {

                        })(
                            <Select  placeholder={corral?corral.no_corral:'Elige un Corral'} style={{width:"150px"}}>
                                {option_corrales}
                            </Select>
                        )}
                    </FormItem>


                    <FormItem
                        label="Statussss">
                        {form.getFieldDecorator('status', {
                            initialValue:status
                        })(
                        <Switch
                            defaultChecked={status}/>
                        )}
                    </FormItem>
                </div>:
                <div>
                    <h2>Lote: {name} | Corral: {corral?corral.no_corral:'No asignado aún'} | Status: {status?'Activo':'Inactivo'}</h2>
                </div>}
                {canEdit?
                    <Button htmlType="submit">Guardar</Button>:''}
            </Form>
                {canEdit?'':<Button type="primary" onClick={handleEdit}>Editar</Button>}
            </Fragment>
    )
};

const BasicInfoForm = Form.create()(InfoBatch);

export default BasicInfoForm;