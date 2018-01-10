import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <p> I'm gonna show the detail of the animal number {this.props.match.params.id}</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = () => ({

});

Detalle = connect(mapStateToProps, mapDispatchToProps)(Detalle);
export default Detalle;