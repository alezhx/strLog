import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Popover, 
  Card,
} from '@material-ui/core'
import { Menu, ExitToApp, Person } from '@material-ui/icons'
import NavBarLogo from 'assets/navbarlogo.png'
import { Link } from 'react-router-dom';
import UsersPopover from './TopNavBarComponents'
import { connect } from 'react-redux'
import { actions } from 'redux/actions'
import { UtilsTool, HttpTool } from 'utils'
import { API_EmployeeSetting } from 'utils/API'
import { withRouter } from 'react-router-dom';
import storeConfig from 'redux/store'


const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.white,
    boxShadow: 'none',
    height: 70,
    justifyContent: 'center',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    fontSize:'1.25em'
  },
  popoverCard: {
    maxHeight: '64vh', 
    overflow: 'auto'
  },
  logo: {
    display: 'block',
    height:60
  },
  menuDiv: {
    display:'flex', 
    justifyContent:'flex-end', 
    flexGrow:1
  }
});

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      medicalEmployeeList: []
    }
  }

  componentDidMount() {
    this.fetchEmployeeList()
  }

  filterEmployeesByType = (list, acceptedArr) => {
    return list.filter((obj) => {
      if (acceptedArr.includes(obj.EmployeeType.trim())) {
        return obj.MEmployeeID !== this.props.MEmployeeID
      } else return null
    })
  }

  fetchEmployeeList = () => {
    const {ClinicID, toggleAuthOff} = this.props

    let param = {
      ClinicID
    }

    const acceptedEmployeeTypes = ['MD', 'DO', 'NP']

    HttpTool.post(API_EmployeeSetting.getClinicEmployeeInfo, param, (response) => {

      const filteredList = this.filterEmployeesByType(response.data, acceptedEmployeeTypes)

      this.setState({medicalEmployeeList:filteredList})
    }, (error) => {
      //401 API Check
      toggleAuthOff();
    })
  }

  setAnchorEl = (anchorEl) => {
    this.setState({anchorEl})
  }

  openPopover = (event) => {
    this.setAnchorEl(event.currentTarget)
  }

  closePopover = () => {
    this.setAnchorEl(null);
  }

  handleLogout = () => {
    const {persistor} = storeConfig()
    persistor.purge()
    .then(this.props.clearStore())
    .then(this.props.history.push('/login'))

    // localStorage.clear()
    // window.localStorage.clear()
    // localStorage.removeItem('persist:rootPersistedStore')
    // localStorage.removeItem('jwtToken')
  }

  renderUsersPopover = () => {
    const { anchorEl, medicalEmployeeList } = this.state;
    const isPopoverOpen = Boolean(anchorEl);
    const { classes } = this.props

    const {
      EmployeeLastName,
      EmployeeFirstName,
      EmployeeMidName,
      EmployeeGender,
      EmployeeType,
      PhotoLink,
      specialty
    } = this.props.UserSettings

    const authUser = {
      fullName: UtilsTool.formatEnglishName(EmployeeLastName, EmployeeFirstName, EmployeeMidName, EmployeeType),
      gender: EmployeeGender,
      specialty: UtilsTool.truncateString(specialty, 70),
      photoLink: PhotoLink
    }

    return (
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={this.closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card className={classes.popoverCard}>
          <UsersPopover 
            handleSwitchUser={this.handleLogout}
            authUser={authUser}
            employeeList={medicalEmployeeList}
          />
        </Card>
      </Popover>
    )
  }

  render() {
    const {classes, onSidebarToggle} = this.props

    return (
      <AppBar
        position='fixed'
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            onClick={onSidebarToggle}
            edge='start'
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Link to="/">
            <img 
              alt='navbarlogo' 
              src={NavBarLogo}
              className={classes.logo}
              draggable={false}
            />
          </Link>
          <div className={classes.menuDiv}>
            <IconButton
              color='inherit'
              onClick={this.openPopover}
            >
              <Person className={classes.button}/>
            </IconButton>
            {this.renderUsersPopover()}
            <IconButton
              color='inherit'
              onClick={this.handleLogout}
            >
              <ExitToApp className={classes.button}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
};

const mapStateToProps = state => ({
  UserSettings: state.login.UserSettings,
  ClinicID: state.login.ClinicID,
  MEmployeeID: state.login.MEmployeeID
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
  toggleAuthOff: () => {
    dispatch(actions.toggleAuthOff())
  },
  clearStore: () => {
    dispatch(actions.clearStore())
  }
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withStyles(styles)(withRouter(TopNavBar)));