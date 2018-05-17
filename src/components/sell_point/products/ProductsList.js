import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLoader from '../../common/Main Loader';
import {ProductCard} from './ProductCard';
import { Row, Col, Button, message } from 'antd';
import {ProductFilters} from './ProductFilters'
import ProductsCart from './ProductsCart';
import CheckoutPage from './CheckoutPage';
import * as orderActions from '../../../redux/actions/sellpoint/orders/orderActions'



class ProductList extends Component {

    state={
        search:'',
        category:'',
        cart:{
            items:[],
            total:0,
        }
    }

    goAdd=()=>{
        this.props.history.push('/admin/sp/add')
    }
    handleSearch=(e)=>{
        this.setState({search:e.target.value})
    }
    resetFilters=()=>{
        this.setState({search:'', category:''})
    }
    handleCategory=(value)=>{
        console.log(value)
        this.setState({category:value})
    }

    saveOrder=()=>{
        let order = {}
        let {cart} = this.state
        //order['user'] = this.state.user.id
        order['total'] = cart.total
        order['items'] = []

        for (let i in cart.items){
            let item = {}
            item['product_id'] = cart.items[i].product.id
            item['quantity'] = cart.items[i].quantity
            order.items.push(item)
        }
        console.log(order)
        this.props.orderActions.saveOrder(order)
            .then(r=>{
                console.log(r)
                this.setState({cart:{}})
                message.success('Ordern creada con éxito')
            }).catch(e=>{
                console.log(e)
            })
    }
    //Cart functions
    addItem=(product, position)=>{
        console.log(position)
        let {cart} = this.state
        let filtered = cart.items.filter(i=>{
          return i.product.id !== product.id
        })
        let repetido = cart.items.find(i => {
          return i.product.id === product.id
        });
      
        if(repetido !== undefined){
            repetido.quantity +=1;
            if(product.in_offer){
                repetido.subtotal += parseFloat(repetido.product.offer_price)  
                //filtered.push(repetido)  
                filtered.splice(position, 0, repetido)
              }else{
                repetido.subtotal += parseFloat(repetido.product.sell_price)   
                //filtered.push(repetido) 
                filtered.splice(position, 0, repetido) 
              }
        }else{
            if(product.in_offer){
                let item = {subtotal:parseFloat(product.offer_price), product, quantity:1}
                filtered.push(item)                
            }else{
                let item = {subtotal:parseFloat(product.sell_price), product, quantity:1}
                filtered.push(item)
            }
        }
        cart.items = filtered
        this.setState({cart})
        message.success('Producto Agregado')
        this.getTotal()
        console.log(cart)
      }
      getTotal=()=>{
        //let cart = Object.assign({}, this.state.cart)
        let {cart} = this.state;
        cart.total = 0;
        for(let i in cart.items){
          console.log(cart.items[i])
          cart.total += cart.items[i].subtotal
        }
        this.setState({cart})
      }
      
      removeItem=(product, position)=>{
        let {cart} = this.state
      
        let filtered = cart.items.filter(i=>{
          return i.product.id !== product.id
        })
        let repetido = cart.items.find(i => {
          return i.product.id === product.id
        });
        if(repetido.quantity>=2){
          repetido.quantity -=1;
          if(repetido.in_offer){
            repetido.subtotal -= parseFloat(repetido.product.offer_price)    
            //filtered.push(repetido)
           filtered.splice(position, 0, repetido)
          }else{
            repetido.subtotal -= parseFloat(repetido.product.sell_price)    
            //filtered.push(repetido)
            filtered.splice(position, 0, repetido)
          } 
        }
        cart.items = filtered
        this.setState({cart})
        message.warning('Producto Eliminado')
        this.getTotal()
        console.log(cart)
      }

  render() {
    let {search, category, cart, checkoutOpen} = this.state;
    let {products, fetched, categories} = this.props;
    const regEx = new RegExp(search, 'i');
    let filteredProducts = products.filter(i=>{
        return regEx.test(i.name)
    })
    if(category){
        filteredProducts = filteredProducts.filter(p=>{
            return p.category.id === category
        })
    }
    console.log(products)
    if (!fetched)return (<MainLoader/>)
    return (
      <div>
        <ProductFilters 
            categories={categories}
            search={search}
            handleCategory={this.handleCategory}
            resetFilters={this.resetFilters}
            handleSearch={this.handleSearch}/>
        <div className="cards-list-container">
            <ProductsCart cart={cart} removeItem={this.removeItem} addItem={this.addItem} saveOrder={this.saveOrder}/>
            
            <Row gutter={16}>
                {filteredProducts.map((p, key)=>(
                    <Col span={6} key={key}>
                        <ProductCard  {...p} admin={true} product={p} removeItem={this.removeItem} addItem={this.addItem}/>
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
        categories:state.categories.list,
        fetched:state.products.list!==undefined && state.categories.list!==undefined,
        
    }
}

function mapDispatchToProps(dispatch){
    return {
        orderActions:bindActionCreators(orderActions, dispatch)
    }
}
ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductList;
