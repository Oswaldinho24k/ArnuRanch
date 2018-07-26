import React, {Component} from "react";
import {Button, Form, Modal, Select, Input, InputNumber, Icon, message} from 'antd';
import {connect} from 'react-redux';
import './FormulasStyles.css';
import {saveItem, editItem, deleteItem} from '../../redux/actions/plantaAlimentos/itemsActions';
import {saveFormula, editFormula} from '../../redux/actions/plantaAlimentos/formulasActions';

const FormItem = Form.Item;
const Option = Select.Option;

// const style = {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     flexWrap: 'wrap'
// };

let uuid = 0;

class Item {
    constructor(insumo, formula, unit, subtotal) {
        this.insumo = insumo;
        this.formula = formula;
        this.unit = unit;
        this.subtotal = subtotal;
    }

    toString() {
        return 'Insumo: ' + this.idInsumo +
            'Formula' + this.idFormula +
            'Cantidad' + this.unit +
            'Subtotal' + this.subtotal;
    }
}

class FormulasForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount () {
        uuid = 0;
    }

    remove = k => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let insumosObjs = this.props.insumos || [];
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let units = [];
                let total_units = 0;
                let total_price = 0;
                let items = [];
                let i = 0;
                console.log(values);
                for (let unit of values['units']) {
                    if (unit) {
                        try {
                            //let unitFloat = parseFloat(unit.replace('kg', ''));
                            units[i++] = parseFloat(parseFloat(unit).toFixed(2));
                            total_units += parseFloat(unit);
                            total_units = parseFloat(total_units.toFixed(2));

                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                let insumos = [];
                i = 0;
                for (let insumoId of values['insumos']) {
                    if (insumoId) {
                        let insumo = insumosObjs.find(insumo => insumo.id === insumoId);
                        let subtotal = insumo['unit_price_total'] * parseFloat(units[i]);
                        subtotal = parseFloat(subtotal.toFixed(2));
                        total_price += parseFloat(subtotal.toFixed(2));
                        total_price = parseFloat(total_price.toFixed(2));
                        const formulaId = this.props.formula ? this.props.formula.id : 0;
                        let item = new Item(insumoId, formulaId, parseFloat(units[i]), subtotal);
                        insumos[i++] = insumoId;
                        items.push(item);
                    }
                }

                values['units'] = units;
                values['insumos'] = insumos;
                values['items'] = items;
                values['total_units'] = total_units;
                values['total_price'] = total_price;

                let formula = {
                    name: values['formulaName'],
                    total_units: total_units,
                    total_price: total_price,
                    items: items
                };
                console.log(`La formula{formula}`, formula);

                if (this.props.formula === undefined) {
                    this.props.saveFormula(formula)
                        .then(r => {
                            console.log(r);
                            for (let item of items) {
                                item.formula = r.id;
                                this.props.saveItem(item)
                                    .then(r => {
                                        item.id = r.id;
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            }
                            formula.id = r.id;
                            message.success("Formula guardada");
                            this.props.editFormula(formula).then( r => console.log(r)).catch( e => console.error(e));
                        })
                        .catch(e => {
                            console.log(e);
                            message.error("Ups algo salió mal, contacta al administrador");
                        });
                } else {
                    formula['id'] = this.props.formula.id;
                    console.log('Estos son mis items',this.props.items);
                    for(let item of this.props.items){
                        this.props.deleteItem(item.id).then(r => console.log(r)).catch( e => console.log(e));
                    }
                    this.props.editFormula(formula)
                        .then( r => {
                            for (let item of items) {
                                item.formula = r.id;
                                this.props.saveItem(item)
                                    .then(r => {
                                        console.log(r);
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            }
                            message.success("Formula editada exitosamente");
                        }).catch( e => {
                            console.log(e);
                            message.error("Ups algo salió mal, contacta al administrador");
                    });
                }
                this.props.onSubmit(e);
            }
        });
    };

    render() {
        const {form: {getFieldDecorator, getFieldValue}, title, width, onCancel, formula = {items:[]}, onDelete} = this.props;
        let initialKeys = [];
        let insumosKeys = [];
        let units = [];
        let nameFormula = '';
        if (formula) {
            nameFormula = formula.name;
            let {items} = formula || [];
            items.forEach( item => {
                insumosKeys.push(item.insumo.id);
                units.push(item.unit);
            });
            for(let i = 0 ; i < items.length; i++){
                initialKeys.push(i);
                uuid++;
            }
        }
        getFieldDecorator('keys', {initialValue: initialKeys});
        const keys = getFieldValue('keys');
        let insumos_options = this.props.insumos || [];
        insumos_options = insumos_options.map(insumo =>
            <Option
                value={parseInt(insumo.id)}
                key={insumo.id}
            >
                {insumo.name}
            </Option>
        );
        const formItems = keys.map((k, index) => {
            return (
                <div className="newInsumo" key={k}>
                    <FormItem
                        label={index === 0 ? 'Insumo' : ''}
                        required={true}
                        style={{width: '45%', boxSizing: 'border-box', padding: 10}}
                    >
                        {
                            getFieldDecorator(`insumos[${k}]`, {
                                initialValue: insumosKeys[k],
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    message: 'Selecciona un insumo o eliminalo!',
                                }],
                                props: {
                                    placeholder: 'Selecciona un proveedor'
                                }
                            })
                            (
                                <Select>
                                    {insumos_options}
                                </Select>
                            )
                        }

                    </FormItem>
                    <FormItem
                        label={index === 0 ? 'Cantidad (Kg)' : ''}
                        required={true}
                        style={{width: '45%', marginRight: 8, boxSizing: 'border-box', padding: 10}}
                    >
                        {getFieldDecorator(`units[${k}]`, {
                            initialValue: units[k],
                            validateTrigger: ['onChange', 'onBlur'], //'onBlur'
                            rules: [{
                                required: true,
                                //whitespace: true,
                                message: "Debes ingresar un número válido",
                            }],
                        })(
                            <InputNumber
                                style={{width: '100%'}}
                                min={0.1}
                                max={10000000}
                                placeholder="Cantidad en kg"
                               // formatter={value => `${value}Kg`}
                                //parser={value => value.replace("Kg", '')}
                            />
                        )}
                    </FormItem>
                    <div style={{width: '10%', boxSizing: 'border-box', alignSelf: 'center'}}>
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                style={{maxWidth: '100%'}}
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </div>
                </div>
            );
        });
        return (
            <Modal
                title={title}
                visible={true}
                width={width}
                maskClosable={true}
                footer={[<Button disabled={uuid === 0} form='formula' key='f' type="primary" htmlType="submit">Guardar</Button>, null]}
                onCancel={onCancel}
                style={{height: '70vh'}}
            >
                <Form id='formula' onSubmit={this.handleSubmit}>
                    <FormItem
                        label='Nombre de la fórmula'
                        required={true}
                    >
                        {getFieldDecorator(`formulaName`, {
                            initialValue: nameFormula,
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Debes ingresar un nombre de fórmula",
                            }],
                        })(
                            <Input
                                placeholder="Nombre"
                            />
                        )}
                    </FormItem>
                    <div style={{height: 300, overflowY: 'scroll'}}>
                        {formItems}
                        <FormItem style={{width: '100%'}}>
                            <Button
                                style={{width: '100%'}}
                                type="dashed"
                                onClick={this.add}
                            >
                                <Icon type="plus"/> Añadir insumo
                            </Button>
                        </FormItem>
                    </div>

                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    let formula;
    if (id !== 'add') {
        formula = (state.formulas.list.filter(formula => formula.id == id)[0]);
    }
    let items = [];
    if (formula) {
        items = (state.items.list.filter(item => item.formula == formula.id));
    }
    return {
        formula,
        insumos: state.insumos.list,
        items
    }
};

FormulasForm = Form.create()(FormulasForm);
FormulasForm = connect(mapStateToProps, {saveFormula, saveItem, editFormula, editItem, deleteItem})(FormulasForm);
export default FormulasForm;