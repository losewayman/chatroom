import React, { Component } from 'react';
import { Avatar, Input, Select, List,Popover, Button, message, Upload, Icon, Modal} from 'antd';
import Addsearch from './Search';
import Creategroup from './Creategroup';
import Headup from './Headup';
import axios from 'axios';
import action from '../actions/index';
import method from './method';

const Option = Select.Option;
const Search = Input.Search;

class Self extends Component {
    constructor(props){
        super(props);
    }

    search = (value) => {
      if(value===""){
        message.warning("没有关键字我很难办啊！");
      }else{
      axios({
        method:"post",
        url:'http://localhost:8110/group/searchmes',
        data:{
          searchvalue:value,
          account:this.props.myself.account
        }
      })
      .then((res)=>{
        if(res.data.status=='200'){
          this.props.search(res.data.data);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    }

    click = (item,index) => {
      let _this =this;
      item.index=index;
      this.props.socket.emit("join",item);
      this.props.nowgroup(item);
      console.log(item);
      method.reqgroupmes(item.id,_this.props.groupmes);
    }

    render() {
      return (
        <div>
        <div className="self_head">
          <Popover content={<Headup/>} placement="rightTop" trigger="click">
            <Avatar size={50} src={this.props.myself.headimg} icon="user"/>
            <span>{this.props.myself.name}</span>
          </Popover>
        </div>
        <div className="self_search">
            <Popover content={<Addsearch/>} placement="bottom" trigger="click">
                <Search placeholder="input search text" style={{width:'75%'}} onSearch={this.search} />
            </Popover>
            <Popover placement="bottom" content={<Creategroup/>}  trigger="click">
              <Icon type="plus-circle" style={{fontSize:'32px',position:'relative',top:'6px',left:'5%',color:'#a1a3a6'}} />
            </Popover>
        </div>
        <div className="self_group" style={{display:this.props.grouplist.length==0?'none':'block'}}>
          {this.props.grouplist.map((item,index)=>
            (
              <div tabIndex='1' className="list_li" key={index}  onClick={this.click.bind(this,item,index)}>
                <div className="list_img"><Avatar size={40} src={item.groupimg} icon="message"/></div>
                <div className="list_name">{item.groupname}</div>
              </div>
            )
          )}
        </div>
        <div className="list_tip" style={{display:this.props.grouplist.length==0?'block':'none'}}>搜索加入“公共地带”一起玩吧！</div>
        </div>
      )
  }
}

export default Self;