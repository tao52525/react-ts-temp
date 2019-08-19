import Page from './page'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../moudles/login'
import { IRootState } from '../../moudles/state'

const mapState = (state: IRootState) => ({
  loginReducer: state.loginReducer
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(
  mapState,
  mapDispatch
)(Page as any)
