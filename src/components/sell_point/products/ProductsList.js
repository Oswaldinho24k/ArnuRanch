import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from '../../common/Main Loader';
import {ProductCard} from './ProductCard';
import { Row, Col, Button } from 'antd';
import {ProductFilters} from './ProductFilters'



class ProductList extends Component {

goAdd=()=>{
    this.props.history.push('/admin/sp/add')
}



  render() {
    let {products, fetched} = this.props
    console.log(products)
    if (!fetched)return (<MainLoader/>)
    return (
      <div>
        <ProductFilters/>
        <div className="cards-list-container">
        <Row gutter={16}>
            {products.map((p, key)=>(
                <Col span={6}>
                    <ProductCard key={key} {...p} admin={true}/>
                </Col>
             ))}
        </Row> 
        </div>
        <Button type='primary' style={{marginTop:'1%', alignSelf:'right'}} onClick={this.goAdd}>Agregar</Button>
      </div>
    )
  }
};


function mapStateToProps(state, ownProps){
    return {
        products:state.products.list,
        fetched:state.products.list!==undefined
    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}
ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductList;
