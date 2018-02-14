import React, {Fragment} from 'react';
import {Form, Input, Checkbox, Button, Switch} from 'antd';


const FormItem = Form.Item;




const InfoBatch = ({form, name, status, corral, corrales, handleEdit, canEdit, edit }) => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                handleEdit()
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
                    {form.getFieldDecorator('name', {
                        initialValue:name
                    })(
                        <FormItem
                            label="Name"
                        >
                            <Input

                                disabled={!canEdit}/>
                        </FormItem>)}
                    {form.getFieldDecorator('corral', {
                        initialValue:corral.numero_serial
                    })(
                        <FormItem
                            label="Corral">
                            <Input

                                disabled={!canEdit}/>
                        </FormItem>)}
                    {form.getFieldDecorator('status', {
                        initialValue:status
                    })(
                        <FormItem
                            label="Statussss">

                            <Switch
                                disabled={!canEdit}/>
                        </FormItem>)}
                </div>:
                <div>
                    <h2>Lote: {name} | Corral: {corral.no_corral} | Status: {status?'Activo':'Inactivo'}</h2>
                </div>}
                {canEdit?
                    <Button htmlType="submit">Guardar</Button>:''}
            </Form>
               {/* {canEdit?'':<Button type="primary" onClick={handleEdit}>Editar</Button>}*/}
            </Fragment>
    )
};

const BasicInfoForm= Form.create()(InfoBatch);

export default BasicInfoForm;