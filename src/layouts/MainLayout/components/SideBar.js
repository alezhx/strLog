import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink, withRouter } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { 
  Collapse,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText, 
} from '@material-ui/core';
import clsx from 'clsx';
import { SideBarProfile, SideBarData } from './SideBarComponents'
import Info from '@material-ui/icons/Info'
import { connect } from 'react-redux'
import { UtilsTool } from 'utils'

const SIDEBAR_WIDTH = 260;
const TOP_NAVBAR_HEIGHT = 70

const styles = theme => ({
  root: {
    display: 'flex',
  },
  sideBar: {
    width: SIDEBAR_WIDTH,
    marginTop: TOP_NAVBAR_HEIGHT,
  },
  button: {
    padding: theme.spacing(2),
    justifyContent: 'flex-start',
    alignItems: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  activeButton: {
    color: theme.palette.primary.main,
    '& $icon': {
      color: theme.palette.primary.main
    },
  },
  listIcon: {
    minWidth: 40
  },
  boldText: {
    fontWeight: 'bold',
  },
  nestedItem: {
    padding: '8px 16px'
  },
  footerContainer: {
    height: '100%', 
    display:'flex', 
    alignItems:'flex-end'
  },
  footer: {
    width: '100%',
    minHeight: 145,
  },
});
  
const CustomNavLinkComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
))

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNestOpen: {4:false, 5:false},
    }
  }

  toggleNest = (id) => {
    let nests = this.state.isNestOpen
    this.setState({
      isNestOpen: {...nests, [id]:!nests[id]}
    })
  }

  urlCheck = (url) => {
    let currentUrl = this.props.location.pathname
    return url === currentUrl ? true : false
  }

  mapListItem = (item) => {
    const {classes} = this.props
    return (
      <ListItem
        key={item.title}
        button
        className={clsx(classes.button, {[classes.nestedItem]:!item.icon})} 
        activeClassName={classes.activeButton}
        to={item.path}
        component={CustomNavLinkComponent}
      >
        <ListItemIcon className={classes.listIcon}>
          {item.icon ? item.icon : <div/>}
        </ListItemIcon>
        <ListItemText 
          primary={item.title} 
          primaryTypographyProps={{
            classes: {
              body1: clsx({[classes.boldText]:this.urlCheck(item.path)})
            }
          }}
        />
      </ListItem>
    )
  }

  renderSideMenu = () => {
    const {classes} = this.props
    const nests = this.state.isNestOpen

    return SideBarData.map((item, index) => {
      if (item.nest) {
        return (
        <div key={item.id}>
          <ListItem 
            button 
            onClick={()=>this.toggleNest(item.id)} 
            key={item.id} 
            className={classes.button}
          >
            <ListItemIcon className={classes.listIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title} 
              primaryTypographyProps={{
                classes: {
                  body1: clsx({[classes.boldText]:this.urlCheck(item.path)})
                }
              }}
            />
            {nests[item.id] ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>

          <Collapse in={nests[item.id]} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.nest.map((item,index)=>this.mapListItem(item))}
            </List>
          </Collapse>
        </div>
        )
      }
      else return this.mapListItem(item)
    })
  }

  renderFooter = () => {
    const {classes} = this.props
    const footerItem = {id:6, title: 'Need Help?', icon:<Info color={'primary'}/>, path:'/support'}
    return (
      <div className={classes.footerContainer}>
        <div className={classes.footer}>
          {this.mapListItem(footerItem)}
        </div>
      </div>
    )
  }


  render() {
    const { classes, isOpen, UserSettings } = this.props;

    const {
      EmployeeLastName,
      EmployeeFirstName,
      EmployeeMidName,
      EmployeeGender,
      // EmployeeType,
      PhotoLink,
      specialty
    } = UserSettings

    const user = {
      fullName: UtilsTool.formatEnglishName(EmployeeLastName, EmployeeFirstName, EmployeeMidName, undefined),
      gender: EmployeeGender,
      specialty: UtilsTool.truncateString(specialty, 50),
      photoLink: PhotoLink
    }

    return (
      <Drawer
        classes={{paper: classes.sideBar}}
        variant='persistent'
        anchor='left'
        open={isOpen}
      >
        <SideBarProfile diameter={62} user={user}/>
        <Divider />
        <List>
          {this.renderSideMenu()}
        </List>
        <Divider />
        {this.renderFooter()}
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  UserSettings: state.login.UserSettings
})

export default connect(
  mapStateToProps,
)(withStyles(styles)(withRouter(SideBar)));