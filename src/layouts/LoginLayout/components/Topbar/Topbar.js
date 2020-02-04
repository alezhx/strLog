import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, 
  Toolbar, 
  IconButton
} from '@material-ui/core'
import NavBarLogo from 'assets/navbarlogo.png'
import { CustomSvgIcon } from 'basecomponents';

const BackIcon = props => <CustomSvgIcon {...props} path="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"/>

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.white,
    boxShadow: 'none',
    height: 70,
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(1.5),
    fontSize: '1.75em'
  },
  logo: {
    display: 'block',
    height: 60
  }
}));

const Topbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar
      position='fixed'
      className={classes.appBar}
    >
      <Toolbar>
        <IconButton
          component='a'
          color='inherit'
          href="/"
          edge='start'
          className={classes.menuButton}
        >
          <BackIcon fontSize='inherit'/>
        </IconButton>
        <img
          className={classes.logo} 
          alt='navbarlogo' 
          src={NavBarLogo}
          draggable={false}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;