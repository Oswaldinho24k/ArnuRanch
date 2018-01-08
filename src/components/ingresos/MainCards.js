import React from 'react';
import { ChartCard, MiniBar, MiniArea, Field } from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import {Row, Col, Card, Icon, Avatar, Tooltip} from 'antd';
import graph from '../../descarga.png';



const { Meta } = Card;

const visitData = [
    {
        x: '2017-09-01',
        y: 100,
    },
    {
        x: '2017-09-02',
        y: 120,
    },
    {
        x: '2017-09-03',
        y: 88,
    },
    {
        x: '2017-09-04',
        y: 65,
    },
];




const MainCards = ({props}) => {
    return (
        <div className={'admin-main-cards'}>
            <Row>


                <Col span={6}>
                    <ChartCard
                        title="Ventas del año"
                        action={<Tooltip title="LOL"><Icon type="exclamation-circle-o" /></Tooltip>}
                        total="6,500"
                        footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}

                    >
                        <NumberInfo
                            subTitle={<span>Simon</span>}
                            total={numeral(12321).format('0,0')}
                            status="up"
                            subTotal={17.1}
                        />
                        <MiniBar
                            height={46}
                            data={visitData}
                        />
                    </ChartCard>

                </Col>
                <Col span={6}>
                    <ChartCard

                        title="Lineal"
                        action={<Tooltip title="lol"><Icon type="exclamation-circle-o" /></Tooltip>}
                        total="6,500"
                        footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                    >
                        <NumberInfo
                            subTitle={<span>Simon</span>}
                            total={numeral(12321).format('0,0')}
                            status="up"
                            subTotal={17.1}
                        />
                        <MiniArea
                            line
                            height={46}
                            data={visitData}
                        />
                    </ChartCard>
                </Col>
                <Col span={6}>
                    <ChartCard

                        title="Lineal"
                        action={<Tooltip title="lol"><Icon type="exclamation-circle-o" /></Tooltip>}
                        total="6,500"
                        footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                    >
                        <NumberInfo
                            subTitle={<span>Simon</span>}
                            total={numeral(12321).format('0,0')}
                            status="up"
                            subTotal={17.1}
                        />
                        <MiniArea
                            line
                            height={46}
                            data={visitData}
                        />
                    </ChartCard>
                </Col>
                <Col span={6}>
                    <ChartCard

                        title="Lineal"
                        action={<Tooltip title="lol"><Icon type="exclamation-circle-o" /></Tooltip>}
                        total="6,500"
                        footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                    >
                        <NumberInfo
                            subTitle={<span>Simon</span>}
                            total={numeral(12321).format('0,0')}
                            status="up"
                            subTotal={17.1}
                        />
                        <MiniArea
                            line
                            height={46}
                            data={visitData}
                        />
                    </ChartCard>
                </Col>
            </Row>
        </div>
    )
};

export default MainCards;