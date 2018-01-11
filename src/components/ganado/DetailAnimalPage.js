import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Row, Col, Card, Avatar, Divider} from "antd";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';

const tabList = [{
    key: 'Detalle',
    tab: 'Detalle',
}, {
    key: 'Alimentacion',
    tab: 'Alimentacion',
}];


class DetailAnimalPage extends Component {
    state = {
        key: 'Detalle',
        noTitleKey: 'article',
    };
    onTabChange = (key, type) => {
        //console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        console.log(this.props);
        let contentList = {
            Detalle: <p>Info DetailAnimal {this.props.match.params.key}</p>,
            Alimentacion: <p>content2</p>,
        };
        return (
        <div style={{display:'flex',width:'80%', justifyContent:'center', margin:'0 auto'}}>
            <Card
                style={{ width: '80%' }}
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
    let id = this.props.match.params.key;
    console.log(id)
    let animal = state.animals.list.filter(a=>{
        id === a.id;
    });
    return {
        animal,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    }
}

DetailAnimalPage = connect(mapStateToProps, mapDispatchToProps)(DetailAnimalPage);
export default DetailAnimalPage;
