import React, { Component } from 'react';
import { List, Avatar } from 'antd';


class Shows extends Component {
  constructor(props){
    super(props);
    this.state={}
    this.showbody =  React.createRef();
  }
  componentDidMount(){
    this.props.scroll(this.showbody.current);
  }
  render() {
    return (
      <div className="show">
        <div className="show_top">
        <div className="group_name">{this.props.nowgroup.nowgroupname}</div>
        <div className="inf_bu"></div>
        </div>
        <div className="show_body" ref={this.showbody}>
        {this.props.groupmes.map((mess,index)=>

          (<div  className={this.props.myself.account == mess.useraccount?'mes_right':'mes_left'} key={index}>
            <div className="mes_header"><Avatar size={50} className="mes_headerimg" src={mess.headimg} icon="user"/></div>
            <div className="mes_body">
              <div className="mes_headtop"><span className="mes_name">{mess.username}</span><span className="mes_time">{mess.time}</span></div>
              <div className="mes_desc">
              
                  <div style={{display:mess.text==null?'none':'block'}}><p>{mess.text}</p></div>
                  <img style={{display:mess.img==null?'none':'block'}} className="mes_img" src={mess.img}/>
              </div>
            </div>
          </div>)

        )}
          
          
        </div>
      </div>
    );
  }
}

export default Shows;