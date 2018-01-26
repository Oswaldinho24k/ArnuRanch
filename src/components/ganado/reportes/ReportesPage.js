import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ReportesPage extends Component {
    state = {};

    render() {
        return (
            <div>
                reportes page
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

ReportesPage = connect(mapStateToProps, mapDispatchToProps)(ReportesPage);
export default ReportesPage;
