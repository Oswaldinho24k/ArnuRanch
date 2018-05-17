import React from 'react';
import {List, Avatar, Button} from 'antd'

export const ItemCard = ({product, quantity, subtotal, addItem, removeItem, position}) => {
  return (
    <List.Item
        actions={[
            <Button type="primary" shape="circle" icon="plus" onClick={()=>addItem(product, position)}/>,
            <Button type="primary" shape="circle" icon="minus" onClick={()=>removeItem(product, position)} /> ]}
        extra={<img style={{width:100, height:100, overflow:'hidden'}} alt="logo" src={product.image}/>}>
        <List.Item.Meta title={product.name} description={<span>x{quantity} = ${subtotal}</span>  }/>
    </List.Item>
  )
};
