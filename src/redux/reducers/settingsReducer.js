import {TYPES} from '../actions'

const initialState = {
    saveButtonAction: function(){console.log('No save button action set')},
    isSaveButtonDisabled: false,
    hideSaveButton: false,
    // selectedLocations: [],
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_SAVE_BUTTON_ACTION:
            return {...state, saveButtonAction: action.payload}
        case TYPES.DISABLE_SAVE_BUTTON:
            return {...state, isSaveButtonDisabled: true}
        case TYPES.ENABLE_SAVE_BUTTON:
            return {...state, isSaveButtonDisabled: false}
        case TYPES.HIDE_SAVE_BUTTON:
            return {...state, hideSaveButton: true}
        case TYPES.SHOW_SAVE_BUTTON:
            return {...state, hideSaveButton: false}



        case TYPES.ADD_LOCATION:
            return {
                ...state, 
                selectedLocations: initialState.selectedLocations.push(action.payload)
            }
        case TYPES.REMOVE_LOCATION:
            return {
                ...state, 
                selectedLocations: initialState.selectedLocations.filter(value => value!== action.payload)
            }
        default:
            return state
    }
}

export default settingsReducer;