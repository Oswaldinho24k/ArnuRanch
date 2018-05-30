import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dashboard from "../../admin/Dashboard";
import { Pie, ChartCard, Radar, Bar, MiniArea,
    MiniBar,
    MiniProgress, Field,  } from 'ant-design-pro/lib/Charts';
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
for (let i = 1; i < 6; i += 1) {
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


class AnimalsDashboard extends Component {
    state = {};

    render() {
        return (
            <Fragment>
                <h2>Dash of Animal Section</h2>

                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="总销售额"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={'$12 6560'}
                            footer={<Field label="日均销售额" value={'$45, 000'} />}
                            contentHeight={46}
                        >
                            <Trend flag="up" style={{ marginRight: 16 }}>
                                周同比<span >12%</span>
                            </Trend>
                            <Trend flag="down">
                                日环比<span >11%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="运营活动效果"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total="78%"
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <Trend flag="up" style={{ marginRight: 16 }}>
                                        周同比<span >12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        日环比<span >11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniProgress percent={78} strokeWidth={8} target={100} color="#13C2C2" />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="运营活动效果"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total="18%"
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <Trend flag="up" style={{ marginRight: 16 }}>
                                        周同比<span >12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        日环比<span >11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniProgress percent={18} strokeWidth={8} target={100} color="#13C2C2" />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="运营活动效果"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total="48%"
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <Trend flag="up" style={{ marginRight: 16 }}>
                                        周同比<span >12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        日环比<span >11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniProgress percent={58} strokeWidth={8} target={100} color="#13C2C2" />
                        </ChartCard>
                    </Col>
                </Row>



                <Card bordered={false} bodyStyle={{ padding: 0 }}>

                    <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                        <TabPane tab="Activos" key="activos" style={{padding: 16, }}>
                            <Row>
                                <Col xl={16} lg={12} md={12} sm={24} xs={24} style={{overflow: 'hidden'}}>
                                    <div >
                                        <Bar height={292} title="Fixter" data={salesPieData} />
                                    </div>
                                </Col>
                                <Col xl={8} lg={12} md={12} sm={24} xs={24}
                                     style={{
                                         alignItems: 'center',
                                         flexWrap: 'wrap',
                                         justifyContent: 'center',
                                     }}
                                >
                                    <List
                                        size="small"
                                        header={<div style={{textAlign:'center'}}>Próximos a vender</div>}
                                        footer={null}
                                        bordered
                                        dataSource={rankingListData}
                                        renderItem={item => (<List.Item style={{display:'flex', justifyContent:'center'}} >
                                            <span style={{display:'flex', justifyContent:'center', width:'100%' }}>{item.title}</span>
                                            <span style={{display:'flex', justifyContent:'center', width:'100%' }}>Status: true</span>
                                        </List.Item>)}
                                        style={{margin:20}}

                                    />



                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="Inactivos" key="inactivos" style={{padding: 16, }}>
                            <Row>
                                <Col xl={16} lg={12} md={12} sm={24} xs={24} style={{overflow: 'hidden'}}>
                                    <div >
                                        <Bar height={292} title="Fixter" data={salesPieData} />
                                    </div>
                                </Col>
                                <Col xl={8} lg={12} md={12} sm={24} xs={24}
                                     style={{
                                         alignItems: 'center',
                                         flexWrap: 'wrap',
                                         justifyContent: 'center',
                                     }}
                                >
                                    <List
                                        size="small"
                                        header={<div style={{textAlign:'center'}}>Animales muertos</div>}
                                        footer={null}
                                        bordered
                                        dataSource={rankingListData}
                                        renderItem={item => (<List.Item style={{display:'flex', justifyContent:'center'}} >
                                            <span style={{display:'flex', justifyContent:'center', width:'100%' }}>{item.title}</span>
                                            <span style={{display:'flex', justifyContent:'center', width:'100%' }}>Status: false</span>
                                        </List.Item>)}
                                        style={{margin:20}}

                                    />



                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>

                </Card>




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
