import React, {Fragment} from 'react';
import {Form, Input, Select, Button, Checkbox, InputNumber, message, Modal} from 'antd';
import {editEgreso} from "../../redux/actions/administracion/egresosActions";

const Option = Select.Option;
const FormItem = Form.Item;


const InfoBline = ({form,edit,onCancel, visible, data, name }) => {
    console.log("DATAA", data)
    console.log("BLINE", name)

    const handleSubmit = (e) => {
        console.log("LALLA", e)
        e.preventDefault();
        form.validateFields((err, values) => {

            if (!err) {
                console.log("VALUES",values);
                values['id']=data.id;
                values['almacenes']=data.almacenes;
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
                title="Editar bussines line"
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
                            label={"Bussines Line"}
                        >
                            {form.getFieldDecorator('name',{
                                initialValue:data.name,
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
const EditBline = Form.create()(InfoBline);
export default EditBline;