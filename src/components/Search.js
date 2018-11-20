import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import action from '../actions/index';


class Search extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  join = (sear,index) => {
      axios({
          method:'post',
          url:'group/join',
          data:{
            groupid:sear.id,
            useraccount:this.props.myself.account
          }
      })
      .then((res)=>{
          if(res.data.status===200){
            this.props.addgrouplist(sear);
            this.props.deletesearchmes(index);
            this.props.nowgroup(this.props.grouplist[0]);
          }
      })
      .catch((err)=>{
          console.log(err);
      })
  }

  render() {
    return (
      <div className="search" >
      <div style={{display:this.props.searchmes.length===0?'none':'block'}}>
        {this.props.searchmes.map((sear,index)=>
        (
            <div className="search_li" key={index}>
                <div><Avatar src={sear.groupimg} icon="message"/></div> 
                <div className="search_text">{sear.groupname}</div>
                <Button type="primary" onClick={this.join.bind(this,sear,index)}>加 入</Button>
            </div>
        )
        )}
      </div>
      <div style={{display:this.props.searchmes.length===0?'block':'none',lineHeight:'40px',textAlign:'center'}}>没有找到呦！</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself,
    searchmes:state.group.searchmes,
    grouplist:state.group.grouplist
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    addgrouplist:(data) => {
      dispatch(action.addgrouplist(data)) 
    },
    deletesearchmes:(data) => {
      dispatch(action.deletesearchmes(data)) 
    },
    nowgroup:(data) => {
      dispatch(action.nowgroup(data))
    },
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
  