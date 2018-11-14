import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Selfout from '../containers/Selfout';
import Showsout from '../containers/Showsout';
import Sendout from '../containers/Sendout';
import action from '../actions/index';
import 'antd/dist/antd.css';
import './style/App.css'
import axios from 'axios';
import method from './method';

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
    let _this = this;
    socket.on('othersendmes',function(data){
      if(data.groupid===_this.props.groupid){
        _this.props.addmes(data);
        setTimeout(()=>{
          _this.props.showdiv.scrollTop = _this.props.showdiv.scrollHeight;
        },300)
      }
    })

    this.props.socket(socket);

    axios({
      method:'post',
      url:"http://localhost:8110/users/islogin",
      data:{},
      withCredentials: true,
    })
    .then((res)=>{
      this.props.islogin(res.data.islogin);
      if(res.data.islogin===false){
          this.props.history.push('login');
      }
      if(res.data.status===200){
        this.props.selfmes(res.data.user);
        this.props.grouplist(res.data.group);
        if(res.data.group.length!==0){
          this.props.nowgroup(res.data.group[0]);
          socket.emit("join",res.data.group[0]);
          method.reqgroupmes(res.data.group[0].id,_this.props.groupmes);
        }
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  componentWillUnmount(){    //卸载
  }
  render() {
    return (
      <div><div className="app_bg"></div>
      <div className="app_opa"></div>
      <div className="App">
      
        <div className="left">
          <Selfout/>
        </div>
        <div className="right">
          <Showsout/>
          <Sendout/>
        </div>
      </div>
      
      </div>
    );
  }
}



const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
  showdiv:state.center.showdiv,
  groupid:state.now.nowgroupid
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    islogin:(data) => {
        dispatch(action.islogin(data))
    },
    socket:(data) => {
      dispatch(action.socket(data))
    },
    grouplist:(data) => {
      dispatch(action.grouplist(data));
    },
    selfmes:(data) => {
      dispatch(action.selfmes(data));
    },
    nowgroup:(data) => {
      dispatch(action.nowgroup(data))
    },
    addmes:(data) => {
      dispatch(action.addmes(data))
    },
    groupmes:(data) => {
      dispatch(action.groupmes(data))
  }
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
  
