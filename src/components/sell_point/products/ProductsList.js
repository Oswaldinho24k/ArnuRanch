import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from '../../common/Main Loader';
import {ProductCard} from './ProductCard';
import { Row, Col } from 'antd';
import {ProductFilters} from './ProductFilters'



class ProductList extends Component {



  render() {
    let {products, fetched} = this.props
    console.log(products)
    if (!fetched)return (<MainLoader/>)
    return (
      <div>
        <ProductFilters/>
        <Row gutter={16}>
            {products.map((p, key)=>(
                <Col span={8}>
                    <ProductCard key={key} {...p}/>
                </Col>
             ))}
        </Row> 
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
