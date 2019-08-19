import Home from './page'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../moudles/home'
import { IRootState } from '../../moudles/state'

const mapState = (state: IRootState) => ({
  homeReducer: state.homeReducer
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapState, mapDispatch)(Home as any)
