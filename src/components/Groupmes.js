import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../actions/index';
import { Avatar, Button, Upload, Icon, Modal } from 'antd';
import axios from 'axios';
import method from './method';


class Groupmes extends Component {
  constructor(props){
    super(props);
    this.state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
      };

  }

  componentDidMount(){
    var obj = [{
      uid: '-1',
      name: 'image',
      status: 'done',
      url:this.props.now.nowgroupimg,
    }]
    this.setState({
      fileList:obj
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })
  
    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    handleChange = ({ file,fileList }) => {
        if(file.status==="done"){
          var data={
            'index':this.props.now.index,
            'img':file.response
          }
          this.props.changeimg(data);
          this.props.nowimg(file.response);
          if(fileList.length>1){
            fileList.shift();
          }
          
        }
        this.setState({ fileList })
    }
    groupout =() => {
      let _this = this;
        axios({
            method:'post',
            url:"http://localhost:8110/group/groupout",
            data:{
                'groupid':this.props.now.nowgroupid,
                'account':this.props.myself.account
            }
        })
        .then((res)=>{
            this.props.deleteinf(this.props.now.index);
            this.props.groupdraw(false);
            var list = this.props.grouplist[0];
            list.index = 0;
            this.props.nowgroup(list);
            this.props.socket.emit("leave",this.props.now);
            method.reqgroupmes(list.id,function(data){
              _this.props.groupmes(data);
              setTimeout(()=>{
                _this.props.showdiv.scrollTop = _this.props.showdiv.scrollHeight;
              },100)
            });
        })
        .catch((err)=>{
            console.log(err);
        })
    }



  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="groupmes">
      <div className="group_title" style={{display:this.props.myself===this.props.now.nowgroupcreater?'none':'block'}} >修改群头像</div>
      <div className="groupimg"  style={{display:this.props.myself===this.props.now.nowgroupcreater?'none':'block' }} >
        <Upload
            action="group/groupup"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            data={this.props.now}
            
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          </div>
          <div className="group_title">群组成员</div>
          <div className="gr_list">
          {this.props.now.information.map((inf,index)=>

            (
                <div className="inf_li" key={index}>
                    <div className="inf_img"><Avatar size={30} src={inf.headimg} icon="user"/></div>
                    <div className="inf_name">{inf.username}</div>
                </div>
            )
)}
          </div>
          <div className="group_title"  style={{display:this.props.myself===this.props.now.nowgroupcreater?'block':'none'}}>功能</div>
          <Button className="inf_out" type="danger" onClick={this.groupout}  style={{display:this.props.myself===this.props.now.nowgroupcreater?'block':'none'}}>退出群组</Button>
      </div>
    );
  }
}


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
  myself:state.myself,
  socket:state.center.socket,
  grouplist:state.group.grouplist,
  now:state.now,
  showdiv:state.center.showdiv
})

const mapDispatchToProps = dispatch => ({   //分发action
  deleteinf:(data) => {
    dispatch(action.deleteinf(data))
  },
  groupdraw:(data) => {
    dispatch(action.groupdraw(data))
  },
  nowgroup:(data) => {
    dispatch(action.nowgroup(data))
  },
  changeimg:(data) => {
    dispatch(action.changeimg(data))
  },
  nowimg:(data) => {
    dispatch(action.nowimg(data))
  },
  groupmes:(data) => {
    dispatch(action.groupmes(data))
}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groupmes)
