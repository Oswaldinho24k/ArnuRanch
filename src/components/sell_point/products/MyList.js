import React from 'react';
import {List} from 'antd'
import { ItemCard } from './ItemCard';



export const MyList = ({cart, removeItem, addItem}) => {
  return (
    <List itemLayout="vertical" >
    {cart.items.map((i, key)=>(
                <ItemCard {...i} key={key} removeItem={removeItem} addItem={addItem} position={key}/>
            ))}
      
    </List>
  )
};
