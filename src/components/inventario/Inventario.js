import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Inventario extends Component {
    state = {};

    render() {
        return (
            <h1>Inventario</h1>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    }
}

Inventario = connect(mapStateToProps, mapDispatchToProps)(Inventario);
export default Inventario;
