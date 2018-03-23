import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormGasto from "../animals/FormGasto";

class EventosPage extends Component {
    state = {};

    render() {
        return (
            <div>
                <FormGasto/>
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

EventosPage = connect(mapStateToProps, mapDispatchToProps)(EventosPage);
export default EventosPage;
