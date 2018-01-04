import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class EgresosPage extends Component {
    state = {};

    render() {
        return (
            <div>
                egresos
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

EgresosPage = connect(mapStateToProps, mapDispatchToProps)(EgresosPage);
export default EgresosPage;
