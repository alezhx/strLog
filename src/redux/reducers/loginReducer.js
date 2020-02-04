import {TYPES} from '../actions'

const MasterState = {
  isAUTH: false, 
//   isAUTH: true,
  isLOADING: false,
  isERROR: false,
  ClinicID: 0,
  MEmployeeID: 0,
  LocationList: [],
  UserSettings: {
    EmployeeFirstName: null,
    EmployeeLastName: null,
    EmployeeMidName: null,
    EmployeeGender: null,
    EmployeeType: null,
    Motto: null,
    PhotoLink: null,
    Profile: null,
    preferredlanguage: null,
    specialty:null,
  },
  isSidebarOpen: true,
}

const loginReducer = (state = MasterState, action) => {
  switch(action.type) {
    case TYPES.CLEAR_STORE:
        return {isSidebarOpen:true}
    case TYPES.SAVE_LOGIN_DATA:
        return {...state, ...action.payload}

    case TYPES.TOGGLE_AUTH_ON:
        return {...state, isAUTH: true}
    case TYPES.TOGGLE_AUTH_OFF:
        return {...state, isAUTH: false}

    case TYPES.VERIFY_AUTH_START:
        return {...state, isLOADING: true, isERROR: false}
    case TYPES.VERIFY_AUTH_SUCCESS:
        const {ClinicID, MEmployeeID, LocationList} = action.payload
        return {...state, 
            ClinicID: ClinicID, 
            MEmployeeID: MEmployeeID, 
            LocationList: LocationList, 
            isAUTH: true, 
            isLOADING: false, 
            isERROR: false
        }
    case TYPES.VERIFY_AUTH_ERROR:
        return {...state, isAUTH: false, isLOADING: false, isERROR: action.payload}

    case TYPES.TOGGLE_LOADING_ON:
        return {...state, isLOADING: true}
    case TYPES.TOGGLE_LOADING_OFF:
        return {...state, isLOADING: false}
    
    
    
    case TYPES.TOGGLE_SIDEBAR:
        return {...state, isSidebarOpen: !state.isSidebarOpen}


    case TYPES.UPDATE_USER_SETTINGS:
        const {
            EmployeeFirstName,
            EmployeeLastName,
            EmployeeMidName,
            EmployeeGender,
            EmployeeType,
            Motto,
            PhotoLink,
            Profile,
            preferredlanguage,
            specialty,
        } = action.payload
        return {...state, 
            UserSettings: {
                EmployeeFirstName,
                EmployeeLastName,
                EmployeeMidName,
                EmployeeGender,
                EmployeeType,
                Motto,
                PhotoLink,
                Profile,
                preferredlanguage,
                specialty: specialty.replace(/,/g, ", "),
            }
        } 
        
    default:
        return state
    }
}

export default loginReducer;