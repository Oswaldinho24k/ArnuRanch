import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class AnimalsPage extends Component {
    state = {};

    render() {
        return (
            <div>
                Animals
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

AnimalsPage = connect(mapStateToProps, mapDispatchToProps)(AnimalsPage);
export default AnimalsPage;
