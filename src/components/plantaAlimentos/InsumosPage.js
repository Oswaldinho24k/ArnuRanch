import React, {Component} from "react";
import {connect} from 'react-redux'
import {InsumosDisplay} from "./InsumosForm";
import {metadata} from "./metadataInsumos";
import {Button, Modal, Table} from "antd";
import InsumosForm from "./InsumosForm";
import {saveInsumo} from '../../redux/actions/plantaAlimentos/insumosActions'

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
        this.setState({open:false});
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
        const {open} = this.state;
        const {columns,rowSelection} = metadata;
        const {insumos} = this.props;
        return (
            <div>
                <h1>Insumos</h1>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={insumos}
                    rowKey={record => record.id}
                />
                <Button
                    type="primary"
                    onClick={this.openModal}
                >
                    Agregar
                </Button>
                <Modal
                    title="Agregar nuevo insumo"
                    visible={open}
                    onCancel={this.closeModal}
                    width="30%"
                    maskClosable={true}
                    footer={[null, null]}
                >
                    <InsumosForm
                        onSubmit={this.onSubmit}
                    />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    insumos: state.insumos.list
});

InsumosPage = connect(mapStateToProps, {saveInsumo})(InsumosPage);
export default InsumosPage;