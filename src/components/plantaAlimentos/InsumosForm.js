import React, {Component} from "react";
import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';
import {connect} from 'react-redux';
import DetailEgresoPage from "../egresos/DetailEgresoPage";

const FormItem = Form.Item;
const Option = Select.Option;

//TODO create CRUD of this component
const style = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    flexWrap:'wrap'
};
class InsumosForm extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                console.log("good");
                if (this.props.insumo){
                    values['id'] = this.props.insumo.id;
                }
                this.props.onSubmit(values);
            }
        });
    };
    render() {
        const {form : {getFieldDecorator}, title, width, onCancel, insumo, onDelete} = this.props;
        let name = insumo ? insumo.name : '';
        let unit_price = insumo ? insumo.unit_price : 1;
        let unit = insumo ? insumo.unit : '';
        let providers_options = this.props.providers || [];
        providers_options = providers_options.map ( provider =>
            <Option
                value={parseInt(provider.id)}
                key={provider.id}
            >
                {provider.provider}
            </Option>
        );
        return (
            <Modal
                title={title}
                visible={true}
                width={width}
                maskClosable={true}
                footer={[null, null]}
                onCancel={onCancel}
            >
                <Form style={style} onSubmit={this.handleSubmit}>
                    <FormItem label="Nombre">
                        {
                            getFieldDecorator(
                                'name',
                                {
                                    initialValue: name,
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                }
                            )(<Input/>)
                        }
                    </FormItem>
                    <FormItem label="Precio unitario">
                        {
                            getFieldDecorator('unit_price', {
                                initialValue: unit_price,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(<InputNumber width="100%" min={1} max={10000}/>)
                        }
                    </FormItem>

                    <FormItem label="Proveedor">
                        {
                            getFieldDecorator('provider', {
                                initialValue: unit,
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                                props:{
                                    placeholder:'Selecciona un proveedor'
                                }
                            })
                            (
                                <Select >
                                    {providers_options}
                                </Select>
                            )
                        }

                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            style={{
                                borderColor: '#72c6cd',
                                backgroundColor: '#72c6cd',
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '0 auto',
                                width: '100%'
                            }}
                        > Guardar
                        </Button>
                        {
                            insumo &&
                            <Button
                                type="secondary"
                                size="large"
                                onClick={() => onDelete(insumo.id)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    width: '100%'
                                }}
                            > Eliminar
                            </Button>
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    let insumo;
    if (id !== 'add') {
        insumo = (state.insumos.list.filter( insumo => insumo.id == id )[0]);
    }
    return {
        insumo,
        providers: state.proveedores.list
    }
};

InsumosForm = Form.create()(InsumosForm);
InsumosForm = connect(mapStateToProps,{})(InsumosForm);
export default InsumosForm;