import React, {Component} from "react";
import {connect} from 'react-redux';
import {metadata} from "./metadataFormulas";
import {Button,Table} from "antd";

const path = "/admin/planta_alimentos/formulas/:id";
const absolutePath = "/admin/planta_alimentos/formulas/";

class FormulasPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {columns,rowSelection} = metadata;
        const {formulas} = this.props;
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formulas: state.formulas.list
});

FormulasPage = connect(mapStateToProps, {}) (FormulasPage);
export default FormulasPage;