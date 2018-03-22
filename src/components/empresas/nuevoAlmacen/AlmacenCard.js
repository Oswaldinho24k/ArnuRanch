import React from 'react';
import {Card, Button} from 'antd';
import {Link} from 'react-router-dom';

const gridStyle = {
    width: '100%',
    height: '150px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding:'80px'
};

const AlmacenCard = ({info})=>{
    return(


            info.map(p =>(
                <div>
                <Button type="primary" onClick={()=>console.log(p.id)}>Delete Almacen</Button>
                <Link to={`/admin/empresas/inventario/${p.id}`} style={{color:'black', margin:'10px'}} key={p.id} >
                    <Card.Grid style={gridStyle}>
                        <div>{p.name}</div>
                    </Card.Grid>
                </Link>
                </div>
            ))
    )
};

export default AlmacenCard;