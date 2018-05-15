import React from 'react';
import {Divider, Select, Button, Input} from 'antd'

export const ProductFilters = () => {
  return (
    <div style={{padding:'1% 0'}}>
       {/*<Input.Search
            enterButton
            onSearch={this.onSearch}
            onChange={this.handleSearch}
            value={searchText}
            style={{ width: 400 }}
            placeholder={'Busca por propietario, arete rancho o arete siniga'}/>
        <Divider
            type={'vertical'}/>
        <Select
            value={loteFilter}
            mode="combobox"
            style={{ width: 200 }}
            onChange={this.handleChange}
            onSelect={this.filterByLote}
            placeholder="Filtra por nombre de lote"
            filterOption={false}
        >
            {optionsLote.map(d => <Option value={d.name} key={d.id}>{d.name}</Option>)}
        </Select>
        <Divider
            type={'vertical'}/>
        <Button
            type="primary"
            disabled={!canReset}
            onClick={this.resetFilters}>Restablecer</Button>*/}
            <Input.Search
            enterButton
            style={{ width: 400 }}
            placeholder={'Busca por propietario, arete rancho o arete siniga'}/>
        <Divider
            type={'vertical'}/>
        <Select
           
            mode="combobox"
            style={{ width: 200 }}
            placeholder="Filtra por nombre de lote"
            filterOption={false}
        >
           
        </Select>
        <Divider
            type={'vertical'}/>
        <Button
            type="primary"
           >Restablecer</Button>
    </div>
  )
};
