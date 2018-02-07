import React, {Component} from "react";
import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';
import {connect} from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

const style = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    flexWrap:'wrap'
};

class FormulasForm extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {form : {getFieldDecorator}, title, width, onCancel, formula, onDelete} = this.props;
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
                    <FormItem label="Working on it">
                        {
                            getFieldDecorator(
                                'name',
                                {
                                    initialValue: 'En construcción',
                                    rules: [{
                                        required: true, message: 'Completa el campo!',
                                    }],
                                }
                            )(<Input disabled={'disabled'}/>)
                        }
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    let formula;
    if (id !== 'add') {
        formula = (state.formulas.list.filter( formula => formula.id == id )[0]);
    }
    return {
        formula
    }
};

FormulasForm = Form.create()(FormulasForm);
FormulasForm = connect(mapStateToProps,{})(FormulasForm);
export default FormulasForm;