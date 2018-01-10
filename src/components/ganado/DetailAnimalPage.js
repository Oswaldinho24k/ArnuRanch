import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Row, Col, Card, Avatar, Divider} from "antd";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import './detailAnimal.css';

const tabList = [{
    key: 'Detalle',
    tab: 'Detalle',
}, {
    key: 'Alimentacion',
    tab: 'Alimentacion',
}];

const contentList = {
    Detalle: <p>content1</p>,
    Alimentacion: <p>content2</p>,
};

class DetailAnimalPage extends Component {
    state = {
        key: 'Detalle',
        noTitleKey: 'article',
    };
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
        <div className={"principal"}>
            <Card
                style={{ width: '100%' }}
                cover={<img alt="example" src="https://psicologia-estrategica.com/wp-content/uploads/2015/12/cow-portrait-1346208-639x427-639x380.jpg" style={{height:250}}/>}
            >
                <Card
                    tabList={tabList}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentList[this.state.key]}
                </Card>
            </Card>
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

DetailAnimalPage = connect(mapStateToProps, mapDispatchToProps)(DetailAnimalPage);
export default DetailAnimalPage;
