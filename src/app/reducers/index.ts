import themeReducer from './theme'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    theme: themeReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
