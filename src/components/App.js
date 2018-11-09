import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Selfout from '../containers/Selfout';
import Showsout from '../containers/Showsout';
import Sendout from '../containers/Sendout';
import action from '../actions/index';
import 'antd/dist/antd.css';
import './style/App.css'
import { Button, Radio, Icon, Drawer } from 'antd';
import axios from 'axios';

import io from 'socket.io-client';
 var socket = io('http://localhost:8110');


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        data:false,
        size:"large",
    }
    
  }

  componentDidMount(){   //挂载
    console.log(this.props);
    this.props.islogin("dsdds");
    this.props.socket(socket);
    axios({
      method:'post',
      url:"http://localhost:8110/users/islogin",
      data:{}
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  componentWillUnmount(){    //卸载
  }
  render() {
    return (
      <div className="App">
        <div className="left">
          <Selfout/>
        </div>
        <div className="right">
          <Showsout/>
          <Sendout/>
        </div>
      </div>
      
    );
  }
}



const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    islogin:(data) => {
        dispatch(action.islogin(data))
    },
    socket:(data) => {
      dispatch(action.socket(data))
    }
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
  
