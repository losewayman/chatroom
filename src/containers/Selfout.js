import { connect } from 'react-redux';
import Self from '../components/Self';
import action from '../actions/index';


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself,
    grouplist:state.group.grouplist,
    status:state.status,
    socket:state.center.socket
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    search:(data) => {
        dispatch(action.search(data))
    },
    nowgroup:(data) => {
        dispatch(action.nowgroup(data))
    },
    groupmes:(data) => {
        dispatch(action.groupmes(data))
    }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Self)