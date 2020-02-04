import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

const HALF_SIDEBAR_WIDTH = 260/2

const useStyles = makeStyles(theme => ({
  overlayOff: {
    display: 'none',
    zIndex: 998,
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: props => 
      (props.isSidebarOpen && props.location.pathname.substr(0,6) !== '/login')
        ? HALF_SIDEBAR_WIDTH : 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems:'center'
  },
  overlayOn: {
    display: 'flex',
  },
}))

const LoadingSpinnerOverlay = (props) => {
    const classes = useStyles(props);
    const {isLOADING} = props;

    return (
      <div className={clsx(
          classes.overlayOff, 
          {[classes.overlayOn]:isLOADING},
        )}
      >
        <CircularProgress size={64} thickness={4.8} />    
      </div>
    );
};

const mapStateToProps = (state) => ({
  isLOADING: state.login.isLOADING,
  isSidebarOpen: state.login.isSidebarOpen
});

export default connect(mapStateToProps)(withRouter(LoadingSpinnerOverlay));