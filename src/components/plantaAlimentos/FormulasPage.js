import React, {Component} from "react";
import {connect} from 'react-redux';
import {metadata} from "./metadataFormulas";
import {Button,Table} from "antd";
import {Link, Route, Switch} from "react-router-dom";
import FormulasForm from "./FormulasForm";

const path = "/admin/planta_alimentos/formulas/:id";
const absolutePath = "/admin/planta_alimentos/formulas/";

class FormulasPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    closeModal = () => {
        this.props.history.push(absolutePath);
    };

    onSubmit = e => {
        e.preventDefault();

    };

    render() {
        const {columns,rowSelection} = metadata;
        const {formulas} = this.props;
        const FormulasFormRender = (props) => (
            <FormulasForm
                onSubmit={this.onSubmit}
                title="Agregar nueva formula"
                width="60%"
                onCancel={this.closeModal}
                onDelete={this.onDelete}
                {...this.props}
                {...props}
            />
        );
        return (
            <div>
                <h1>Fórmulas</h1>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={formulas}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                />
                <Link to={absolutePath + 'add'}>
                    <Button
                        type="primary"
                    >
                        Agregar
                    </Button>
                </Link>
                <Switch>
                    <Route path={path} render={FormulasFormRender}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formulas: state.formulas.list
});

FormulasPage = connect(mapStateToProps, {}) (FormulasPage);
export default FormulasPage;