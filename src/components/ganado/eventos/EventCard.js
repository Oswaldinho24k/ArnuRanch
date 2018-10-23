import React from 'react'
import {Card, Col} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'


export const EventCard = ({created, tipo, cantidad, animal={}}) => {
    return(
        <Col span={4}>
            <Card bordered={false} style={{margin:10}}>
                <h4>{moment(created).format('LL')}</h4>
                {animal?<Link to={`/admin/animals/${animal.id}`}>{animal.arete_rancho}</Link>:''}
                <p>{cantidad}</p>
            </Card>
        </Col>
    )
}