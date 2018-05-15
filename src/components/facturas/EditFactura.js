import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message, Modal} from 'antd';
import {editEgreso} from "../../redux/actions/administracion/egresosActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoFactura = ({form,edit,onCancel,id, linea, business_line, handleEditMode, proveedores, provider, editMode, visible, data, factura }) => {
    console.log("DATAA", data)
    console.log("FACTURA", factura)

    const handleSubmit = (e) => {
        console.log("LALLA", e)
        e.preventDefault();
        form.validateFields((err, values) => {

            if (!err) {
                console.log("VALUES",values);
                values['id']=data.id;
                values['animals']=data.animals
                console.log("ENVIAR", values)

                edit(values)
                    .then(r=>{
                        console.log("Editado con éxito");
                        message.success('Guardado con éxito');
                    }).catch(e=>{
                    console.log(e)
                })
            }else{message.error('Algo fallo, verifica los campos');}
        });
    };



    return (
        <Fragment>
            <Modal
                title="Editar factura"
                visible={visible}
                onCancel={onCancel}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >


            <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>


                        <FormItem
                            label={"Razón Social"}
                        >
                            {form.getFieldDecorator('factura',{
                                initialValue:data.factura,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>



                                    </div>

                <FormItem>

                        <Button
                            htmlType="submit"
                            size="large"
                            type={"primary"}
                            style={{width: '100%'}}
                        >
                            Guardar
                        </Button>
                </FormItem>
            </Form>



            </Modal>
        </Fragment>
    )
};
const EditFactura = Form.create()(InfoFactura);
export default EditFactura;