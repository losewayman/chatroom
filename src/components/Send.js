import React, { Component } from 'react';
import { Button, Radio, Icon, Drawer, Input } from 'antd';
import Login from './Login';
import Bqb from './Bqb';



const Search = Input.Search;
const { TextArea } = Input;

class Send extends Component {
  constructor(props){
    super(props);
    this.state={
      sendmes:'',
      logindraw:false,
      bqbdraw:false,
    }
  }
  logindraw = () => {
    console.log(this.props);
    this.setState({
      logindraw:true
    })
  }

  loginClose = () => {
    this.setState({
      logindraw:false
    })
  }

  bqbClose = () => {
    this.setState({
      bqbdraw:false
    })
  }

  sendmes = (e) => {
    this.setState({
      sendmes:e.target.value
    })
  }
  send = () =>{
    var message = {
      account:this.props.myself.account,
      name:this.props.myself.name,
      headimg:this.props.myself.headimg,
      group:this.props.status.nowgroup, 
      mes:this.state.sendmes,
      img:''
    }
    this.props.group.socket.emit('sendmes',message);
    console.log(this.props.group.groupmes);
    this.props.addmes(message);
    this.setState({
      sendmes:''
    })
    setTimeout(()=>{
      this.props.group.showdiv.scrollTop = this.props.group.showdiv.scrollHeight;
    },100)
  }

  bqb = () =>{
    this.setState({
      bqbdraw:true
    })
  }


  render() {
    const sendbutton = (
      <span onClick={this.send}>发 送</span>
)
    var showsend= this.props.status.islogin?"block":"none";
    var showmsg= this.props.status.islogin?"none":"black";
    return (
      <div className="send">
        <div style={{display:showsend}}>
          <div className="send_top"><Icon type="smile" theme="outlined" style={{fontSize:'1.5em'}} onClick={this.bqb}/></div>
          <Input className="send_input" addonAfter={sendbutton} placeholder="发射！" value={this.state.sendmes} onChange={this.sendmes} onPressEnter={this.send}/>
        </div>
        <div style={{display:showmsg}} className="send_login">点击<span className="login_click" onClick={this.logindraw}>登录</span>参与群聊</div>
        <Drawer  placement='top' closable={false} onClose={this.loginClose} visible={this.state.logindraw} className="login_draw">
          <Login/>
        </Drawer>
        <Drawer placement='left'  closable={false}  onClose={this.bqbClose}  visible={this.state.bqbdraw} width={500}  >
        <Bqb/>
        </Drawer>
      </div>
    );
  }
}

export default Send;