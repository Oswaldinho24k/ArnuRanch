import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CuentasBanco extends Component {
    state = {};

    render() {
        return (
            <h1>Cuentas de Banco</h1>
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

CuentasBanco = connect(mapStateToProps, mapDispatchToProps)(CuentasBanco);
export default CuentasBanco;
