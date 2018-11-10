import React, { Component } from 'react';
import { Button, Radio, Icon, Drawer, Tabs, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

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
      axios({
          method:"post",
          url:'',
          data:{
              geoupname:this.state.groupname,
              creater:this.props.myself.account,
          }
      })
      .then((res)=>{
          if(res.data.status=='200'){

          }
      })
      .catch((err)=>{
          console.log(err);
      })
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
    myself: state.myself,
    group:state.group
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    
   
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
  