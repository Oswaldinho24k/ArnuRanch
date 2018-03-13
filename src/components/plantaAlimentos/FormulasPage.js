import React, {Component} from "react";
import {connect} from 'react-redux';
import {metadata} from "./metadataFormulas";
import {Button, Table, Popconfirm, Divider} from "antd";
import {Link, Route, Switch} from "react-router-dom";
import FormulasForm from "./FormulasForm";
import {deleteFormula} from '../../redux/actions/plantaAlimentos/formulasActions';

export const showMessage = (message, style) => {
    setTimeout(
        console.log.bind(
            console,
            `%c ${message} %c`,
            style,
            ""
        )
    );
};
const path = "/admin/planta_alimentos/formulas/:id";
const absolutePath = "/admin/planta_alimentos/formulas/";

class FormulasPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowsKeys: []
        };
    }

    componentWillMount(){
        /*showMessage("Detente", "color:red;font-size:40px;");
        showMessage(
            "El uso de la consola es para fines de " +
            "desarrollo, cualquier actividad distinta a " +
            "ésta es considerda un delito",
            "color:#8F939F;font-size:15px;text-align:justify;"
        );*/
    }

    closeModal = () => {
        this.props.history.push(absolutePath);
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.history.push(absolutePath);
    };

    onDelete = id => {
        this.props.deleteFormula(id)
            .then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            });
        this.closeModal();
    };

    deleteSelection = () => {

            const {selectedRowsKeys} = this.state;
            selectedRowsKeys.forEach( key => this.onDelete(key));

        this.setState({selectedRowsKeys:[]})
    };
    confirm=()=>{
        this.deleteSelection()
    };
    cancel=()=>{
        console.log('ok')
    }

    render() {
        const {columns} = metadata;
        const {formulas} = this.props;
        const {selectedRowsKeys} = this.state;
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({selectedRowsKeys:selectedRowKeys})
            }
        };

        const expandedRowRender = (record, key) => {
            const {columnsNestedTable} = metadata;
            return (
                <Table
                    columns={columnsNestedTable}
                    dataSource={record.items}
                    size={'small'}
                    rowKey={(record)=> record.id}
                    pagination={false}
                />
            );
        };
        return (
            <div>
                <h2>Fórmulas</h2>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}

                    dataSource={formulas}
                    expandedRowRender={expandedRowRender}
                    rowKey={record => record.id}
                    scroll={{x: 650}}
                />
                <Link to={absolutePath + 'add'}>
                    <Button
                        type="primary"
                    >
                        Agregar
                    </Button>
                </Link>
                <Divider/>
                {
                    selectedRowsKeys.length > 0 &&
                    <Popconfirm title="Seguro que borrarás los items?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <Button
                            type="danger"

                        >
                            Eliminar
                        </Button>
                    </Popconfirm>
                }
                <Switch>
                    <Route path={path} render={FormulasFormRender}/>
                </Switch>
            </div>
        );
    }
}

const
    mapStateToProps = state => ({
        formulas: state.formulas.list,
        items: state.items.list
    });

FormulasPage = connect(mapStateToProps, {deleteFormula})(FormulasPage);
export default FormulasPage;