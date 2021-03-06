import { connect } from 'react-redux';
import Shows from '../components/Shows';
import action from '../actions/index';


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself,
    groupmes:state.group.groupmes,
    nowgroup:state.now,
    groupdraws:state.status.groupdraw
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    islogin:(data) => {
        dispatch(action.islogin(data))
    },
    scroll:(data) => {
        dispatch(action.scroll(data))
    },
    information:(data) => {
        dispatch(action.information(data))
    },
    groupdraw:(data) => {
        dispatch(action.groupdraw(data))
    }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Shows)