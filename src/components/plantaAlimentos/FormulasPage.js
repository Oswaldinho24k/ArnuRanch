import React, {Component} from "react";
import {connect} from 'react-redux';
import {FormulasDisplay} from './FormulasDisplay';
import {metadata} from "./metadataFormulas";

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
                <FormulasDisplay
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={formulas}
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