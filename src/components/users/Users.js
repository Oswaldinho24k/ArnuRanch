import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Users extends Component {
    state = {};

    render() {
        return (
            <h1>Usuarios</h1>
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

Users = connect(mapStateToProps, mapDispatchToProps)(Users);
export default Users;
