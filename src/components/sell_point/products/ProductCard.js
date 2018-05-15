import React from 'react';
import {Card, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';

const {Meta} = Card;

export const  ProductCard = ({id, name, sell_price, in_offer, offer_price, image, description, admin}) => {
  return (
    <Card
    hoverable
    style={{ width: '100%',marginBottom:'10px'}}
    cover={<div style={{width:'100%', height:'250px', overflow:'hidden', backgroundColor:'#e8e8e8'}}>
        <img alt="example" src={image} style={{width:'100%',}}/>
    </div>}
    actions={admin?[
        <Icon type="setting" />, 
        <Link to={`/admin/sp/manage/${id}`}><Icon type="edit" /></Link>,
        <Icon type="ellipsis" />]:''}
    >
    <Meta
      title={name}
      description={description}
    />
  </Card>
 
  )
};

