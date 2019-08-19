import { ILoginReducer } from './login'
import { IHomeReducer } from './home'

export interface IRootState {
  loginReducer: ILoginReducer,
  homeReducer: IHomeReducer
}
