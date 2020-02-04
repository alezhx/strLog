import {combineReducers} from 'redux';
import loginReducer from './loginReducer'
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    settings: settingsReducer
})

export default rootReducer