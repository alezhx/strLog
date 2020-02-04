import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { CircleAvatar } from 'basecomponents';
import { connect } from 'react-redux';
import { actions } from 'redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    padding: theme.spacing(2),
  },
  avatar: {
    width: 60,
    height: 60
  },
  nameDiv: {
    width:'80%', 
    textAlign:'center', 
    overflowWrap: 'break-word', 
    wordWrap:'break-word'
  },
  name: {
    fontFamily: theme.typography.appleFont,
    marginTop: theme.spacing(1),
    userSelect: 'none'
  },
  specialtyDiv: {
    width:'90%', 
    textAlign:'center', 
    overflowWrap: 'break-word', 
    wordWrap:'break-word'
  },
  specialty: {
    fontFamily: theme.typography.appleFont,
    color: theme.palette.darkGray,
    userSelect: 'none'
  },
}));


const SideBarProfile = (props) => {
  const { user, diameter } = props;

  const classes = useStyles();

  const refreshUserSettingsStoreFromAPI = () => {
    const { MEmployeeID, getUserTHUNK } = props;
    let param = {MEmployeeID};
    getUserTHUNK(param);
  };
  
  // eslint-disable-next-line
  useEffect(() => refreshUserSettingsStoreFromAPI(), [])

  const defaultUser = {
    fullName: null,
    gender: null,
    specialty: null,
    photoLink: null,
  }
  let renderUser
  user ? renderUser = user : renderUser = defaultUser
  
  return (
    <div className={classes.root}>
      <CircleAvatar user={renderUser} source={renderUser.photoLink} diameter={diameter} />
      
      <div className={classes.nameDiv}>
        <Typography
          className={classes.name}
          variant="h6"
        >
          {renderUser.fullName}
        </Typography>
      </div>

      <div className={classes.specialtyDiv}>
        <Typography
          className={classes.specialty} 
          variant="body2"
        >
          {renderUser.specialty}
        </Typography>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  MEmployeeID: state.login.MEmployeeID
})

const mapDispatchToProps = (dispatch) => ({
  getUserTHUNK: param => {
    dispatch(actions.getUserTHUNK(param))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarProfile);