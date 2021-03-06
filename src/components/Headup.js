import React from 'react';
import { Button, Input, Upload, Icon, Modal,message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import action from '../actions/index';




class PicturesWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      oldpass:'',
      newpass:'',
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
      url:this.props.myself.headimg,
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
          var user = this.props.myself;
          user.headimg = file.response;
          this.props.selfmes(user);
          if(fileList.length>1){
            fileList.shift();
          }
        }
        this.setState({ fileList })
    }
    click = () => {
      axios({
        method:'post',
        url:'http://localhost:8110/users/updatepass',
        data:{
          'oldpass':this.state.oldpass,
          'newpass':this.state.newpass,
          'account':this.props.myself.account
        }
      })
      .then((res)=>{
        if(res.data.status!==200){
          message.error(res.data.msg);
        }else{
          message.success(res.data.msg);
          this.setState({
            oldpass:'',
            newpass:''
          })
        }
      })
    }
    oldpass = (e) => {
      this.setState({
        oldpass:e.target.value
      })
    }
    newpass = (e) => {
      this.setState({
        newpass:e.target.value
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
        <div className="clearfix">
        <div className="head_title">修改头像</div>
          <Upload
            action="group/headup"
            listType="picture-card"
            fileList={this.state.fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            data={this.props.myself}
            
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          <div className="head_title">修改密码</div>
          <div className="head_pass">
          <Input value={this.state.oldpass} onChange={this.oldpass} type="password" placeholder="请输入旧密码" />
          <Input value={this.state.newpass} onChange={this.newpass} type="password" placeholder="请输入新密码" />
          <Button type="primary" block onClick={this.click}>提交</Button>
          </div>
        </div>
      );
    }
  }
  

const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself,
    searchmes:state.group.searchmes
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    addgrouplist:(data) => {
      dispatch(action.addgrouplist(data)) 
    },
    deletesearchmes:(data) => {
      dispatch(action.deletesearchmes(data)) 
    },
    selfmes:(data) => {
      dispatch(action.selfmes(data));
    }
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PicturesWall)
  