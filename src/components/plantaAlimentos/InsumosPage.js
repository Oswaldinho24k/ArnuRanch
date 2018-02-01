import React, {Component} from "react";
import {connect} from 'react-redux'
import {InsumosDisplay} from "./InsumosDisplay";

class InsumosPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <InsumosDisplay/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

InsumosPage = connect(mapStateToProps, {})(InsumosPage);
export default InsumosPage;