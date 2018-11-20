import React, { Component } from 'react';
import { Avatar,Icon,Drawer } from 'antd';
import Groupmes from './Groupmes';
import axios from 'axios';


class Shows extends Component {
  constructor(props){
    super(props);
    this.state={}
    this.showbody =  React.createRef();
  }

  time = (time) => {
    if(time!==null){
      return time.substr(11,5);
    }
    
  }
  groupclose = () => {
    this.props.groupdraw(false);
  }

  groupopen = () => {
    this.props.groupdraw(true);
    axios({
      method:"post",
      url:'group/groupinf',
      data:{
        'groupid':this.props.nowgroup.nowgroupid
      }
    })
    .then((res)=>{
      if(res.data.status===200){
        this.props.information(res.data.data);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.props.scroll(this.showbody.current);
  }
  render() {
    return (
      <div className="show">
        <div className="show_top">
          <div className="group_name">{this.props.nowgroup.nowgroupname}</div>
          <div className="inf_bu"><Icon type="appstore" onClick={this.groupopen}/></div>
        </div>
        <div className="show_body" ref={this.showbody}>
        {this.props.groupmes.map((mess,index)=>

          (<div  className={this.props.myself.account === mess.useraccount?'mes_right':'mes_left'} key={index}>
            <div className="mes_header"><Avatar size={50} className="mes_headerimg" src={mess.headimg} icon="user"/></div>
            <div className="mes_body">
              <div className="mes_headtop"><span className="mes_name">{mess.username}</span><span className="mes_time">{this.time(mess.time)}</span></div>
              <div className="mes_desc">
              
                  <div style={{display:mess.text==null?'none':'block'}}><p>{mess.text}</p></div>
                  <img style={{display:mess.img==null?'none':'block'}} className="mes_img" alt="" src={mess.img}/>
              </div>
            </div>
          </div>)
        )}
        </div>
        <Drawer placement='right' destroyOnClose={true} closable={false}  onClose={this.groupclose}  visible={this.props.groupdraws} width={400}  >
          <Groupmes/>
        </Drawer>
      </div>
    );
  }
}

export default Shows;