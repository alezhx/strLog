import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography, 
  Button,   
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle'
import Refresh from '@material-ui/icons/Refresh'
import { ScheduleLocationCard } from './components'
import { HttpTool, UtilsTool } from 'utils'
import { connect } from 'react-redux'
import { API_Schedule } from 'utils/API'
import { actions } from 'redux/actions'
import { CustomButton } from 'basecomponents'
import palette from 'style/palette';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(3),
  },
  filledInput: {
    padding: '8px 12px',
    minHeight: 30
  },
  textField: {
    width: '50%'
  },
  refreshButton: {
    marginLeft:16
  },
  noLocationContainer: {
    height:'50vh'
  },
  menuItem: {
    display:'flex',
    flexDirection:'column'
  }
});

class ScheduleSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocationDialogOpen: false,
      selectedLocation: 0,
      scheduleData: {},
      scheduleInterval: {},
      maxAppointment: {},
      visitTypesAllowed: {},
      scheduleDataToDelete: {}
    };
  }

  componentDidMount() {
    const {toggleLoadingOn, disableSaveButton} = this.props

    toggleLoadingOn();
    disableSaveButton();
    this.fetchAllScheduleData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {enableSaveButton, disableSaveButton, setSaveButtonAction} = this.props
    let locationId = this.state.selectedLocation
    if (locationId && this.state.scheduleInterval[locationId] 
      && this.state.scheduleData[locationId].length) {
      enableSaveButton();
      setSaveButtonAction(this.handleSaveLocation);
    } else {
      disableSaveButton();
    }
  }

  componentWillUnmount() {
    const {enableSaveButton} = this.props
    enableSaveButton();
  }

  handleRefresh = () => {
    const {toggleLoadingOn} = this.props;
    toggleLoadingOn();
    this.fetchAllScheduleData();
  }

  
  fetchAllScheduleData = () => {
    const {LocationList, toggleLoadingOff} = this.props

    let fetches = LocationList.map(location => {
      return new Promise((resolve, reject) => {
        this.fetchLocationSettings(location.OLID, resolve)
      })
    })

    Promise.all(fetches).then(() => toggleLoadingOff())
  }

  fetchLocationSettings = (LocationID, promiseCb) => {
    //API call, then set response data as scheduleData state
    const {loginStore} = this.props
    
    let param = {
      ClinicID: loginStore.ClinicID,
      MEmployeeID: loginStore.MEmployeeID,
      LocationID: LocationID
    }

    HttpTool.post(API_Schedule.getMemployeeSchedule, param, response => {
      let locationData = response.data;
      this.cleanData(locationData);

      this.setState({
        scheduleData: {
          ...this.state.scheduleData,
          [LocationID]: locationData
        },
        scheduleInterval: {
          ...this.state.scheduleInterval,
          [LocationID]: locationData[0] ? locationData[0].Scheduleinterval : null
        },
        maxAppointment: {
          ...this.state.maxAppointment,
          [LocationID]: locationData[0] ? locationData[0].MaxAppointment : null
        },
        visitTypesAllowed: {
          ...this.state.visitTypesAllowed,
          [LocationID]: locationData[0] ? locationData[0].VisitTypesAllowed : null
        },
      }, () => {
        // localStorage.setItem(LocationID, locationData)
        promiseCb && promiseCb()
      });
    }, error => {
      promiseCb && promiseCb();
    })
  }

  formatTime = (str) => {
    // return str.substr(0, str.length-3)
    return str.substr(0,5)
  }

  cleanData = (data) => {
    return data.forEach(obj => {
      obj.StartTime = this.formatTime(obj.StartTime);
      obj.EndTime = this.formatTime(obj.EndTime)
      obj.BreaksBeginTime = this.formatTime(obj.BreaksBeginTime);
      obj.BreakEndTime = this.formatTime(obj.BreakEndTime);

      // obj.BreaksArray = obj.BreaksBeginTime + ',' + obj.BreakEndTime;
    })
  }

  saveAllLocations = () => {
    const {LocationList, toggleLoadingOn, toggleLoadingOff} = this.props;
    
    toggleLoadingOn();

    let saveRequests = LocationList.map(location => {
      return new Promise((resolve, reject) => {
        this.saveLocationSettings(location.OLID, resolve)
      })
    });

    Promise.all(saveRequests).then(() => toggleLoadingOff());


    //********** TEST single clinic
    // this.saveLocationSettings(1020)
  }

  handleSaveLocation = () => {
    const {toggleLoadingOn, toggleLoadingOff} = this.props;
    
    toggleLoadingOn();


    let saveRequest = new Promise((res,rej) => {
      this.saveLocationSettings(this.state.selectedLocation, res)
    })

    let deleteAndSaveRequest = new Promise ((res,rej) => {
      this.deleteAllRemovedDays(this.state.selectedLocation, res)
    }).then(()=>saveRequest)
    

    let locationDeletables = this.state.scheduleDataToDelete[this.state.selectedLocation]
    if (locationDeletables && locationDeletables.length) {
      deleteAndSaveRequest.then(() => toggleLoadingOff())
    } else {
      saveRequest.then(() => toggleLoadingOff())
    }
  }

  deleteAllRemovedDays = (locationId, savePromiseCb) => {
    let locationDeletables = this.state.scheduleDataToDelete[locationId]

    if (locationDeletables && locationDeletables.length) {
      let deleteRequests = locationDeletables.map(day => {
        return new Promise((resolve, reject) => {
          // let weekday = day.parseInt(weekday)
          this.deleteLocationWeekday(locationId, day, resolve)
        })
      })

      Promise.all(deleteRequests).then(savePromiseCb && savePromiseCb())
    } else {
      savePromiseCb && savePromiseCb()
    }
  }

  deleteLocationWeekday = (locationId, weekday, promiseCb) => {
    const {loginStore} = this.props
    let param = {
      ClinicID: loginStore.ClinicID,
      MEmployeeID: loginStore.MEmployeeID,
      LocationID: locationId,
      weekday: parseInt(weekday)
    }

    HttpTool.post(API_Schedule.deleteMemployeeSchedule, param, (response) => {
      promiseCb && promiseCb();
    }, error => {
      promiseCb && promiseCb();
    })
  }


  saveLocationSettings = (LocationID, promiseCb) => {
    const {loginStore} = this.props

    let locationSetting = this.state.scheduleData[LocationID];
    locationSetting.forEach(day => {
      delete day.tableData
      day.Scheduleinterval = this.state.scheduleInterval[LocationID];
      day.MaxAppointment = this.state.maxAppointment[LocationID];
      day.VisitTypesAllowed = this.state.visitTypesAllowed[LocationID];
    });

    let param = {
      ClinicID: loginStore.ClinicID,
      MEmployeeID: loginStore.MEmployeeID,
      LocationID: LocationID,
      EmployeeWeekdaySetList: locationSetting
    }

    HttpTool.post(API_Schedule.setMemployeeSchedule, param, (response) => {
      promiseCb && promiseCb();
    }, (error) => {
      promiseCb && promiseCb()
    })

  }

  closeLocationDialog = () => {
    this.setState({isLocationDialogOpen:false})
  }

  openLocationDialog = () => {
    this.setState({isLocationDialogOpen:true})
  }

  renderLocationListDialog = () => {
    return (
      <Dialog
        onClose={()=>this.closeLocationDialog()}
        open={this.state.isLocationDialogOpen}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>
          iClinic Locations List
        </DialogTitle>
        
        <DialogContent>
          {this.renderLocationListContent()}
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={()=>this.closeLocationDialog()}>
            Cancel
          </Button>
          <Button color="primary" onClick={()=>this.closeLocationDialog()}>
            Add location
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderAddLocationButton = () => {
    return (
      <CustomButton
        backgroundColor='green'
        onClick={()=>this.openLocationDialog()}
        icon={AddCircle}
        iconProps={{
          fontSize: 'small'
        }}
      >
        Add Location
      </CustomButton>
    )
  }

  handleLocationChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })}

  renderSelectLocationMenu = () => {
    const {classes, LocationList} = this.props

    return (
      <Grid item container spacing={2} xs={12}>
        <Grid item container xs={4} justify='flex-end' alignItems='center'>
          <Typography variant='body1'>Select a Location:</Typography>
        </Grid>
        <Grid item container xs={8} alignItems='center'>
        <TextField
          select
          name='selectedLocation'
          onChange={this.handleLocationChange}
          value={this.state.selectedLocation}
          variant="filled"
          className={classes.textField}
          InputProps={{
            classes: {
              input: classes.filledInput
            }
          }}        
        >
          {LocationList.map((location, index) => {
            const address = UtilsTool.formatAddress(location)
            return (
              <MenuItem key={index} value={location.OLID}>
                <div className={classes.menuItem}>
                  <Typography>
                    {location.name} ({location.OLID})
                  </Typography>
                  <Typography variant='subtitle1' color='primary'>
                    {address}
                  </Typography>
                </div>
              </MenuItem>
            )
          })}
        </TextField>   
        <div>
          <IconButton
            size='small'
            className={classes.refreshButton}
            style={{backgroundColor: palette.primary.main}} // Keep inline styles
            color='secondary'
            onClick={this.handleRefresh}
          >
            <Refresh/>
          </IconButton>
        </div>
        </Grid>
      </Grid>
      
    )
  }

  handleFormChange = (event, locationId) => {    
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        [locationId]: event.target.value
      }
    })
  }

  setScheduleData = (locationId, data, cb) => {
    this.setState({
      scheduleData: {
        ...this.state.scheduleData,
        [locationId]: data
      }
    }, cb && cb())
  }

  deleteScheduleData = (locationId, oldData, cb) => {
    this.setState({
      scheduleDataToDelete: {
        ...this.state.scheduleDataToDelete,
        [locationId]: oldData
      }
    })
  }

  // mapRenderLocationCards = () => {
  //   const {LocationList} = this.props

  //   return LocationList.map(location => {
  //     const address = UtilsTool.formatAddress(location)
      
  //     return (
  //       <Grid
  //         item
  //         xs={12}
  //       >
  //         <ScheduleLocationCard 
  //           scheduleData={this.state.scheduleData[location.OLID]}
  //           locationId={location.OLID}
  //           clinicName={location.name}
  //           phone={location.phone}
  //           address={address} 
  //           setScheduleData={this.setScheduleData}

  //           scheduleInterval={this.state.scheduleInterval}
  //           maxAppointment={this.state.maxAppointment}
  //           handleChange={this.handleFormChange}
  //         />
  //       </Grid>
  //     )
  //   })
  // }

  renderSelectedLocationCard = (locationId) => {
    const {LocationList} = this.props;
    let location = LocationList.find(location => {
      return location.OLID === locationId
    });
    let address = UtilsTool.formatAddress(location);

    return (
        <ScheduleLocationCard 
          scheduleData={this.state.scheduleData[location.OLID]}
          locationId={location.OLID}
          clinicName={location.name}
          phone={location.phone}
          address={address} 
          setScheduleData={this.setScheduleData}
          deleteScheduleData={this.deleteScheduleData}

          scheduleInterval={this.state.scheduleInterval}
          maxAppointment={this.state.maxAppointment}
          visitTypesAllowed={this.state.visitTypesAllowed}
          handleChange={this.handleFormChange}
        />
    )
  }

  renderNoLocations = () => {
    const {classes} = this.props
    return (
      <Grid item container xs={12}
        className={classes.noLocationContainer}
        direction='column' 
        justify='center' 
        alignItems='center'
      >
        <Typography variant='h6'>
          No locations selected
        </Typography>      
        <Typography color='primary'>
          <i>Select a location above to manage schedule settings</i>
        </Typography>
      </Grid>
    ) 
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
          justify='center'
        >
          <Grid 
            item 
            container 
            xs={12} 
          >
            {this.renderSelectLocationMenu()}
          </Grid>
          <Grid
            item
            container
            xs={8}
          >
            {
              !this.state.selectedLocation ? 
              this.renderNoLocations() :
              this.renderSelectedLocationCard(this.state.selectedLocation)
            }
          </Grid>
        </Grid>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  LocationList: state.login.LocationList,
  loginStore: state.login,
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
)(withStyles(styles)(ScheduleSettings));
