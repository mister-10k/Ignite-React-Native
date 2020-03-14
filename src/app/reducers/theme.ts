import { Action } from '../shared/types'

const themeReducer = (state: string = null, action: Action) => {
    switch (action.type) {
        case 'NEW-THEME':
            return action.payload
        default:
            return 'hi'
    }
}

export default themeReducer; 