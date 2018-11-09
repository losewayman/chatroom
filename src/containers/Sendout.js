import { connect } from 'react-redux';
import Send from '../components/Send';
import action from '../actions/index';


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself,
    status:state.status,
    group:state.group
    
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    addmes:(data) => {
        dispatch(action.addmes(data))
      }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Send)