import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dashboard from "../../admin/Dashboard";
import {Link} from 'react-router-dom'
import { Pie, ChartCard, Radar, Bar, MiniArea,MiniBar,MiniProgress, Field, TimelineChart  } from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';
import Trend from 'ant-design-pro/lib/Trend';
import {Row,Col,Icon,Card,Tabs,Table,Radio,DatePicker,Tooltip,Menu,Dropdown,List, Divider} from 'antd';
import MainLoader from '../../common/Main Loader';

import {ChartCard, Bar, Field, TimelineChart  } from 'ant-design-pro/lib/Charts';

import moment from 'moment';
import Trend from 'ant-design-pro/lib/Trend';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Tooltip,
} from 'antd';
import MainLoader from "../../common/Main Loader";





const { TabPane } = Tabs;

const columns = [{
    title: 'Arete',
    dataIndex: 'arete_rancho',
    render:(t, obj)=><Link to={`/admin/animals/${obj.id}`}>{obj.arete_rancho}</Link>,
    key: 'arete_rancho',
  }, {
    title: 'Lote',
    dataIndex: 'lote',
    render:(t, obj)=><Link to={`/admin/lotes/${obj.lote.id}`}>{obj.lote.name}</Link>,
    key: 'lote',
  }, {
    title: 'Última Pesada',
    dataIndex: 'pesadas',
    render:(t, obj)=><div>
                        <strong><span style={{margin:0, }}>{obj.pesadas[obj.pesadas.length-1].peso}Kg</span></strong>
                        <Divider type="vertical" />
                        <span>{moment(obj.pesadas[obj.pesadas.length-1].date).format('L')}</span>
                    </div>,
    key: 'pesadas',
  },];

const rankingListData = [];
for (let i = 1; i < 9; i += 1) {
    rankingListData.push({
        title: `Arete Rancho ${i}`,
        total: 323234,
    });
}

const chartData = [];
for (let i = 0; i < 20; i += 1) {
    chartData.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
    });
}

let chartDataNice=[

        {x: 1527704497345, y1: 53, y2: 34},


        {x: 1527706297345, y1: 34, y2: 85},


        {x: 1527708097345, y1: 105, y2: 81},


        {x: 1527709897345, y1: 60, y2: 27},


        {x: 1527711697345, y1: 48, y2: 72},


        {x: 1527713497345, y1: 83, y2: 43},


        {x: 1527715297345, y1: 51, y2: 49},


        {x: 1527717097345, y1: 85, y2: 47},


        {x: 1527718897345, y1: 20, y2: 16},


        {x: 1527720697345, y1: 62, y2: 29},

        {x: 1527722497345, y1: 40, y2: 108},

        {x: 1527724297345, y1: 76, y2: 41},

        {x: 1527726097345, y1: 44, y2: 48},

        {x: 1527727897345, y1: 103, y2: 102},

        {x: 1527729697345, y1: 76, y2: 60},

        {x: 1527731497345, y1: 100, y2: 21},

        {x: 1527733297345, y1: 47, y2: 18},

        {x: 1527735097345, y1: 103, y2: 90},

        {x: 1527736897345, y1: 60, y2: 28},

        {x: 1527738697345, y1: 81, y2: 16}
];

let dataTable =[
    {index: 1, keyword: "Arete-0", count: 155, range: 89, status: 0},
{index: 2, keyword: "Arete-1", count: 986, range: 49, status: 0},
{index: 3, keyword: "Arete-2", count: 694, range: 13, status: 1},
{index: 4, keyword: "Arete-3", count: 823, range: 93, status: 0},
{index: 5, keyword: "Arete-4", count: 528, range: 64, status: 0},
{index: 6, keyword: "Arete-5", count: 134, range: 14, status: 1},
{index: 7, keyword: "Arete-6", count: 784, range: 35, status: 1},
{index: 8, keyword: "Arete-7", count: 462, range: 15, status: 1},
{index: 9, keyword: "Arete-8", count: 17, range: 59, status: 0},
{index: 10, keyword: "Arete-9", count: 810, range: 28, status: 1},
{index: 11, keyword: "Arete-10", count: 503, range: 47, status: 1},
{index: 12, keyword: "Arete-11", count: 30, range: 65, status: 1},
{index: 13, keyword: "Arete-12", count: 521, range: 86, status: 0},
{index: 14, keyword: "Arete-13", count: 364, range: 96, status: 0},
{index: 15, keyword: "Arete-14", count: 834, range: 15, status: 0},
{index: 16, keyword: "Arete-15", count: 994, range: 97, status: 0},
];

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
    });
}


const salesPieData = [
    {
        x: 0,
        y1: 0,
       
    },
    {
        x: 100,
        y1: .5,
       
    },
    {
        x: 150,
        y1: 1,
       
    },
    {
        x: 200,
        y1: 1.5,
       
    },
    {
        x: 250,
        y1: 2,
       
    },
    {
        x: 300,
        y1: 2.5,
       
    },
    {
        x: 350,
        y1: 2,
       
    },
    {
        x: 400,
        y1: 1,
       
    },
    

];



class AnimalsDashboard extends Component {
    state = {};

    render() {

        let {report, fetched} = this.props
        if(!fetched) return(<MainLoader/>)


        let {fetched, dataGanado, activos, inactivos} = this.props;
        if(activos === undefined)return(<MainLoader/>);
        console.log("DD", activos)
        console.log("LLL", inactivos)
        let dat=[{
            x:"Activos",
            y:activos.count
        },{
            x:"Inactivos",
            y:inactivos
        }
        ];

        console.log("II", dat)

        console.log("DATA", dataGanado)

        const columns = [
            {
                title: 'Arete Rancho',
                dataIndex: 'arete_rancho',
                key: 'arete_rancho',
            },
            {
                title: 'Tipo',
                dataIndex: 'tipo_animal',
                key: 'tipo_animal',
            },
            {
                title: 'Peso',
                dataIndex: 'pesadas',
                key: 'pesadas',
                render:(pesadas)=><span>{pesadas && pesadas.peso !==undefined?pesadas.peso+" kg":"0 kg"}</span>

            },
            {
                title: 'Factura',
                dataIndex: 'ref_factura_original',
                key: 'ref_factura_original',
                render:(ref_factura_original)=><span>{ref_factura_original && ref_factura_original.factura !==undefined?ref_factura_original.factura:"No factura"}</span>
            },
        ];


        return (
            <Fragment>

                <Row gutter={24}>
                <Col {...topColResponsiveProps2} >

                        <Card title={"Próximos a vender"} bordered={false} bodyStyle={{ padding: 16 }} >
                        <Table 
                            dataSource={report.proximos} 
                            columns={columns} 
                            pagination={{
                                pageSize: 8,
                                total:report.proximos?report.proximos.length:0,           
                                showTotal:total => `Total: ${total} aretes`}}/>
                       
                        </Card>

                    </Col>
                <Col {...topColResponsiveProps3}>
                    <Row gutter={12}> 
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}

                            title="Valor del Inventario"
                            action={
                                <Tooltip title="Inventario$">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={`$${report.aretes_activos?(report.aretes_activos.valor_inicial+report.aretes_activos.gastos_cash):0}`}                            
                            contentHeight={46}
                        >
                           

                            title="Aretes Activos"
                            action={
                                <Tooltip title="Aretes Activos Gastos">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={dataGanado.aretes_activos && dataGanado.aretes_activos.gastos_cash !==null ?"$ "+dataGanado.aretes_activos.gastos_cash:"$0"}
                            footer={<Field label="Valor Inicial" value={dataGanado.aretes_activos && dataGanado.aretes_activos.valor_inicial !==null ?"$ "+dataGanado.aretes_activos.valor_inicial:"$0"} />}
                            contentHeight={46}
                        >
                            {/*<Trend flag="up" style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down"  >Ganancia 11%</Trend>*/}

                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}

                            title="Ganancia Diaria Promedio"
                            action={
                                <Tooltip title="GDP">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={`${report.gdpPromedio?report.gdpPromedio.toFixed(4):0}kg`}                            
                            contentHeight={46}
                        >
                           

                            title="Gastos Alimentos"
                            action={
                                <Tooltip title="Gastos Alimentos">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={dataGanado.gastos_alimento && dataGanado.gastos_alimento.costo_alimento !==null ?"$ "+dataGanado.gastos_alimento.costo_alimento:"$0"}
                            footer={<Field label="Kg Alimento" value={dataGanado.gastos_alimento && dataGanado.gastos_alimento !==null ?dataGanado.gastos_alimento.kg_alimento+" kg":"$0"} />}
                            contentHeight={46}
                        >
                            {/*<Trend flag="up"  style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down" >Ganancia 11%</Trend>*/}

                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}

                            title="Conversión"
                            action={
                                <Tooltip title="Conversión">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={`${report.conversionPromedio?report.conversionPromedio.toFixed(4):0}%`}                            
                            contentHeight={46}
                        >
                           

                            title="Gastos"
                            action={
                                <Tooltip title="Gastos">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={dataGanado.gastos && dataGanado.gastos.suma_gastos !==null ?"$ "+dataGanado.gastos.suma_gastos:"$0"}
                            footer={<Field label="" value={''} />}
                            contentHeight={46}
                        >
                            {/*<Trend flag="up"  style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down" >Ganancia 11%</Trend>*/}

                        </ChartCard>

                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}

                            title="Consumo DIario Promedio"
                            action={
                                <Tooltip title="CDP">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={`${report.cdpPromediokg?report.cdpPromediokg.toFixed(4):0}Kg`}                            
                            contentHeight={46}
                        >
                           

                            title="Gasto Vacuna"
                            action={
                                <Tooltip title="Gastos Vacuna">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={dataGanado.gastos_vacuna && dataGanado.gastos_vacuna.suma_gastos_vacuna !==null ?dataGanado.gastos_vacuna.suma_gastos_vacuna:"$0"}
                            footer={<Field label="" value={''} />}
                            contentHeight={46}
                        >
                           {/* <Trend flag="up" style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down" >Ganancia 11%</Trend>*/}

                        </ChartCard>
                    </Col>
                    </Row>
                </Col>
                </Row>

                <Row gutter={24} >
                    {/* <Col {...topColResponsiveProps2} >
                        <Card bordered={false} bodyStyle={{ padding: 0 }} >



                            <Tabs size="large" >
                                <TabPane tab="Activos" key="activos" style={{padding: 16}} >
                                    <div style={{overflow: 'hidden' }}>
                                        <Bar height={292} width={'100%'} title="Fixter" data={dat} />

                                    </div>








                                <TabPane tab="GDP" key="1" style={{padding: 16, }}>
                                    <Row>
                                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>                                            
                                        <MiniArea
                                            line
                                            color="#cceafe"
                                            height={45}
                                            data={salesPieData}
                                        />                                          
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="GDP" key="gdp" style={{padding: 16, }}>
                                    <Row>

                                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>                                            
                                            <TimelineChart
                                                height={600}
                                                data={salesPieData}
                                                titleMap={{ y1: 'GDP', }}
                                            />                                            
                                        </Col>


                                            <div style={{overflow: 'hidden' }} >
                                                <TimelineChart
                                                    height={400}
                                                    data={chartDataNice}
                                                    titleMap={{ y1: 'Rancho', y2: 'Arnulfo' }}
                                                />


                                            </div>


                                    </Row>
                                </TabPane>
                            </Tabs>

                        </Card>
                    </Col> */}
                    {/* <Col {...topColResponsiveProps2} >

                        <Card title={"Próximos a vender"} bordered={false} bodyStyle={{ padding: 16 }} >

                        <Table 
                            dataSource={report.proximos} 
                            columns={columns} 
                            pagination={{
                                pageSize: 8,
                                total:report.proximos?report.proximos.length:0,           
                                showTotal:total => `Total: ${total} aretes`}}/>
                       


                            <Table
                                rowKey={record => record.id}
                                size="small"
                                columns={columns}
                                dataSource={dataGanado.proximos}
                                pagination={{
                                    style: { marginBottom: 0 },
                                    pageSize: 8,
                                }}
                            />

                        </Card>

                    </Col> */}
                </Row>

            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    let info = state.dataDash.dataDash;
    let activos = info.aretes_activos;
    let inactivos = info.aretes_inactivos;
    return {

        report:state.animals.report,
        fetched:state.animals.report!==undefined

        activos,
        inactivos,
        dataGanado: state.dataDash.dataDash,
        //fetch:state.dataDash.dataDash !== null,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    }
}

AnimalsDashboard = connect(mapStateToProps, mapDispatchToProps)(AnimalsDashboard);
export default AnimalsDashboard;



const topColResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
    style: { marginBottom: 24 },
};

const topColResponsiveProps2 = {
    xs: 24,
    sm: 24,
    md: 18,
    lg: 18,
    xl: 18,
    style: { marginBottom: 24 },
};
const topColResponsiveProps3 = {
    xs: 24,
    sm: 24,
    md: 6,
    lg: 6,
    xl: 6,
    style: { marginBottom: 24 },
};
