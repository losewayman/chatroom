import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import action from '../actions/index';

class Search extends Component {
  constructor(props){
    super(props);
    this.state={
        groupname:''
    }
  }

  gchange = (e) => {
      this.setState({
          groupname:e.target.value
      })
  }

  gcreate = () => {
      if(this.state.groupname===''){
          message.warning("群名不能为空");
      }else{
      axios({
          method:"post",
          url:'http://localhost:8110/group/create',
          data:{
              groupname:this.state.groupname,
              creater:this.props.myself.account,
          }
      })
      .then((res)=>{
          if(res.data.status===0){
              message.error("创建失败");
          }else if(res.data.status===100){
              message.warning("此群名已被占用");
          }else if(res.data.status===200){
              this.setState({
                  groupname:''
              })
              this.props.addgrouplist(res.data.data[0]);  //创建成功后把群插入到群组列表以展示
          }
      })
      .catch((err)=>{
          console.log(err);
      })
    }
  }

  render() {
    return (
      <div className="create" >
        <Input placeholder="在这里输入群名" value={this.state.groupname} onChange={this.gchange} onPressEnter={this.gcreate}/>
        <Button type="primary" style={{float:'right'}} onClick={this.gcreate}>创 建</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    addgrouplist:(data) => {
      dispatch(action.addgrouplist(data)) 
    },
   
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
  