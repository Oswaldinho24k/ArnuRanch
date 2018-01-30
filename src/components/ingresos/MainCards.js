import React from 'react';
import { ChartCard, MiniBar, MiniArea, Field, Pie } from 'ant-design-pro/lib/Charts';
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

const piedata = [
    {
        x: 'Ganado',
        y: 100,
    },
    {
        x: 'Vacunas',
        y: 120,
    },
    {
        x: 'Granos',
        y: 88,
    },
    {
        x: 'Fiesta',
        y: 265,
    },
];




const MainCards = ({props}) => {
    return (
        <div className={'admin-main-cards'}>
            <Row>
                <Col span={12}>
                    <ChartCard
                        title="Ganado"
                        avatar={
                            <img
                                style={{ width: 56, height: 56 }}
                                src="https://psicologia-estrategica.com/wp-content/uploads/2015/12/cow-portrait-1346208-639x427-639x380.jpg"
                                alt="indicator"
                            />
                        }
                        total={"$ "+(126560)}
                        footer={<Field label="Promedio" value={"$ "+numeral(12423).format('0,0')} />}
                    />

                </Col>
                <Col span={12}>
                    <ChartCard
                        title="Granos"
                        avatar={
                            <img
                                style={{ width: 56, height: 56 }}
                                src="https://static.vix.com/es/sites/default/files/styles/large/public/imj/lasmanualidades/s/simples-cuadros-realizados-con-variados-granos.jpg?itok=zIwEiiuJ"
                                alt="indicator"
                            />
                        }
                        total={"$ "+(10560)}
                        footer={<Field label="Promedio" value={"$ "+numeral(9423).format('0,0')} />}
                    />
                </Col>

                <Col span={24}>
                    <ChartCard >
                        <Pie
                            hasLegend
                            subTitle="Gastos Arnus"
                            total={"$"+(piedata.reduce((pre, now) => now.y + pre, 0))}
                            data={piedata}
                            valueFormat={val => "$"+(val)}
                            height={193}
                        />
                    </ChartCard>
                </Col>
            </Row>
        </div>
    )
};

export default MainCards;