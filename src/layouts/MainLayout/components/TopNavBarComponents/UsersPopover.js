import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Divider, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import { CircleAvatar, CustomButton } from 'basecomponents'
import { Settings } from '@material-ui/icons'
import { UtilsTool } from 'utils';

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'fit-content',
    width: 400,
  },
  mainUserDiv: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'fit-content',
    padding: theme.spacing(2),
  },
  otherUserDiv: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'fit-content',
    paddingLeft: theme.spacing(2),
  },
  name: {
    fontFamily: theme.typography.appleFont,
    fontWeight: 600
  },
  specialty: {
    fontFamily: theme.typography.appleFont,
    color: theme.palette.darkGray,
    overflowWrap: 'break-word', 
    wordWrap: 'break-word'
  },
  userInfo: {
    width:'100%',
    display:'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  userButton: {
    backgroundColor: '#f5f5f5',
    textTransform: 'none',
    justifyContent: 'flex-start',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#e0e0e0'
    },
    width: '100%'
  },
  settingsButton: {
    marginTop: theme.spacing(1), 
  }
}));

const CustomNavLinkComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
))

const UsersPopover = (props) => {
  const { handleSwitchUser, authUser, employeeList } = props;

  const classes = useStyles();

  const mapUsers = (item, index) => {
    const {
      EmployeeLastName,
      EmployeeFirstName,
      EmployeeMidName,
      EmployeeGender,
      EmployeeType,
      PhotoLink,
      specialty
    } = item
    
    const otherUser = {
      fullName: UtilsTool.formatEnglishName(EmployeeLastName, EmployeeFirstName, EmployeeMidName, EmployeeType),
      gender: EmployeeGender,
      specialty: UtilsTool.truncateString(specialty, 70),
      photoLink: PhotoLink
    }

    return (
    <div key={item.EmployeeLastName+index}>
      <Divider />
      <Button
        classes={{
          root: classes.userButton
        }}
        component={CustomNavLinkComponent}
        to='/login'
        onClick={handleSwitchUser}
      >
        <div className={classes.otherUserDiv}>
          <CircleAvatar user={otherUser} diameter={50} source={otherUser.photoLink} />
          <div className={classes.userInfo}>
            <Typography
              className={classes.name}
              variant="body1"
            >
              {otherUser.fullName}
            </Typography>
            <Typography
              className={classes.specialty} 
              variant="body2"
            >
              {otherUser.specialty}
            </Typography>    
          </div>
        </div>
      </Button>
    </div>
    )
  };

  const renderAuthUser = () => {
    return (
      <div className={classes.mainUserDiv}>
        <CircleAvatar user={authUser} diameter={80} source={authUser.photoLink} />
        <div className={classes.userInfo}>
          <Typography
            className={classes.name}
            variant="h6"
          >
            {authUser.fullName}
          </Typography>
          <Typography
            className={classes.specialty} 
            variant="body2"
          >
            {authUser.specialty}
          </Typography>
          <CustomButton
            fullWidth
            className={classes.settingsButton}
            component={CustomNavLinkComponent}
            to={'/settings'}
            icon={Settings}
          >
            Manage Settings
          </CustomButton>
        </div>
      </div>
    )
  }

  const renderEmployeeList = () => {
    return employeeList.map((item,index)=>mapUsers(item, index))
  }

  return (
    <div className={classes.root}>
      {renderAuthUser()}
      {renderEmployeeList()}
    </div>
  );
}

export default UsersPopover;