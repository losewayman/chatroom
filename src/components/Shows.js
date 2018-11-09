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
    var txt='';
    var img='';
    return (
      <div className="show">
        <div className="show_top"></div>
        <div className="show_body" ref={this.showbody}>
        {this.props.group.groupmes.map((mess,index)=>

          (<div  className={this.props.myself.account == mess.account?'mes_right':'mes_left'} key={index}>
            <div className="mes_header"><img className="mes_headerimg" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/></div>
            <div className="mes_body">
              <div className="mes_headtop"><span className="mes_name">wweeew</span><span className="mes_time">123332332</span></div>
              <div className="mes_desc">
              
                  <div style={{display:mess.mes==''?'none':'block'}}><p>{mess.mes}</p></div>
                  <img style={{display:mess.img==''?'none':'block'}} className="mes_img" src={mess.img}/>
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