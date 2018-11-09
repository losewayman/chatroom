import React, { Component } from 'react';
import { Button, Radio, Icon, Drawer, Tabs, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

class Search extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="search" >
        
      </div>
    );
  }
}

const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    
   
})
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
  