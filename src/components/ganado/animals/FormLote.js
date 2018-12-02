import React from 'react';
import {Form, Select, Button} from 'antd';

const Option = Select.Option;

const FormLote = ({form, lotes, changeLote, handleSearchLote, selectId}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
            console.log(values)
            changeLote(values);
            form.resetFields()
        }
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    });
    };

    return (
        <div>
        <Form onSubmit={handleSubmit}>
        <Form.Item label={'Elige el lote de Destino'}>
        {form.getFieldDecorator('lote_id', {
        })(
        <Select
    mode="combobox"
    style={{width:'100%'}}
    onSearch={handleSearchLote}
    placeholder="ingresa el nombre del lote"
    filterOption={true}>
        {lotes.map((a, key) => <Option key={key} value={a.name} >
<p onClick={()=>selectId(a.id)}>{a.name}</p>
    </Option>)}
    </Select>
)}
</Form.Item>
    <Form.Item>
    <Button type="primary" htmlType="submit">Guardar</Button>
        </Form.Item>

        </Form>
        </div>
)
};


    let FormAnimalLote=Form.create()(FormLote);
export default FormAnimalLote;