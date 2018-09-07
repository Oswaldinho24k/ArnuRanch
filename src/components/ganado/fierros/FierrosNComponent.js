import React from 'react'
import { Card, Icon } from 'antd';

const { Meta } = Card;




export const FierrosNComponent = ({fierros}) => (
    <div style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start'}}>
        {fierros.map((o, key)=>(
            <Card
                key={key}
                hoverable
                style={{ width: 240, margin:'0 10px 10px 0' }}
                cover={<img src={o.imagen}/>}
            >
                <Meta
                    title={o.codigo}
                />
            </Card>
        ))}

    </div>
)