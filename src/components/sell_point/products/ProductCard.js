import React from 'react';
import {Card, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';

const {Meta} = Card;

export const  ProductCard = ({id, name, sell_price, in_offer, offer_price, image, description, admin, addItem, removeItem, product}) => {
  return (
    <Card
    hoverable
    style={{ width: '100%',marginBottom:'10px', height:'445px', overflow:'hidden'}}
    cover={
    <div 
      style={{width:'100%', height:'250px', overflow:'hidden', backgroundColor:'#e8e8e8'}} 
      onClick={()=>addItem(product)}>
        <img alt="example" src={image} style={{width:'100%',}} />
    </div>}
    actions={admin?[
        
        <Link to={`/admin/sp/manage/${id}`}><Icon type="edit" /></Link>]:''}
    >
    <Meta
      title={<h2 style={{margin:0}}>{name}</h2>}
      description={
      <div>
        {in_offer?
        <span style={{display:'flex'}}>
            <h4>${offer_price}</h4>
            <h6 style={{textDecoration:'line-through'}}>${sell_price}</h6>
        </span>:
        <h4>${sell_price}</h4>}
        <p>{description}</p>
      </div>}
    />
  </Card>
 
  )
};

