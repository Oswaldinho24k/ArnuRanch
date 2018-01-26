import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class GastosPage extends Component {
    state = {};

    render() {
        return (
            <div>
                Lista general de gastos
            </div>
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

GastosPage = connect(mapStateToProps, mapDispatchToProps)(GastosPage);
export default GastosPage;
