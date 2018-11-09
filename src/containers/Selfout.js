import { connect } from 'react-redux';
import Self from '../components/Self';
import action from '../actions/index';


const mapStateToProps = state => ({   //从总的state中拿需要的数据放到此组件
    myself: state.myself
})
  
const mapDispatchToProps = dispatch => ({   //分发action
    search:(data) => {
        dispatch(action.search(data))
    }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Self)