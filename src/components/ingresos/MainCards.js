import React from 'react';
import { ChartCard, Field, Pie } from 'ant-design-pro/lib/Charts';
import numeral from 'numeral';
import {Row, Col, } from 'antd';


const piedata = [
    {
        x: 'Ganado',
        y: 100,
    },
    {
        x: 'vacunas',
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
        <div>
        <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap'}} >


                    <ChartCard
                        style={{display: 'flex', flex: 1}}
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



                    <ChartCard
                        style={{display: 'flex', flex: 1}}
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




        </div>

        <div>
            <Row>
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
        </div>
    )
};

export default MainCards;