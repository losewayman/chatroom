import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../actions/index';
import { Button, Radio, Icon, Drawer, Tabs, Input } from 'antd';
import axios from 'axios';
import jz from '../img/jz.gif';
import method from './method';

const Search = Input.Search;

class Bqb extends Component {
  constructor(props){
    super(props);
    this.state={
      bqblist:[],
      searchvalue:'',
      page:'',
      imgbool:false,
      more:false,
      msg:''
    }
  }

  bqbrequest = (value,page,callback) =>{
    let _this = this;
    this.setState({
      imgbool:true,
      more:false,
    })
    axios({
      method:'post',
      url:"http://localhost:8110/pabqb/search",
      data:{
          'keyword':value,
          'page':page
      }
    })
    .then((res)=>{
      console.log(res);
      if(res.status===200){
        callback(res.data.data.list);
        _this.setState({
          imgbool:false,
          more:true,
        })
        if(res.data.data.more===1){
          _this.setState({
            msg:"加载更多"
          })
        }else{
          _this.setState({
            msg:"没有更多了"
          })
        }
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  bqbsearch = (value) => { 
    let _this =this;
    _this.setState({
      searchvalue:value,
      page:1
    })
    _this.bqbrequest(value,1,(data)=>{
      _this.setState({
        bqblist:data
      })
    });
  }

  more = () => {
    let _this =this;
    var p = _this.state.page+1;
    _this.setState({
      page:p
    })
    _this.bqbrequest(_this.state.searchvalue,p,(data)=>{
      var list = this.state.bqblist.concat(data);
      _this.setState({
        bqblist:list
      })
    });
  }

  sendimg = (img) =>{
    var message = {
      useraccount:this.props.myself.account,
      username:this.props.myself.name,
      headimg:this.props.myself.headimg,
      groupid:this.props.groupid,
      text:null,
      img:img,
      time:method.Time()
    }
    console.log(message);
    this.props.socket.emit('sendmes',message);
    this.props.addmes(message);
    setTimeout(()=>{
      this.props.showdiv.scrollTop = this.props.showdiv.scrollHeight;
    },100)
    
  }


  render() {
    var imgbool = this.state.imgbool?'block':'none';
    var more = this.state.more?'block':'none';
    return (
      <div className="bqb">
        <div>
        <Search placeholder="input search text"  onSearch={this.bqbsearch}  enterButton/>
        </div>
        <div>
        </div>
           <div className="bqb_body">
            {this.state.bqblist.map((bqb,index)=>
              <img className="bqb_image" onClick={this.sendimg.bind(this,bqb.image_url)} key={index} src={bqb.image_url} alt=""/>
            )}
            <div className="bqb_foot">
                <div style={{display:imgbool}}><img src={jz} alt=""/></div>
                <div style={{display:more}} onClick={this.more}>{this.state.msg}</div>      
            </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
  myself:state.myself,
  status:state.status,
  groupid:state.now.nowgroupid,
  socket:state.center.socket,
  showdiv:state.center.showdiv
})

const mapDispatchToProps = dispatch => ({   //分发action
  addmes:(data) => {
    dispatch(action.addmes(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bqb)
