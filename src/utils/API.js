const API_BaseUrl = {
	dev: 'https://mdlanddev.mdland.com/ezHealthempApiService/'
}

const API_Login = {
  login: 'Login/Login',
  loginEncrypt: 'Login/LoginEncrypt'
}

const API_Patient = {
  getClinicTotalPatient: 'Patient/GetClinicTotalPatient',
  getSignupPatientNum: 'Patient/GetSignupPatientNum',
  getSignupSuccessPatientDateByType: 'Patient/GetSignupSuccessPatientDateByType',
}

const API_EmployeeSetting = {
  uploadEmployeePhoto: 'EmployeeSetting/UploadEmployeePhoto',
  getEmployeeSettingInfo: 'EmployeeSetting/GetEmployeeSettingInfo',
  updateEmployeeInfo: 'EmployeeSetting/UpdateEmployeeInfo',
  getProviderSpecialty: 'EmployeeSetting/GetProviderSpecialty',
  getProviderLanguage:'EmployeeSetting/GetProviderLanguage',
  getClinicSettings: 'EmployeeSetting/GetClinicSettings',
  setClinicSettings: 'EmployeeSetting/SetClinicSettings',
  getClinicEmployeeInfo: 'EmployeeSetting/GetClinicEmployeeInfo',
  addEmployeeFeedback: 'EmployeeSetting/AddEmployeeFeedback',
}

const API_Schedule = {
  getMemployeeSchedule: 'Schedule/GetMemployeeSchedule',
  setMemployeeSchedule: 'Schedule/SetMEmployeeSchedule',
  deleteMemployeeSchedule: 'Schedule/DeleteMEmployeeSchedule'
}

export {
	API_BaseUrl,
	API_Login,
  API_Patient,
  API_EmployeeSetting,
  API_Schedule
}