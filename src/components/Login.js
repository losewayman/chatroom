import React, { Component } from 'react';
import { Button, Radio, Icon, Drawer, Tabs, Input } from 'antd';
import axios from 'axios';

const TabPane = Tabs.TabPane;

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        login_acc:'',
        login_pass:'',
        sign_acc:'',
        sign_name:'',
        sign_pass:''
    }
  }

  loginacc = (e) => {
      this.setState({
          login_acc:e.target.value
      })
  }

  loginpass = (e) => {
    this.setState({
        login_pass:e.target.value
    })
  }

  signacc = (e) => {
      this.setState({
          sign_acc:e.target.value
      })
  }

  signname = (e) => {
    this.setState({
        sign_name:e.target.value
    })
  } 

  signpass = (e) => {
    this.setState({
        sign_pass:e.target.value
    })
  }

  login = () => {
      axios({
          method:"post",
          url:"",//http://localhost:8110/users/islogin
          data:{
              account:this.state.login_acc,
              password:this.state.login_pass
          }
      })
      .then((res)=>{
          console.log(res);
      })
      .catch((err)=>{
          console.log(err);
      })
  }
  sign = () => {
    axios({
        method:"post",
        url:"",//http://localhost:8110/users/islogin
        data:{
            account:this.state.sign_acc,
            password:this.state.sign_pass,
            username:this.state.sign_name
        }
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}

  render() {
    return (
      <div className="login">
        <Tabs defaultActiveKey="1">
            <TabPane tab="登录" key="1">
                <div className="login_log">
                    <Input placeholder="请输入账号" onChange={this.loginacc}/>
                    <Input placeholder="请输入密码" onChange={this.loginpass}/>
                    <Button type="primary" block onClick={this.login} >登 录</Button>
                </div>
            </TabPane>
            <TabPane tab="注册" key="2">
                <div className="login_log">
                    <Input placeholder="请输入账号" onChange={this.signacc}/>
                    <Input placeholder="请输入昵称" onChange={this.signname}/>
                    <Input placeholder="请输入密码" onChange={this.signpass}/>
                    <Button type="primary" block onClick={this.sign} >注 册</Button>
                </div>
            </TabPane>
        </Tabs>,
      </div>
    );
  }
}

export default Login;