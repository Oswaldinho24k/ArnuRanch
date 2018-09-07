import React, { Component } from 'react'
import FormSalidas from '../animals/FormSalida';
import {Card, List, Divider} from 'antd'
import {Link} from 'react-router-dom'
import MainLoader from '../../common/Main Loader';
//import {bindActionCreators} from "redux";
import {connect} from "react-redux";


class SaleNoteDetail extends Component {

    state={
        list:[],
        disabled:true,
    }

  render() {
      let {match, saleNote, fetched} = this.props;
      let {list, disabled} = this.state;
      console.log(saleNote)

    if(!fetched)return <MainLoader/>
    return (
      <div style={{display:'flex', justifyContent:'space-around'}}>
        <div style={{width:'40%'}}>
        <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>                    
                    <Link to={'/admin/saleNotes'}>
                        Notas de Venta
                    </Link>
                    <Divider type="vertical" />
                    Nota {match.params.id}
                </div>
           
            <FormSalidas clients={list} disabled={disabled} {...saleNote}/>
        </div>
        <Card style={{width:'40%'}}>
            <List
                itemLayout="horizontal"
                dataSource={saleNote.animals}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta                            
                    title={<Link to={`/admin/animals/${item.id}`}>{item.arete_siniga}</Link>}
                    description={item.arete_rancho}
                    />
                </List.Item>
                )}
            />
        </Card>
      </div>
    )
  }
}


function mapStateToProps (state, ownProps) { 
    let saleNote = state.saleNotes.list.find(s=>{return ownProps.match.params.id==s.id})   
    return {
        saleNote,
        fetched:saleNote!==undefined
    }
}
 function mapDispatchToProps(dispatch){
    return{
        //saleNotesActions:bindActionCreators(saleNotesActions, dispatch)
    }
}

SaleNoteDetail = connect(mapStateToProps, mapDispatchToProps)(SaleNoteDetail);
export default SaleNoteDetail
