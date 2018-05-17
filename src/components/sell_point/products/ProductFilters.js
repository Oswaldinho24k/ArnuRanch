import React from 'react';
import {Divider, Select, Button, Input} from 'antd'

const {Option} = Select;

export const ProductFilters = ({handleSearch, search, handleCategory, categories, resetFilters}) => {
  return (
    <div style={{padding:'0 0 1% 0'}}>
            <Input
            onChange={handleSearch}
            style={{ width: 400 }}
            value={search}
            placeholder={'Busca por nombre'}/>
        <Divider
            type={'vertical'}/>
        <Select defaultValue="Todos" style={{ width: 120 }} onChange={handleCategory}>
           {categories.map((c, key)=>(<Option key={key} value={c.id}>{c.name}</Option>))}
        </Select>
        <Divider
            type={'vertical'}/>
        <Button type="primary" onClick={resetFilters}>Reset</Button>
       
    </div>
  )
};
