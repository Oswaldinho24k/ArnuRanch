import React, {Component, Fragment} from 'react';
import {Button, Input, Divider} from 'antd'
import {connect} from 'react-redux'

class EventosList extends Component {

    state={
        searchText:''
    }

    render() {
        const {searchText} = this.state
        return (
            <>
                <h2>Lista de eventos Registrados</h2>
                <div>
                    <Input.Search
                        enterButton
                        onSearch={this.onSearch}
                        onChange={this.handleSearch}
                        value={searchText}
                        style={{ width: 200 }}
                        placeholder={'Busca por ...'}/>
                    <Divider type={'vertical'}/>
                </div>
                <div>
                    la lista
                </div>
                <div>add button Paginador</div>
            </>
        );
    }
}

const mapStateToProps=(state, oP)=>{
    return{
        //eventos:state.eventos.list,
        //fetched:state.eventos.list!==undefined
    }
}


EventosList = connect(mapStateToProps,{})(EventosList)
export default EventosList;