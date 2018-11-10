import React, { Component } from 'react';
import { Button, Radio, Icon, Drawer, Tabs, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

class Search extends Component {
  constructor(props){
    super(props);
  }

  join = (id) => {
      axios({
          method:'post',
          url:'',
          data:{
            groupid:id,
            useraccount:this.props.myself.account
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
      <div className="search" >
        {this.props.group.searchmes.map((sear,index)=>
        (
            <div className="search_li" key={index}>
            {/* src={sear.groupimg} {sear.groupname}*/}
                <div><img  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/></div> 
                <div>grtrtetetetetetetetetetetetetetetetetettr</div>
                <Button type="primary" onClick={this.join(sear.id)}>加 入</Button>
            </div>
        )
        )}
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
  