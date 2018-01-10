import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class BatchDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <p> I'm gonna show the detail of the batch number {this.props.match.params.id}</p>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = () => ({

});

BatchDetailPage = connect(mapStateToProps, mapDispatchToProps)(BatchDetailPage);
export default BatchDetailPage;