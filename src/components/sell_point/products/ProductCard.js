import React from 'react';
import {Card, Icon, Divider} from 'antd';

const {Meta} = Card;

export const  ProductCard = ({name, sell_price, in_offer, offer_price, image, description}) => {
  return (
    <Card
    hoverable
    style={{ width: '100%',marginBottom:'10px'}}
    cover={<div style={{width:'100%', height:'250px', overflow:'hidden', backgroundColor:'#e8e8e8'}}>
        <img alt="example" src={image} style={{width:'100%',}}/>
    </div>}
    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
  >
    <Meta
      title={name}
      description={description}
    />
  </Card>
 
  )
};

