import React, { Component } from 'react';
import { Avatar, Input, Select, Icon, List,Popover, Button} from 'antd';
import Addsearch from './Search';
import axios from 'axios';
import action from '../actions/index';

const Option = Select.Option;
const Search = Input.Search;

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    }
  ];

  const content = (
    <div>
      <p>Cffent</p>
      <p>Content</p>
    </div>
  );


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
    click = () => {console.log("ss");}
    render() {
      return (
        <div>
        <div className="self_head">
            <Avatar size={64} src={this.props} icon="user"/>
            <span>sd</span>
        </div>
        <div className="self_search">
            <Popover content={<Addsearch/>} placement="bottom" trigger="click">
                <Search placeholder="input search text" style={{width:'75%'}} onSearch={this.search} />
            </Popover>
            <span><Icon type="plus-circle" style={{fontSize:'32px',position:'relative',top:'6px',left:'5%'}} /></span>
        </div>
        <div className="self_group">
        <List itemLayout="horizontal"  dataSource={data}  renderItem={item => (  <List.Item>
            <List.Item.Meta 
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={item.title}
                  onClick={this.click}
                 
            />
        </List.Item>
        )}
  />,
        </div>
        </div>
      )
  }
}

export default Self;