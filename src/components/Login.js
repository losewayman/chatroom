import React, { Component } from 'react';
import { Button, Tabs, Input, message } from 'antd';
import { connect } from 'react-redux';
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
          url:"http://localhost:8110/users/login",
          data:{
              account:this.state.login_acc,
              password:this.state.login_pass
          },
          withCredentials: true,
      })
      .then((res)=>{
          if(res.data.status===200){
              this.props.history.push('/');
          }else{
            message.error("登录失败");
          }
          
      })
      .catch((err)=>{
          console.log(err);
      })
  }
  sign = () => {
    axios({
        method:"post",
        url:"http://localhost:8110/users/sign",
        data:{
            account:this.state.sign_acc,
            password:this.state.sign_pass,
            username:this.state.sign_name
        }
    })
    .then((res)=>{
        if(res.data.status===200){
            this.setState({
                sign_acc:'',
                sign_name:'',
                sign_pass:''
            })
            message.success("注册成功");
        }else if(res.data.status===100){
            message.warning("账号或昵称已存在");
        }
        else{
            message.error("注册失败");
        }
    })
    .catch((err)=>{
        message.error("注册失败");
        console.log(err);
    })
}

  render() {
    return (
      <div>
      <div className="login_bg"></div>
      <div className="login">
        <Tabs defaultActiveKey="1">
            <TabPane tab="登录" key="1">
                <div className="login_log">
                    <Input placeholder="请输入账号" value={this.state.login_acc}  onChange={this.loginacc}/>
                    <Input placeholder="请输入密码" type="password" value={this.state.login_pass}  onChange={this.loginpass}/>
                    <Button type="primary" block onClick={this.login} >登 录</Button>
                </div>
            </TabPane>
            <TabPane tab="注册" key="2">
                <div className="login_log">
                    <Input placeholder="请输入账号" value={this.state.sign_acc} onChange={this.signacc}/>
                    <Input placeholder="请输入昵称" value={this.state.sign_name} onChange={this.signname}/>
                    <Input placeholder="请输入密码" value={this.state.sign_pass} type="password" onChange={this.signpass}/>
                    <Button type="primary" block onClick={this.sign} >注 册</Button>
                </div>
            </TabPane>
        </Tabs>,
      </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
})
  
const mapDispatchToProps = dispatch => ({   //分发action
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
  