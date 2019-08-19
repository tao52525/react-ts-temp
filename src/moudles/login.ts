import { createAction, handleActions } from 'redux-actions'
import { Dispatch } from 'redux'
import { message } from 'antd'
import fetch from '../tools/fetch'
import { History } from 'history'
import API from '../tools/constants'

export const setAuth = createAction('修改登录状态')

export function login({ username, password }: { username: string, password: string }, history: History) {
  return async (dispatch: Dispatch) => {
    const isAuth: any = await fetch(API.LOGIN, { username, password })
    if (isAuth.code === 0) {
      dispatch(setAuth(true))
      history.push('/')
    } else {
      message.error('登录失败')
    }
  }
}

export interface ILoginReducer {
  isAuth: boolean
}

const initialState: ILoginReducer = {
  isAuth: false
}

export default handleActions<ILoginReducer, any>(
  {
    [setAuth.toString()]: (state, data) => {
      return { ...state, isAuth: data.payload }
    }
  },
  initialState
)
