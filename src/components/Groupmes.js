import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../actions/index';
import { Avatar, Button, Radio, Drawer, Tabs, Input, Upload, Icon, Modal,message } from 'antd';
import axios from 'axios';
import jz from '../img/jz.gif';
import method from './method';

const Search = Input.Search;

class Groupmes extends Component {
  constructor(props){
    super(props);
    this.state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
          uid: '-1',
          name: 'image',
          status: 'done',
          url: 'http://localhost:8110/public/images/e7b983453bbe11cfc6a3df6a361154cc.jpg',
        }],
      };

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
          console.log(file.response);
          if(fileList.length>1){
            fileList.shift();
          }
          
        }
        this.setState({ fileList })
    }
    groupout =() => {
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
      <div className="group_title">修改群头像</div>
      <div className="groupimg">
        <Upload
            action="http://localhost:8110/group/groupup"
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
          <div className="group_title">功能</div>
          <Button className="inf_out" type="danger" onClick={this.groupout} >退出群组</Button>
      </div>
    );
  }
}


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
  myself:state.myself,
  socket:state.center.socket,
  grouplist:state.group.grouplist,
  now:state.now
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groupmes)
