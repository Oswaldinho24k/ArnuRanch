import React, {Component} from "react";
import {connect} from 'react-redux'
import {InsumosDisplay} from "./InsumosForm";
import {metadata} from "./metadataInsumos";
import {Button, Modal, Table} from "antd";
import InsumosForm from "./InsumosForm";
import {saveInsumo} from '../../redux/actions/plantaAlimentos/insumosActions'
import {Link, Route} from "react-router-dom";

const path = "/admin/planta_alimentos/insumos/:id";
const absolutePath = "/admin/planta_alimentos/insumos/";

class InsumosPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    openModal = () => {
        this.setState({open:true});
    };

    closeModal = () => {
        this.props.history.push(absolutePath);
    };

    onSubmit = (insumo) => {
        this.props.saveInsumo(insumo)
            .then( r => {
                console.log(r);
            })
            .catch( e => {
                console.log(e);
            });
        this.closeModal();
    };

    render() {
        const {columns,rowSelection} = metadata;
        const {insumos} = this.props;
        const InsumosFormRender = () => (
            <InsumosForm
                onSubmit={this.onSubmit}
                title="Agregar nuevo insumo"
                width="30%"
                onCancel={this.closeModal}
            />
        );
        return (
            <div>
                <h1>Insumos</h1>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={insumos}
                    rowKey={record => record.id}
                />
                <Link to={absolutePath + 'add'}>
                    <Button
                        type="primary"
                    >
                        Agregar
                    </Button>
                </Link>
                <Route path={path} render={InsumosFormRender}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    insumos: state.insumos.list
});

InsumosPage = connect(mapStateToProps, {saveInsumo})(InsumosPage);
export default InsumosPage;