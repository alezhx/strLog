import { HttpTool } from 'utils'
import { API_Login, API_EmployeeSetting } from 'utils/API'

export const TYPES = {
    SAVE_LOGIN_DATA: 'SAVE_LOGIN_DATA',

    VERIFY_AUTH_START: 'VERIFY_AUTH_START',
    VERIFY_AUTH_SUCCESS: 'VERIFY_AUTH_SUCCESS',
    VERIFY_AUTH_ERROR: 'VERIFY_AUTH_ERROR',
    
    TOGGLE_AUTH_ON: 'TOGGLE_AUTH_ON',
    TOGGLE_AUTH_OFF: 'TOGGLE_AUTH_OFF',

    TOGGLE_LOADING_ON: 'TOGGLE_LOADING_ON',
    TOGGLE_LOADING_OFF: 'TOGGLE_LOADING_OFF',
    TOGGLE_ERROR_ON: 'TOGGLE_ERROR_ON',
    TOGGLE_ERROR_OFF: 'TOGGLE_ERROR_OFF',

    UPDATE_USER_SETTINGS: 'UPDATE_USER_SETTINGS',

    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',


    CLEAR_STORE: 'CLEAR_STORE',





    // Setting actions
    SET_SAVE_BUTTON_ACTION: 'SET_SAVE_BUTTON_ACTION',
    ENABLE_SAVE_BUTTON: 'ENABLE_SAVE_BUTTON',
    DISABLE_SAVE_BUTTON: 'DISABLE_SAVE_BUTTON',
    HIDE_SAVE_BUTTON: 'HIDE_SAVE_BUTTON',
    SHOW_SAVE_BUTTON: 'SHOW_SAVE_BUTTON',
  }

export const actions = {
    clearStore: () => {
        return (
            {type: TYPES.CLEAR_STORE}
        )
    },
    toggleSidebar: () => {
        return (
            {type: TYPES.TOGGLE_SIDEBAR}
        )
    },
    saveLoginData: (data) => {
        return (
            {type: TYPES.SAVE_LOGIN_DATA, payload: data}
        )
    },

    toggleAuthOn: () => {
        return (
            {type: TYPES.TOGGLE_AUTH_ON}
        )
    },
    toggleAuthOff: () => {
        return (
            {type: TYPES.TOGGLE_AUTH_OFF}
        )
    },
    
    toggleLoadingOn: () => {
        return (
            {type: TYPES.TOGGLE_LOADING_ON}
        )
    },
    toggleLoadingOff: () => {
        return (
            {type: TYPES.TOGGLE_LOADING_OFF}
        )
    },
    toggleLoadingOffTHUNK: (time) => {
        return (dispatch, getState) => {
            setTimeout(()=>dispatch(actions.toggleLoadingOff()), time?time:360)
        }
    },
    toggleErrorOn: (error) => {
        return (
            {type: TYPES.TOGGLE_ERROR_ON, payload: error}
        )
    },
    toggleErrorOff: () => {
        return (
            {type: TYPES.TOGGLE_ERROR_OFF}
        )
    },
    


    verifyAuthStart: () => {
        return (
            {type: TYPES.VERIFY_AUTH_START}
        )
    },
    verifyAuthSuccess: (data) => {
        return (
            {type: TYPES.VERIFY_AUTH_SUCCESS, payload: data}
        )
    },
    verifyAuthError: (error) => {
        return (
            {type: TYPES.VERIFY_AUTH_ERROR, payload: error}
        )
    },


    verifyTHUNK: (token) => {
        return (dispatch, getState) => {
            dispatch(actions.verifyAuthStart);
            fetch('/api/verify', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${token}` 
                }
              })
            .then((response) => {
                return response.json()
            }).then((body) => {
                if (body.decoded) {
                    return body.decoded
                }
            }).then((decoded) => {
                const {ClinicID, UserName, Password} = decoded
                let param = {
                    ClinicID,
                    UserName,
                    Password
                }
                return param
            }).then((param) => {
                dispatch(actions.autoLoginTHUNK(param))
            })
            .catch(error => {
                dispatch(actions.verifyAuthError(`Verify thunk error: ${error}`))
            });        
        }
    },
    //GRAB ALL DATA APP NEEDS TO RUN
    autoLoginTHUNK: (param) => {
        return (dispatch, getState) => {
            HttpTool.post(API_Login.login, param, response => {
                if (response.data.ClinicID) {
                  dispatch(actions.verifyAuthSuccess(response.data));

                  let nextParam = {
                      MEmployeeID: response.data.MEmployeeID
                  };
                  dispatch(actions.getUserTHUNK(nextParam));
                }
                else {
                    dispatch(actions.verifyAuthError(API_Login.login + response))
                }
              }, error => {
                // this.props.history.push('/login')
                dispatch(actions.verifyAuthError(`Autologin error: ${error}`))
                console.log('Autologin thunk error: ', error)
              })
        }
    },
    getUserTHUNK: (param) => {
        return (dispatch, getState) => {
            dispatch(actions.toggleLoadingOn())
            HttpTool.post(API_EmployeeSetting.getEmployeeSettingInfo, param, response => {
                if (response.status === 200) {
                    dispatch(actions.updateUserSettings(response.data));
                }
                dispatch(actions.toggleLoadingOffTHUNK())
            }, err => {
                console.log('getUser thunk error: ', err)
                dispatch(actions.toggleLoadingOffTHUNK());
            })
        }
    },
    updateUserSettings: (data) => {
        return (
            {type: TYPES.UPDATE_USER_SETTINGS, payload: data}
        )
    },





    setSaveButtonAction: (saveFunction) => {
        return (
            {type: TYPES.SET_SAVE_BUTTON_ACTION, payload: saveFunction}
        )
    },
    enableSaveButton: () => {
        return (
            {type: TYPES.ENABLE_SAVE_BUTTON}
        )
    },
    disableSaveButton: () => {
        return (
            {type: TYPES.DISABLE_SAVE_BUTTON}
        )
    },
    hideSaveButton: () => {
        return (
            {type: TYPES.HIDE_SAVE_BUTTON}
        )
    },
    showSaveButton: () => {
        return (
            {type: TYPES.SHOW_SAVE_BUTTON}
        )
    }
}