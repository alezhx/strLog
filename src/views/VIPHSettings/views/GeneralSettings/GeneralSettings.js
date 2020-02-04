import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import GeneralSettingsCard from './components'
import { HttpTool } from 'utils'
import { API_EmployeeSetting } from 'utils/API'
import { connect } from 'react-redux'
import { actions } from 'redux/actions'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(3),
  },
});

class GeneralSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        OnlineScheduleEnable: false,
        TelehealthEnable: false,
        AllowPatientSendMessage: false,
        ShowAllLabReportListInVIPHeath: false,
        DisplayICDCodeInVIPHealth: false,
      }
    }
  }

  componentDidMount() {
    this.fetchGeneralSettings()
    this.props.setSaveButtonAction(this.saveGeneralSettings)
    this.props.disableSaveButton()
  }

  saveGeneralSettings = () => {
    const {        
      OnlineScheduleEnable,
      TelehealthEnable,
      AllowPatientSendMessage,
      ShowAllLabReportListInVIPHeath,
      DisplayICDCodeInVIPHealth
    } = this.state.settings;
    
    const param = {
      OnlineScheduleEnable,
      TelehealthEnable,
      AllowPatientSendMessage,
      ShowAllLabReportListInVIPHeath,
      DisplayICDCodeInVIPHealth
    };
    
    this.props.toggleLoadingOn()
    HttpTool.post(API_EmployeeSetting.setClinicSettings, param, ()=>{
      this.props.toggleLoadingOffTHUNK()
    }, error => {
      this.props.toggleLoadingOffTHUNK()
    })
  }

  handleSettingsChange = name => event => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: +event.target.checked 
      }
    }, () => {
      if (this.props.isSaveButtonDisabled) {
        this.props.enableSaveButton()
      } else return
    })
  };

  fetchGeneralSettings = () => {
    const {loginStore, toggleLoadingOn, toggleLoadingOffTHUNK} = this.props
    let param = {
      MEmployeeID: loginStore.MEmployeeID,
      ClinicID: loginStore.ClinicID
    };
    
    toggleLoadingOn()
    HttpTool.post(API_EmployeeSetting.getClinicSettings, param, (response) => {
      const { 
        AllowPatientSendMessage,
        DisplayICDCodeInVIPHealth,
        OnlineScheduleEnable,
        ShowAllLabReportListInVIPHeath,
        TelehealthEnable,
      } = response.data

      this.setState({settings: {
        OnlineScheduleEnable,
        TelehealthEnable,
        AllowPatientSendMessage,
        ShowAllLabReportListInVIPHeath,
        DisplayICDCodeInVIPHealth
      }}, () => toggleLoadingOffTHUNK())
    }, error => {
      toggleLoadingOffTHUNK()
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          justify='center'
        >
          <Grid
            item
            xl={10}
            xs={12}
          >
            <GeneralSettingsCard 
              handleChange={this.handleSettingsChange} 
              settingsData={this.state.settings}
            />
          </Grid>
        </Grid>    
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  loginStore: state.login,
  isLOADING: state.login.isLOADING,
  isSaveButtonDisabled: state.settings.isSaveButtonDisabled
})

const mapDispatchToProps = (dispatch) => ({
  setSaveButtonAction: (saveFunction) => {
    dispatch(actions.setSaveButtonAction(saveFunction))
  },
  toggleLoadingOn: () => {
    dispatch(actions.toggleLoadingOn())
  },
  toggleLoadingOff: () => {
    dispatch(actions.toggleLoadingOff())
  },
  toggleLoadingOffTHUNK: () => {
    dispatch(actions.toggleLoadingOffTHUNK())
  },
  disableSaveButton: () => {
    dispatch(actions.disableSaveButton())
  },
  enableSaveButton: () => {
    dispatch(actions.enableSaveButton())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GeneralSettings));
