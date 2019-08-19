import { createAction, handleActions } from 'redux-actions'
import { Dispatch } from 'redux'

export const modifyName = createAction('修改姓名')

export function getName() {
  return async (dispatch: Dispatch) => {
    const name = await setName()
    dispatch(modifyName(name))
  }
}
function setName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Async Alex')
    }, 2000)
  })
}

export interface IHomeReducer {
  name: string
}

const initialState: IHomeReducer = {
  name: ''
}

export default handleActions<IHomeReducer, any>(
  {
    [modifyName.toString()]: (state, data) => {
      return { ...state, name: data.payload }
    }
  },
  initialState
)
