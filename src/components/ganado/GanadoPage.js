import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class GanadoPage extends Component {
    state = {};

    render() {
        return (
            <div>
                Ganado
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

GanadoPage = connect(mapStateToProps, mapDispatchToProps)(GanadoPage);
export default GanadoPage;
