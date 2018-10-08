import React, {Component} from "react";
import {connect} from 'react-redux'
import {metadata} from "./metadataInsumos";
import {Button, Table, Divider, message} from "antd";
import InsumosForm from "./InsumosForm";
import {saveInsumo, editInsumo, deleteInsumo} from '../../redux/actions/plantaAlimentos/insumosActions'
import {Link, Route, Switch} from "react-router-dom";


const path = "/admin/planta_alimentos/insumos/:id";
const absolutePath = "/admin/planta_alimentos/insumos/";

class InsumosPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedRowsKeys: []
        };
    }

    closeModal = () => {
        this.props.history.push(absolutePath);
    };

    onSubmit = (insumo) => {
        try {
            insumo.unit_price = parseFloat(parseFloat(insumo.unit_price).toFixed(2));
            insumo.freight = parseFloat(parseFloat(insumo.freight).toFixed(2));
            insumo.loading_maneuver = parseFloat(parseFloat(insumo.loading_maneuver).toFixed(2));
            insumo['unit_price_total'] = insumo.unit_price + insumo.freight + insumo.loading_maneuver;
            insumo.unit_price_total = parseFloat(insumo.unit_price_total.toFixed(2));
        } catch (e) {

        }

        if (insumo.id) {
            this.props.editInsumo(insumo)
                .then(r => {

                    message.success('Guardado')
                })
                .catch(e => {

                    message.error(e)
                });
            this.closeModal();
        }else {
            this.props.saveInsumo(insumo)
                .then(r => {
                    message.success('Cambios guardados');

                })
                .catch(e => {

                    message.error(e)
                });
            this.closeModal();
        }
    };

    onDelete = (id) => {
        this.props.deleteInsumo(id)
            .then(r => {

            })
            .catch(e => {

            });
        this.closeModal();
    };

    deleteSelection = () => {
        const response = window.confirm('¿Seguro que quieres eliminar los insumos selecionados?');
        if (response) {
            const {selectedRowsKeys} = this.state;
            selectedRowsKeys.forEach( key => this.onDelete(key));
        }
        this.setState({selectedRowsKeys:[]})
    };

    render() {
        const {columns} = metadata;
        const {insumos} = this.props;
        const {selectedRowsKeys} = this.state;
        const InsumosFormRender = (props) => (
            <InsumosForm
                onSubmit={this.onSubmit}
                title="Agregar nuevo insumo"
                width="30%"
                onCancel={this.closeModal}
                onDelete={this.onDelete}
                {...this.props}
                {...props}
            />
        );
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //
                this.setState({selectedRowsKeys:selectedRowKeys})
            }
        };
        return (
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Planta de Alimentos
                    <Divider type="vertical" />
                    Insumos

                </div>
                <h2>Insumos</h2>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={insumos}
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
                {
                    selectedRowsKeys.length > 0 &&
                    <Button
                        type="danger"
                        onClick={this.deleteSelection}
                    >
                        Eliminar
                    </Button>
                }

                <Switch>
                    <Route path={path} render={InsumosFormRender}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    insumos: state.insumos.list
});

InsumosPage = connect(mapStateToProps, {saveInsumo, editInsumo, deleteInsumo})(InsumosPage);
export default InsumosPage;