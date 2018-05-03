import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dashboard from "../../admin/Dashboard";
import { Pie, ChartCard, Radar, Bar, MiniArea } from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import {Col, Row} from 'antd';
import numeral from 'numeral';
import moment from 'moment';

const salesPieData = [
    {
        x: 'Lote1',
        y: 4544,
    },
    {
        x: 'Lote2',
        y: 3321,
    },
    {
        x: 'Lote3',
        y: 3113,
    },
    {
        x: '服饰箱包',
        y: 2341,
    },
    {
        x: '母婴产品',
        y: 1231,
    },
    {
        x: '其他',
        y: 1231,
    },
];

const radarOriginData = [
    {
        name: 'animal123',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7,
    },
    {
        name: 'animal2',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
    },
    {
        name: 'animal3',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
    },
];
const radarData = [];
const radarTitleMap = {
    ref: '1200',
    koubei: '1300',
    output: '1400',
    contribute: '1500',
    hot: '1600',
};
radarOriginData.forEach((item) => {
    Object.keys(item).forEach((key) => {
        if (key !== 'name') {
            radarData.push({
                name: item.name,
                label: radarTitleMap[key],
                value: item[key],
            });
        }
    });
});




class AnimalsDashboard extends Component {
    state = {};

    render() {
        return (
            <div>
                <h2>Dash of Animal Section</h2>

                <Row gutter={12}>
                    <Col span={24}>
                        <ChartCard>
                            <Pie
                                hasLegend
                                subTitle="Last numbers"
                                total={"$"+(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                                data={salesPieData}
                                valueFormat={val => "$"+(val)}
                                height={193}
                            />
                        </ChartCard>

                    </Col>
                    <Col span={8}>
                        <ChartCard style={{width:'100%'}}>
                            <NumberInfo
                                subTitle={<span>NUmbers</span>}
                                total={numeral(12321).format('0,0')}
                                status="up"
                                subTotal={17.1}
                            />
                            <Radar
                                hasLegend
                                height={250}
                                data={radarData}
                            />
                        </ChartCard>
                    </Col>
                    <Col span={8}>
                        <ChartCard>
                            <NumberInfo
                                subTitle={<span>NUmbers</span>}
                                total={numeral(12321).format('0,0')}
                                status="up"
                                subTotal={17.1}
                            />
                            <Bar
                                height={250}
                                title="NUmbers"
                                data={salesPieData}
                            />
                        </ChartCard>
                    </Col>
                    <Col span={8}>
                        <ChartCard>
                            <NumberInfo
                                subTitle={<span>NUmbers</span>}
                                total={numeral(12321).format('0,0')}
                                status="up"
                                subTotal={17.1}
                            />
                            <MiniArea
                                line
                                height={250}
                                data={salesPieData}
                            />
                        </ChartCard>
                    </Col>
                </Row>


            </div>
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
