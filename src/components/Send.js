import React, { Component } from 'react';
import {Icon, Drawer, Input, message } from 'antd';
import Bqb from './Bqb';
import method from './method';

class Send extends Component {
  constructor(props){
    super(props);
    this.state={
      sendmes:'',
      bqbdraw:false,
    }
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
    if(this.state.sendmes===""){
      message.warning("写点东西再发吧！");
    }else{
    var messages = {
      useraccount:this.props.myself.account,
      username:this.props.myself.username,
      headimg:this.props.myself.headimg,
      groupid:this.props.groupid, 
      text:this.state.sendmes,
      time:method.Time(),
      img:null,
      imgwidth:null,
      imgheight:null
    }
    this.props.socket.emit('sendmes',messages);
    this.props.addmes(messages);
    this.setState({
      sendmes:''
    })
    setTimeout(()=>{
      this.props.showdiv.scrollTop = this.props.showdiv.scrollHeight;
    },100)
  }
  }

  bqb = () =>{
    this.setState({
      bqbdraw:true
    })
  }


  render() {
    return (
      <div className="send">
        <div>
          <div className="send_top"><Icon type="smile" theme="outlined" style={{fontSize:'1.5em'}} onClick={this.bqb}/></div>
          <Input className="send_input"  placeholder="发射！" value={this.state.sendmes} onChange={this.sendmes} onPressEnter={this.send}/>
        </div>
        <Drawer placement='left'  closable={false}  onClose={this.bqbClose}  visible={this.state.bqbdraw} width={500}  >
        <Bqb/>
        </Drawer>
      </div>
    );
  }
}

export default Send;