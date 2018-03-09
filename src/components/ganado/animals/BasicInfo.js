import React, {Fragment} from 'react';
import {Form, Input, InputNumber, Upload, DatePicker, Icon, Button, Select, message, Switch} from 'antd';
import moment from 'moment';

const Option = Select.Option;

const FormItem = Form.Item;
const {TextArea} = Input;




const BasicInfo = ({form, wEmpresa, editAnimal, handleEmpresa, editMode,handleEditMode, id,empresa, options_raza, tipo_animal, arete_siniga, merma,  arete_rancho, fecha_entrada, peso_entrada, descripcion, raza, color, options_empresa,lote, ref_factura_original, owner, costo_inicial, fierro_nuevo, fierro_original , costo_kilo, options}) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                if(!values.lote_id) delete values.lote_id;
                if(!values.raza_id) delete values.raza_id;
                if(!values.empresa_id) delete values.empresa_id;
                /*if(!values.lote_id) values['lote_id'] = null;
                if(!values.raza_id) values['raza_id'] = null;
                if(!values.empresa_id) values['empresa_id'] = null;*/
                if(!values.tipo_animal) delete values.tipo_animal;
                /* if(!values.costo_inicial) delete values.costo_inicial;
                 if(!values.costo_kilo) delete values.costo_kilo;
                 if(!values.peso_entrada) delete values.peso_entrada;*/
                console.log(values);
                values['id']=id;
                editAnimal(values)
                    .then(r=>{
                        message.success('Editado con éxito');
                        handleEditMode()
                    }).catch(e=>{
                    for (let i in e.response.data){
                        message.error(e.response.data[i])
                    }
                })
            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };
    const opciones = [{
        name :'becerro',
        id: 1
    },{
        name:'toro',
        id:3
    },{
        name:'vaca',
        id:4
    },{
        name:'vaquilla',
        id:5
    }

    ];

    let tipos = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);


    return (
        <Fragment>
            <Form style={{width:'100%', padding:'1% 3%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>


                    <FormItem
                        label="Arete Rancho"
                        style={{width:'250px'}}>
                        {form.getFieldDecorator('arete_rancho', {
                            initialValue:arete_rancho,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input
                                disabled={!editMode}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="Arete Siniga"
                        style={{width:'200px'}}>
                        {form.getFieldDecorator('arete_siniga', {
                            initialValue:arete_siniga,
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input
                                disabled={!editMode}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="Fecha Registro">
                        {form.getFieldDecorator('fecha_entrada', {
                                    initialValue:moment(fecha_entrada)
                            })(
                        <DatePicker
                            disabled={!editMode}/>
                    )}
                    </FormItem>
                    <FormItem
                        label={"Tipo"}
                        style={{width:'200px'}}

                    >
                        {form.getFieldDecorator('tipo_animal', {
                            initialValue:tipo_animal,
                            rules: [{
                                required: false, message: 'Completa el campo!',
                            }],
                            props:{
                                placeholder:'Selecciona un tipo',
                            }
                        })(


                            <Select  disabled={!editMode} placeholder={"Selecciona un tipo"}>

                                {tipos}
                            </Select>
                        )}

                    </FormItem>
                    <FormItem label={'Empresa?'}>
                        <Switch  disabled={!editMode} defaultChecked={wEmpresa} onChange={handleEmpresa} checkedChildren="E" unCheckedChildren="P"/>
                    </FormItem>
                    {!wEmpresa?
                        <FormItem
                        label="Propietario">
                        {form.getFieldDecorator('owner', {
                                    initialValue:owner

                            })(
                        <Input
                            style={{widht:'200px'}}

                            disabled={!editMode}
                            />
                        )}
                    </FormItem>:
                    <FormItem label={'Empresa'}>
                        {form.getFieldDecorator('empresa', {
                            initialValue:empresa?empresa.id:'',

                        })(
                        <Select
                            disabled={!editMode}
                            style={{width:'200px'}}>
                            {options_empresa}
                        </Select>
                        )}
                    </FormItem>}
                    <FormItem
                        label="Factura Inicial"
                        style={{width:'200px'}}>
                        {form.getFieldDecorator('ref_factura_original', {
                                    initialValue:ref_factura_original
                            })(
                            <Input
                                disabled={!editMode}
                               />

                            )}
                    </FormItem>
                    <FormItem
                        label="Peso Entrada"
                        style={{width:'150px'}}>
                        {form.getFieldDecorator('peso_entrada', {
                                    initialValue:peso_entrada
                            })(
                            <InputNumber
                                style={{width:'150px'}}
                                disabled={!editMode}
                                step={0.01}
                                min={0}
                                max={100}
                                formatter={value => `${value}kg`}
                                parser={value => value.replace('kg', '')}
                            />
                                )}
                    </FormItem>



                    <FormItem
                        label="Costo Kilo"
                        style={{width:'150px'}}>
                        {form.getFieldDecorator('costo_kilo', {
                                    initialValue:costo_kilo
                            })(
                            <InputNumber
                                style={{width:'150px'}}
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                                                )}
                    </FormItem>
                    <FormItem
                        label="Costo Inicial"
                        style={{width:'150px'}}>
                        {form.getFieldDecorator('costo_inicial', {
                            initialValue:(form.getFieldValue('costo_kilo')*form.getFieldValue('peso_entrada')).toFixed(2),
                        })(
                            <InputNumber
                                style={{width:'150px'}}
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="Costo Merma"
                        style={{width:'150px'}}>
                        {form.getFieldDecorator('merma', {
                            initialValue:merma
                        })(
                            <InputNumber
                                style={{width:'150px'}}
                                disabled={!editMode}
                                step={0.01}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="Raza">
                        {form.getFieldDecorator('raza', {
                                    initialValue:raza?raza.id:''
                            })(
                            <Select
                                style={{width:'150px'}}
                                disabled={!editMode}
                            >
                                {options_raza}
                            </Select>
                                                    )}
                    </FormItem>
                    <FormItem
                        label="Color">
                        {form.getFieldDecorator('color', {
                                    initialValue:color
                            })(
                            <Input
                                disabled={!editMode}
                            />
                                                        )}
                    </FormItem>

                        <FormItem
                            label={"Lote"}
                            style={{width:'40%'}}>
                            {form.getFieldDecorator('lote',{
                                initialValue:lote?lote.id:''
                            })(
                                <Select
                                    disabled={!editMode}
                                    placeholder={"Selecciona un Lote"}>
                                    {options}
                                </Select>
                            )}
                        </FormItem>

                    <FormItem
                        label="Descripción"
                        style={{width:'50%'}}>
                        {form.getFieldDecorator('descripcion', {
                            initialValue:descripcion

                        })(
                            <TextArea autosize
                                disabled={!editMode}
                            />

                        )}
                    </FormItem>

                </div>

               {/* <FormItem
                    label="Comentarios">
                    {form.getFieldDecorator('comentarios', {
                                    initialValue:comentarios

                            })(
                        <Input
                            disabled={!editMode}
                            />

                                                                )}
                </FormItem>*/}



               <div style={{display:'flex', justifyContent:'space-around'}}>
                   <FormItem
                       label="Fierro Original">

                       {fierro_original&&!editMode?

                           <img src={fierro_original} alt="" style={{width:'200px', height:'200px'}}/>:
                           <div className="dropbox">
                               {form.getFieldDecorator('fierro_original',{
                                       initialValue:fierro_original
                               })(
                               <Upload.Dragger name="files" disabled={!editMode}>
                                   <p className="ant-upload-drag-icon">
                                       <Icon type="inbox" />
                                   </p>

                                   <p className="ant-upload-hint">Da click o arrastra un archivo</p>
                               </Upload.Dragger>)}
                           </div>}

                   </FormItem>

                   <FormItem
                       onChange={()=>{}}
                       label="Fierro Nuevo"
                   >
                       {fierro_nuevo&&!editMode?
                           <img src={fierro_nuevo} alt="" style={{width:'200px', height:'200px'}}/>:

                           <div className="dropbox">
                               {form.getFieldDecorator('fierro_nuevo',{
                                       initialValue:fierro_nuevo
                               })(
                               <Upload.Dragger name="files" disabled={!editMode}>
                                   <p className="ant-upload-drag-icon">
                                       <Icon type="inbox" />
                                   </p>

                                   <p className="ant-upload-hint">Da click o arrastra un archivo</p>
                               </Upload.Dragger>)}
                           </div>}

                   </FormItem>
               </div>

                <FormItem>
                    {editMode?
                    <Button
                        htmlType="submit"
                        size="large"
                        type={"primary"}
                        style={{width:'100%'}}
                        >
                        Guardar
                    </Button>:''}

                </FormItem>
            </Form>
            {!editMode?
                <Button
                onClick={handleEditMode}
                htmlType="button"
                style={{width:'100%'}}
            >
                Editar
            </Button>:''}
        </Fragment>
    )
};
const BasicInfoAndEdit = Form.create()(BasicInfo);
export default BasicInfoAndEdit;