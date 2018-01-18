import React, {Fragment} from 'react';
import {List, Avatar, Form, Input, InputNumber, Upload, DatePicker, Icon, Button, Select} from 'antd';
import moment from 'moment';

const Option = Select.Option;

const FormItem = Form.Item;

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};


//let options_lote = this.props.lotes.map((a) => <Option value={parseInt(a.id)} >{a.name}</Option>);


const BasicInfo = ({arete_siniga, arete_rancho, fecha_entrada, peso_entrada, descripcion, raza, color, comentarios,lote, ref_factura_original, owner, costo_inicial, fierro_nuevo, fierro_original , costo_kilo}) => {

    return (
        <Fragment>
            <Form style={{width:'100%'}}>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                    <FormItem
                        label="Fecha Registro"
                    >
                        <DatePicker
                            defaultValue={moment(fecha_entrada)}
                            disabled/>
                    </FormItem>

                    <FormItem
                        label="Owner"
                    >
                        <Input
                            disabled
                            defaultValue={owner}/>
                    </FormItem>

                    <FormItem
                        label="Factura"
                    >
                            <Input
                                disabled
                                defaultValue={ref_factura_original}/>

                    </FormItem>

                    <FormItem
                        label="Peso Entrada"
                    >
                            <InputNumber
                                disabled
                                defaultValue={peso_entrada}
                                step={0.01}
                                min={0}
                                max={100}
                                formatter={value => `${value}kg`}
                                parser={value => value.replace('kg', '')}
                            />
                    </FormItem>

                    <FormItem
                        label="Arete Siniga"
                    >
                            <Input
                                disabled
                                defaultValue={arete_siniga}/>

                    </FormItem>

                    <FormItem
                        label="Arete Rancho"
                    >
                            <Input
                                disabled
                                defaultValue={arete_rancho}/>
                    </FormItem>

                    <FormItem
                        label="Costo Inicial"
                    >
                            <InputNumber
                                defaultValue={costo_inicial}
                                disabled
                                step={0.01}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                    </FormItem>

                    <FormItem
                        label="Costo Kilo"
                    >
                            <InputNumber
                                defaultValue={costo_kilo}
                                disabled
                                step={0.01}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />

                    </FormItem>

                    <FormItem
                        label="Raza"
                    >
                            <Input
                                disabled
                                defaultValue={raza}/>

                    </FormItem>

                    <FormItem
                        label="Color"
                    >
                            <Input
                                disabled
                                defaultValue={color}/>

                    </FormItem>
                    <FormItem
                        label={"Lote"}
                        style={{width:'70%'}}
                >
                        <Select
                            disabled
                            defaultValue={lote.name}
                            placeholder={"Selecciona un Lote"}>
                            <Option value={lote.name}>{lote.name}</Option>
                        </Select>
                    </FormItem>

                </div>

                <FormItem
                    label="Comentarios"
                >
                        <Input
                            disabled
                            defaultValue={comentarios}/>

                </FormItem>

                <FormItem
                    label="Descripción"
                >
                        <Input
                            disabled
                            defaultValue={descripcion}/>

                </FormItem>

               <div style={{display:'flex', justifyContent:'space-around'}}>
                   <FormItem
                       label="Fierro Original"
                   >
                       {fierro_original?

                           <img src={fierro_original} alt="" style={{width:'200px', height:'200px'}}/>:
                           <div className="dropbox">
                               <Upload.Dragger name="files">
                                   <p className="ant-upload-drag-icon">
                                       <Icon type="inbox" />
                                   </p>
                                   <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                               </Upload.Dragger>
                           </div>}
                   </FormItem>

                   <FormItem
                       onChange={()=>{}}
                       label="Fierro Nuevo"
                   >
                       {fierro_nuevo?
                           <img src={fierro_nuevo} alt="" style={{width:'200px', height:'200px'}}/>:

                           <div className="dropbox">
                               <Upload.Dragger name="files" >
                                   <p className="ant-upload-drag-icon">
                                       <Icon type="inbox" />
                                   </p>
                                   <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                               </Upload.Dragger>
                           </div>}
                   </FormItem>
               </div>

                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                        Editar
                    </Button>
                </FormItem>
            </Form>
        </Fragment>
    )
};

export default BasicInfo;