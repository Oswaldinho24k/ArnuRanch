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
        return (
            <Fragment>

                <Row gutter={24}>
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
                           
                        </ChartCard>
                    </Col>
                </Row>

                <Row gutter={24} >
                    <Col {...topColResponsiveProps2} >
                        <Card bordered={false} bodyStyle={{ padding: 0 }} >

                            <Tabs size="large" >                               

                                <TabPane tab="GDP" key="gdp" style={{padding: 16, }}>
                                    <Row>
                                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>                                            
                                            <TimelineChart
                                                height={600}
                                                data={salesPieData}
                                                titleMap={{ y1: 'GDP', }}
                                            />                                            
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>

                        </Card>
                    </Col>
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
                </Row>

            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        report:state.animals.report,
        fetched:state.animals.report!==undefined
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
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};

const topColResponsiveProps2 = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
    style: { marginBottom: 24 },
};
