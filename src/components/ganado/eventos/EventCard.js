import React from 'react'
import {Card, Col, Modal} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import FormGasto from "../animals/FormGasto";


export const EventCard = ({created, tipo, cantidad, animal={}, visible, evento, saveGasto}) => {

    return(
        <Col span={4} style={{padding:0}}>
            <Card
            bordered={false}
            style={{margin:5,padding:0}}
            extra={<Link to={`/admin/lotes/${animal.lote.id}`}>{animal.lote.name}</Link>}
            title={animal?<Link to={`/admin/animals/${animal.id}`}>Arete: {animal.arete_rancho}</Link>:'None'} >
                <FormGasto {...evento} saveGasto={saveGasto} style={{padding:0}}/>
            </Card>
        </Col>
    )
}