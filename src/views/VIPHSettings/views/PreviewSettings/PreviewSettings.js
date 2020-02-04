import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItem,
  CardHeader,
  CardActions,
  IconButton,
  Grow,
  Link
} from '@material-ui/core';
import SideBarProfile from 'layouts/MainLayout/components/SideBarComponents/SideBarProfile'
import 'style/devices.css'
import { connect } from 'react-redux'
import { actions } from 'redux/actions'
import { UtilsTool, HttpTool } from 'utils'
import { API_Schedule, API_EmployeeSetting } from 'utils/API'
import palette from 'style/palette';
import {
  ChevronLeft, 
  ChevronRight,
  Favorite,
  FavoriteBorder,
  Help
} from '@material-ui/icons'
import moment from 'moment'
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import NyMaps from 'assets/nymaps.png'
import { CustomButton, CustomSvgIcon } from 'basecomponents';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx'

const VisitTypes = {
  officeVisit: 0,
  telehealth: 1
}

const CustomNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref}/>
))


const HideMenuIcon = props => <CustomSvgIcon {...props} path="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5M6.5,10.5A1.5,1.5 0 0,0 5,12A1.5,1.5 0 0,0 6.5,13.5A1.5,1.5 0 0,0 8,12A1.5,1.5 0 0,0 6.5,10.5M17.5,10.5A1.5,1.5 0 0,0 16,12A1.5,1.5 0 0,0 17.5,13.5A1.5,1.5 0 0,0 19,12A1.5,1.5 0 0,0 17.5,10.5Z" />

const SCREEN_WIDTH = 375

const styles = theme => ({
  root: {},
  text: {
    fontFamily: theme.typography.appleFont,
    userSelect: 'none'
  },
  button: {
    fontFamily: theme.typography.appleFont,
    textTransform: 'none',
    height: '100%'
  },
  buttonLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  screenContainer: {
    fontFamily: theme.typography.appleFont,
    height:666.99,
    // height: '100%',
    overflowY:'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '-ms-overflow-style': 'none'
  },
  topbar : {
    width: SCREEN_WIDTH, 
    height:45,
    display:'flex',
    alignItems: 'center',
    backgroundColor: palette.mobileTheme,
    color: palette.white
  },
  buttonContainer: {
    borderTop: `1px solid ${theme.palette.lineColor}`,
  },
  sliderDiv: {
    borderTop: `1px solid ${theme.palette.lineColor}`,
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '-ms-overflow-style': 'none',
    // scrollBehavior: 'smooth'
    width: SCREEN_WIDTH, 
    height: 60,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    overflow: 'hidden',
    overflowX: 'scroll'
  },
  mapContainer: {
    width:SCREEN_WIDTH, 
    height:150, 
    overflow: 'hidden',
  },
  toggle: {
    width:'50%', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center', 
    height:'100%',
    textTransform: 'none',
    padding:0,
    margin:0,
    borderRadius:0,
    fontSize: theme.typography.fontSize
  },
  calendarContainer: {
    zoom:1.2
  },
  locationContainer: {
    display:'flex', 
    flexDirection:'column'
  },
  screenTitle: {
    color:'white', 
    fontWeight:600, 
    position:'relative', 
    left: '25%'
  },
  favoriteButton: {
    color: palette.pink,
    position: 'relative',
    right: '-45%',
    top: '110%',
    fontSize: '1.75em'
  },
  noAvailabilty: {
    width: SCREEN_WIDTH, 
    textAlign:'center', 
    color:palette.darkGray
  },
  slider: {
    display:'flex'
  },
  timeSlot: {
    width:80, 
    height:32, 
    borderRadius:5,
    margin:5, 
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
    fontSize: '1em',
    fontFamily: 'inherit'
  },
  visitTypeToggle: {
    display:'flex',
    width:230, height:32, 
    borderRadius:8,
    overflow: 'hidden',
    border: `1px solid ${palette.blue}`
  },
  noTelehealth: {
    color:palette.darkGray
  },
  chevronRight: {
    color:palette.lightGray, 
    position:'absolute', 
    right: 0
  },
  profileHeader: {
    width: SCREEN_WIDTH,
    backgroundColor: palette.extraLightGray
  },
  profileTitle: {
    paddingLeft:15, paddingTop:5, paddingBottom:5
  },
  profileDescription: {
    maxWidth:SCREEN_WIDTH, minHeight: 100, padding:'6px 8px'
  },
  helpButton: {
    color: palette.primary.main
  },
  helpIcon: {
    fontSize: '2em'
  },
  toggleContainer: {
    display:'flex', justifyContent:'center', alignItems:'center', height:50
  },
  dateButtonContainer: {
    width: SCREEN_WIDTH, height:50
  },
  locationButtonContainer: {
    width: SCREEN_WIDTH, height:60
  },
  mapImage: {
    maxWidth: '123%'
  },
  cardContent: {
    padding: theme.spacing(3)
  },
  cardActions: {
    padding: theme.spacing(2)
  },
  noteText: {
    color: palette.darkGray
  }
});

class PreviewSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelpCard: true,

      showLocationDialog: false,
      showDatePicker: false,
      
      selectedLocation: 0,
      selectedDate: new Date(),

      scheduleData: {},
      scheduleInterval: {},

      isFavorite: false,
      isSelectedTime: null,
      visitType: VisitTypes.officeVisit,

      OnlineScheduleEnable: false,
      TelehealthEnable: false,
    };
  }

  componentDidMount() {
    const {toggleLoadingOn, hideSaveButton} = this.props

    toggleLoadingOn();
    hideSaveButton();
    this.fetchAllScheduleData();
    
    this.addSliderListeners();
    this.addScreenListeners();
  }

  componentWillUnmount() {
    const {showSaveButton} = this.props
    showSaveButton();
    this.removeAllListeners();
  }

  addScreenListeners = () => {
    const screenDiv = document.getElementById('screenDiv');

    let curYPos, curXPos, curDown;
    const sliderDiv = document.getElementById('sliderDiv');

    screenDiv.addEventListener('mousemove', function(e){
      if(e.target === sliderDiv || sliderDiv.contains(e.target)) {
        return
      }
      if(curDown){
        screenDiv.scrollBy(curXPos - e.pageX, curYPos - e.pageY);
      }
    });
  
    screenDiv.addEventListener('mousedown', function(e){ 
      if(e.target === sliderDiv || sliderDiv.contains(e.target)) {
        return
      }
      curYPos = e.pageY; 
      curXPos = e.pageX; 
      curDown = true; 
    });
  
    screenDiv.addEventListener('mouseup', function(e){ 
      if(e.target === sliderDiv || sliderDiv.contains(e.target)) {
        return
      }
      curDown = false; 
    });
  }
  
  addSliderListeners = () => {
    const sliderDiv = document.getElementById('sliderDiv');
    let isDown = false;
    let startX, scrollLeft;

    sliderDiv.addEventListener('mousedown', (e) => {
      isDown = true;
      sliderDiv.classList.add('active');
      startX = e.pageX - sliderDiv.offsetLeft;
      scrollLeft = sliderDiv.scrollLeft;
    });
    sliderDiv.addEventListener('mouseleave', () => {
      isDown = false;
      sliderDiv.classList.remove('active');
    });
    sliderDiv.addEventListener('mouseup', () => {
      isDown = false;
      sliderDiv.classList.remove('active');
    });
    sliderDiv.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderDiv.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      sliderDiv.scrollLeft = scrollLeft - walk;
    });

    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        sliderDiv.scrollLeft -= (delta*50); // speed
        e.preventDefault();
    }

    if (sliderDiv.addEventListener) {
        // IE9, Chrome, Safari, Opera
        sliderDiv.addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        sliderDiv.addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        sliderDiv.attachEvent("onmousewheel", scrollHorizontally);
    }
  }

  removeAllListeners = () => {
    let sliderDiv = document.getElementById("sliderDiv");
    let sliderClone = sliderDiv.cloneNode(true);
    let screenDiv = document.getElementById("screenDiv");
    let screenClone = sliderDiv.cloneNode(true);
    
    sliderDiv.parentNode.replaceChild(sliderClone, sliderDiv);
    screenDiv.parentNode.replaceChild(screenClone, screenDiv);
  }

  resetSliderPosition = () => {
    const sliderDiv = document.getElementById('sliderDiv');
    sliderDiv.scrollLeft = 0
    this.setState({isSelectedTime:null})
  }

  fetchAllScheduleData = () => {
    const {LocationList, toggleLoadingOff} = this.props

    let scheduleFetch = LocationList.map(location => {
      return new Promise((resolve, reject) => {
        this.fetchLocationSettings(location.OLID, resolve)
      })
    })

    let generalFetch = new Promise((resolve,reject) => {
      this.fetchGeneralSettings(resolve)
    })

    let firstLocation = LocationList[0].OLID

    Promise.all([scheduleFetch, generalFetch])
    .then(() => this.setState({selectedLocation:firstLocation}))
    .then(() => toggleLoadingOff())
  }

  fetchGeneralSettings = (promiseCb) => {
    const {loginStore} = this.props

    let param = {
      MEmployeeID: loginStore.MEmployeeID,
      ClinicID: loginStore.ClinicID
    };
    
    HttpTool.post(API_EmployeeSetting.getClinicSettings, param, (response) => {
      const { 
        OnlineScheduleEnable,
        TelehealthEnable,
      } = response.data

      this.setState({
        OnlineScheduleEnable,
        TelehealthEnable,
      }, () => promiseCb && promiseCb())
    }, error => {
      promiseCb && promiseCb()
    })
  }

  formatTime = (str) => {
    return str.substr(0,5)
  }

  cleanData = (data) => {
    return data.forEach(obj => {
      obj.StartTime = this.formatTime(obj.StartTime);
      obj.EndTime = this.formatTime(obj.EndTime)
      obj.BreaksBeginTime = this.formatTime(obj.BreaksBeginTime);
      obj.BreakEndTime = this.formatTime(obj.BreakEndTime);
    })
  }

  fetchLocationSettings = (LocationID, promiseCb) => {
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
      }, () => {
        promiseCb && promiseCb()
      });
    }, error => {
      promiseCb && promiseCb();
    },)
  }

  selectVisitType = (type) => {
    this.setState({visitType:type}, () => this.resetSliderPosition())
  }

  openLocationDialog = () => {
    this.setState({showLocationDialog:true})
  }

  closeLocationDialog = () => {
    this.setState({showLocationDialog:false}, () => this.resetSliderPosition())
  }

  handleSelectLocation = (olid) => {
    this.setState({selectedLocation:olid}, () => this.closeLocationDialog())
  }


  openDatePicker = () => {
    this.setState({showDatePicker:true})
  }

  closeDatePicker = () => {
    this.setState({showDatePicker:false}, () => this.resetSliderPosition())
  }

  handleSelectDate = (date) => {
    this.setState({selectedDate:date}, () => this.closeDatePicker())
  }

  increasePhoneZoom = () => {
    let phone = document.getElementById("simulatorPhone")
    phone.setAttribute("style", "zoom:1")
    // phone.setAttribute("style", "transform:scale(1.2)")
  }

  decreasePhoneZoom = () => {
    let phone = document.getElementById("simulatorPhone")
    phone.setAttribute("style", "zoom:0.8")
    // phone.setAttribute("style", "transform:scale(1)")
  }

  toggleHelpCard = () => {
    this.setState({showHelpCard:!this.state.showHelpCard}, () => {
      this.state.showHelpCard ? this.decreasePhoneZoom() : this.increasePhoneZoom()
    })
  }

  renderDatePicker = () => {
    const {classes} = this.props
    return (
      <Dialog
        onClose={this.closeDatePicker}
        open={this.state.showDatePicker}
        // fullWidth
        maxWidth='xs'
      >
        <DialogTitle>
          Select a Date
        </DialogTitle>
        <Divider variant='middle'/>

        <DialogContent className={classes.calendarContainer}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              disableToolbar
              disablePast
              variant="static"
              value={this.state.selectedDate}
              onChange={date=>this.handleSelectDate(date)}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>

        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            color="primary"
            variant={'outlined'}
            onClick={this.closeDatePicker}
          >
            Cancel
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  }
  

  renderLocationListContent = () => {
    const {classes} = this.props
    return this.props.LocationList.map((item,index) => 
      <ListItem button onClick={() => this.handleSelectLocation(item.OLID)} key={index}>
        <div className={classes.locationContainer}>
          <Typography variant='h6'>
            {item.name}
          </Typography>
          <Typography variant='subtitle1' color='primary'>
            {UtilsTool.formatAddress(item)}
          </Typography>
        </div>
      </ListItem>
    )
  }

  renderLocationDialog = () => {
    return (
      <Dialog
        onClose={this.closeLocationDialog}
        open={this.state.showLocationDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>
          Select a Location
        </DialogTitle>
        <Divider variant='middle'/>
        
        <DialogContent>
          {this.renderLocationListContent()}
        </DialogContent>

        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            color="primary"
            variant={'outlined'}
            onClick={this.closeLocationDialog}
          >
            Cancel
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  }

  renderTopBar = () => {
    const {classes} = this.props
    return (
      <div className={classes.topbar}>
        <ChevronLeft />
        <Typography className={clsx(classes.screenTitle, classes.text)}>
          Book Appointment
        </Typography>
        {this.state.isFavorite ? 
        <Favorite
          onClick={() => this.setState({isFavorite: false})}
          className={classes.favoriteButton}
        />
        : <FavoriteBorder
            onClick={() => this.setState({isFavorite: true})} 
            className={classes.favoriteButton}
          />
        }
      </div>
    )
  }

  renderNextAvailableButton = (date) => {
    let goal = moment(this.state.selectedDate).format('d')
    let data = this.state.scheduleData[this.state.selectedLocation]
    // let differences = [0, 1, 2, 3]

    data.find(row => row.WeekDay - goal)

    return (
      <div></div>
    )
  }

  findAvailableTimes = () => {
    let day = moment(this.state.selectedDate).format('d')
    // Sunday is 7, moment is 0
    if (day === '0') {
      day = '7'
    }
    
    let data = this.state.scheduleData[this.state.selectedLocation]
    if(!data) return

    let selectedDateSettings = data.find(row => row.WeekDay === day)

    return selectedDateSettings
  }

  renderAvailableTimes = () => {
    const {classes} = this.props
    let availability = []
    let daySettings = this.findAvailableTimes()

    if(!daySettings) {
      return (
        <div className={classes.noAvailabilty}>
          No availability
        </div>
      )
    }

    let interval = daySettings.Scheduleinterval

    let startTime = moment(daySettings.StartTime, 'HH:mm')
    let endTime = moment(daySettings.EndTime, 'HH:mm')

    // let availability = [startTime]
    availability.push(new moment(startTime))
    if (daySettings.BreaksBeginTime && daySettings.BreakEndTime) {
      let breakStart = moment(daySettings.BreaksBeginTime, 'HH:mm')
      let breakEnd = moment(daySettings.BreakEndTime, 'HH:mm')

      while (startTime < breakStart) {
        startTime.add(interval, 'm')
        availability.push(new moment(startTime));
      };
      availability.push(new moment(breakEnd));
      while (breakEnd < endTime) {
        breakEnd.add(interval, 'm')
        availability.push(new moment(breakEnd))
      }
    } else {
      while (startTime < endTime) {
        startTime.add(interval, 'm')
        availability.push(new moment(startTime))
      }
    }
    availability.sort((a,b) => a - b)

    return ( 
      <div className={classes.slider}>
        {availability.map((item, index) => {
          let time = item.format('HH:mm')
          return (
            <Button
              className={classes.timeSlot}
              key={index}
              component='div'
              onClick={()=>this.setState({isSelectedTime:time})} 
              style={{
                backgroundColor: time === this.state.isSelectedTime ? palette.mobileTheme : palette.extraLightGray,
              }}
            >
              {time}
            </Button>
          )
        })}
      </div>
    )
  }

  renderToggle = () => {
    const {classes} = this.props
    if (!this.state.OnlineScheduleEnable) {
      return <div>No availability in 30 days</div>
    } 
    else if (this.state.TelehealthEnable) {
      return (
        <div className={classes.visitTypeToggle}>
          <Button
            component='div'
            fullWidth
            onClick={() => this.selectVisitType(VisitTypes.officeVisit)}
            className={classes.toggle}
            style={{backgroundColor:
              this.state.visitType === VisitTypes.officeVisit ?
              palette.blue : palette.white
            }}
          >
            <Typography 
              className={classes.text} 
              style={{
                color: this.state.visitType === VisitTypes.officeVisit ?
                palette.white : palette.blue, 
                fontSize:'1em'
              }}                      
            >
              Office visit
            </Typography>
          </Button>
          <Button
            component='div'
            fullWidth
            onClick={() => this.selectVisitType(VisitTypes.telehealth)}
            className={classes.toggle}
            style={{backgroundColor:
              this.state.visitType === VisitTypes.telehealth ?
              palette.blue : palette.white
            }}
          >
            <Typography 
              className={classes.text} 
              style={{
                color: this.state.visitType === VisitTypes.telehealth ?
                palette.white : palette.blue, 
                fontSize:'1em'
              }}
            >
              TeleHealth visit
            </Typography>
          </Button>
        </div>
      )
    } else {
      return <div className={classes.noTelehealth}>Office visit only</div>
    }
  }

  renderDateButton = () => {
    const {classes} = this.props
    return this.state.OnlineScheduleEnable ?
      <Button 
        className={classes.button} 
        fullWidth 
        style={{fontSize: '1em'}}
        onClick={this.openDatePicker}
      >
        {moment(this.state.selectedDate).format('ddd, MM/DD/YYYY')}
        <ChevronRight className={classes.chevronRight}/>
      </Button> : null
  }

  renderSlider = () => {
    const {classes} = this.props
    return (
      <div 
        id='sliderDiv'
        className={classes.sliderDiv}
        style={{display: !this.state.OnlineScheduleEnable && 'none'}} 
      >
        {this.renderAvailableTimes()}
      </div>
    )
  }

  renderLocationButton = () => {
    const {classes, LocationList} = this.props
    let renderLocation
    LocationList.length ? 
    (this.state.selectedLocation ? 
      renderLocation = UtilsTool.formatAddress(LocationList.find(location => {
        return location.OLID === this.state.selectedLocation
      })) 
      : renderLocation = UtilsTool.formatAddress(LocationList[0])
    )
    : renderLocation = "Unspecified office location"

    return (
      <Button 
        className={classes.button} 
        fullWidth 
        onClick={this.openLocationDialog}
        classes={{
          label: classes.buttonLabel
        }}
      >
        {renderLocation}
        <ChevronRight className={classes.chevronRight}/>
      </Button>
    )
  }

  renderProfile = () => {
    const {classes} = this.props
    const profileDescription = this.props.UserSettings.Profile
    return (
      <div>
        <div className={classes.profileHeader}>
          <Typography className={clsx(classes.text, classes.profileTitle)}>
            Profile
          </Typography>
        </div>
        <div className={classes.profileDescription}>
          <Typography className={classes.text}>
            {profileDescription}
          </Typography>
        </div>
      </div>
    )
  }

  renderHelpButton = () => {
    const {classes} = this.props
    return (
      <Grid
        container
        justify='center'
      >
        <Grid item xs={6}/>
        <Grid item container justify='flex-end' xs={6}>
          <IconButton 
            className={classes.helpButton}
            onClick={this.toggleHelpCard}
          >
            {this.state.showHelpCard ? <HideMenuIcon className={classes.helpIcon}/>
              : <Help className={classes.helpIcon}/>
            }
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  renderiPhone = () => {
    const {classes, UserSettings} = this.props
    const {
      EmployeeLastName,
      EmployeeFirstName,
      EmployeeMidName,
      EmployeeGender,
      EmployeeType,
      PhotoLink,
      specialty,
    } = UserSettings

    const user = {
      fullName: UtilsTool.formatEnglishName(EmployeeLastName, EmployeeFirstName, EmployeeMidName, EmployeeType),
      gender: EmployeeGender,
      specialty: UtilsTool.truncateString(specialty, 50),
      photoLink: PhotoLink
    }

    return (
      <div id='simulatorPhone' className="marvel-device iphone8 black">
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="sensor"></div>
        <div className="speaker"></div>
        <div className="screen">
          
          <div id='screenDiv' className={classes.screenContainer}>
            {this.renderTopBar()}
            <SideBarProfile diameter={100} user={user}/>
            <div className={clsx(classes.buttonContainer, classes.toggleContainer)}>
              {this.renderToggle()}
            </div>
            <div className={clsx(classes.buttonContainer, classes.dateButtonContainer)}>
              {this.renderDateButton()}
            </div>
            {this.renderSlider()}
            <div className={clsx(classes.buttonContainer, classes.locationButtonContainer)}>
              {this.renderLocationButton()}
            </div>
            <div className={classes.mapContainer}>
              <img 
                src={NyMaps}
                className={classes.mapImage}
                draggable={false}
                alt='map-preview'
              />
            </div>
            {this.renderProfile()}
          </div>

        </div>
        <div className="home"></div>
        <div className="bottom-bar"></div>
      </div>
    )
  }


  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        {this.renderLocationDialog()}
        {this.renderDatePicker()}
        {this.renderHelpButton()}

        <Grid
          container
          spacing={3}
          justify='center'
        >

          <Grid item container md={6} xs={12} justify='center'>
            {this.renderiPhone()}
          </Grid>
          
          <Grid item md={5} xs={12} style={{display:!this.state.showHelpCard && 'none'}}>
          <Grow in={this.state.showHelpCard}>
            <Card raised>
              <CardHeader
                title="Live Preview"
                subheader="Preview how your profile will be displayed inside VIPHealth"
              />
              <Divider light variant='middle'/>
              <CardContent className={classes.cardContent}>
                <Typography>
                  Using the interactive phone simulator on the left, you can review 
                  how your profile will be seen by patients and users. 
                  <br/>
                  <br/>
                  The screen displayed on the simulator is the view patients will 
                  see when they go to book an office visit or telehealth appointment through VIPHealth. 
                  <br/>
                  <br/>
                  To change the appearance of your profile as well as your
                  schedule availability, please review your
                  &nbsp;
                  <Link to='/settings/profile' component={CustomNavLink}>Profile</Link>
                  ,&nbsp;
                  <Link to='/settings/general' component={CustomNavLink}>General</Link>
                  , and&nbsp;
                  <Link to='/settings/schedule' component={CustomNavLink}>Schedule</Link>
                  &nbsp;
                  settings.
                </Typography>
              </CardContent>
              <Divider light variant='middle'/>
              <CardActions className={classes.cardActions}>
                <Typography
                  variant='caption'
                  className={classes.noteText}
                >
                  <i><b>Note</b>: The simulator is a representation of 
                  your VIPHealth profile. There may be slight alterations in functionality
                  and presentation inside the VIPHealth app.</i>
                </Typography>
              </CardActions>
            </Card>
          </Grow>
          </Grid>

        </Grid>    
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  UserSettings: state.login.UserSettings,
  LocationList: state.login.LocationList,
  loginStore: state.login,
})

const mapDispatchToProps = (dispatch) => ({
  toggleLoadingOn: () => {
    dispatch(actions.toggleLoadingOn())
  },
  toggleLoadingOff: () => {
    dispatch(actions.toggleLoadingOff())
  },
  toggleLoadingOffTHUNK: () => {
    dispatch(actions.toggleLoadingOffTHUNK())
  },
  hideSaveButton: () => {
    dispatch(actions.hideSaveButton())
  },
  showSaveButton: () => {
    dispatch(actions.showSaveButton())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PreviewSettings));
