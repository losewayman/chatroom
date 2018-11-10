import React, { Component } from 'react';
import { Avatar, Input, Select, Icon, List,Popover, Button} from 'antd';
import Addsearch from './Search';
import Creategroup from './Creategroup';
import axios from 'axios';
import action from '../actions/index';

const Option = Select.Option;
const Search = Input.Search;

class Self extends Component {
    constructor(props){
        super(props);
    }

    search = (value) => {
      axios({
        method:"post",
        url:'',
        data:{
          searchvalue:value
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

    click = (item) => {
      let _this =this;
      this.props.socket.emit("join",item);
      this.props.nowgroup(item);
      axios({
        method:'post',
        url:'',
        data:{
          groupid:item.id
        }
      })
      .then((res)=>{
        if(res.data.status==200){
          _this.props.groupmes(res.data.data);
        }
      })
    }

    render() {
      return (
        <div>
        <div className="self_head">
            <Avatar size={50} src={this.props.myself.headimg} icon="user"/>
            <span>{this.props.myself.name}</span>
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
        
          <List itemLayout="horizontal"  dataSource={this.props.grouplist} 
              renderItem={ item => ( <List.Item tabIndex='1' onClick={this.click.bind(this,item)}>
                             <List.Item.Meta avatar={<Avatar src={item.groupimg} icon="message"/>} description={item.groupname}/></List.Item>
                          )}
          />
           
        </div>
        <div className="list_tip" style={{display:this.props.grouplist.length==0?'block':'none'}}>搜索加入“公共地带”一起玩吧！</div>
        </div>
      )
  }
}

export default Self;