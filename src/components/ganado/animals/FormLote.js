import React from 'react';
import {Form, Select, Button} from 'antd';

const Option = Select.Option;

const FormLote = ({form, lotes, changeLote}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                changeLote(values);


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
                <Form.Item>
                    {form.getFieldDecorator('lote', {
                    })(
                        <Select>
                            {lotes.map((a, key) => <Option key={key} value={parseInt(a.id)} >{a.name}</Option>)}
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