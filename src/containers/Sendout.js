import { connect } from 'react-redux';
import Send from '../components/Send';
import action from '../actions/index';


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself,
    status:state.status,
    groupid:state.now.nowgroupid,
    socket:state.center.socket,
    showdiv:state.center.showdiv
    
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    addmes:(data) => {
        dispatch(action.addmes(data))
    },
    logindraw:(data) => {
        dispatch(action.logindraw(data))
    }
    
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Send)