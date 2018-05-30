import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dashboard from "../../admin/Dashboard";
import { Pie, ChartCard, Radar, Bar, MiniArea,
    MiniBar,
    MiniProgress, Field, TimelineChart  } from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';
import Trend from 'ant-design-pro/lib/Trend';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
    List
} from 'antd';




const { TabPane } = Tabs;

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
        x: 'Activos',
        y: 2000,
    },
    {
        x: 'Inactivos',
        y: 1222,
    },

];

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


class AnimalsDashboard extends Component {
    state = {};

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'ARETE',
                dataIndex: 'keyword',
                key: 'keyword',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: 'PESO',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
                //className: styles.alignRight,
            },
            {
                title: 'GANANCIA',
                dataIndex: 'range',
                key: 'range',
                sorter: (a, b) => a.range - b.range,
                render: (text, record) => (
                    <Trend flag={record.status === 1 ? 'down' : 'up'}>
                        <span style={{ marginRight: 4 }}>{text}%</span>
                    </Trend>
                ),
                align: 'right',
            },
        ];

        return (
            <Fragment>

                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Rancho"
                            action={
                                <Tooltip title="Ranchon">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={'$12 6560'}
                            footer={<Field label="Meta" value={'$45, 000'} />}
                            contentHeight={46}
                        >
                            <Trend flag="up" style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down"  >Ganancia 11%</Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Rancho"
                            action={
                                <Tooltip title="Ranchon">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={'$12 6560'}
                            footer={<Field label="Meta" value={'$45, 000'} />}
                            contentHeight={46}
                        >
                            <Trend flag="up"  style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down" >Ganancia 11%</Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Rancho"
                            action={
                                <Tooltip title="Ranchon">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={'$12 6560'}
                            footer={<Field label="Meta" value={'$45, 000'} />}
                            contentHeight={46}
                        >
                            <Trend flag="up"  style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down" >Ganancia 11%</Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Rancho"
                            action={
                                <Tooltip title="Ranchon">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={'$12 6560'}
                            footer={<Field label="Meta" value={'$45, 000'} />}
                            contentHeight={46}
                        >
                            <Trend flag="up" style={{marginRight: 5 }}>
                                Pérdida 12%
                            </Trend>
                            <Trend flag="down" >Ganancia 11%</Trend>
                        </ChartCard>
                    </Col>
                </Row>

                <Row gutter={24} >
                    <Col {...topColResponsiveProps2} >
                        <Card bordered={false} bodyStyle={{ padding: 0 }} >

                            <Tabs size="large" >
                                <TabPane tab="Activos" key="activos" style={{padding: 16}} >
                                    <div style={{overflow: 'hidden' }}>
                                        <TimelineChart
                                            height={400}
                                            data={chartDataNice}
                                            titleMap={{ y1: 'Rancho', y2: 'Arnulfo' }}
                                        />
                                    </div>







                                </TabPane>

                                <TabPane tab="Inactivos" key="inactivos" style={{padding: 16, }}>
                                    <Row>

                                            <div style={{overflow: 'hidden' }} >
                                                <Bar height={292} width={'100%'} title="Fixter" data={salesPieData} />

                                            </div>

                                    </Row>
                                </TabPane>
                            </Tabs>

                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps2} >

                        <Card title={"Próximos a vender"} bordered={false} bodyStyle={{ padding: 16 }} >

                            <Table
                                rowKey={record => record.index}
                                size="small"
                                columns={columns}
                                dataSource={dataTable}
                                pagination={{
                                    style: { marginBottom: 0 },
                                    pageSize: 8,
                                }}
                            />
                        </Card>

                    </Col>
                </Row>








            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    }
}

AnimalsDashboard = connect(mapStateToProps, mapDispatchToProps)(AnimalsDashboard);
export default AnimalsDashboard;
