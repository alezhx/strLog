import React, { PureComponent } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { LoadingSpinnerOverlay } from 'basecomponents'

import { TopNavBar, SideBar, Footer } from './components';
import { actions } from 'redux/actions';

const SIDEBAR_WIDTH = 260
const TOP_NAVBAR_HEIGHT = 70

const styles = theme => ({
  root: {
    paddingTop: TOP_NAVBAR_HEIGHT,
    paddingLeft: SIDEBAR_WIDTH,
  },
  main: {
    display:'flex',
    flexDirection: 'column',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -SIDEBAR_WIDTH,
    padding: theme.spacing(3)
  },
  mainSqueeze: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content: {
    minHeight: '76vh'
  }
});

class MainLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { classes, isSidebarOpen, toggleSidebar, children } = this.props;
    
    // let sidebarStatus = true
    // typeof(isSidebarOpen) !== undefined ? sidebarStatus = isSidebarOpen : sidebarStatus = true

    return (
      <div className={classes.root}>
        <TopNavBar onSidebarToggle={() => toggleSidebar()} />
        <SideBar isOpen={isSidebarOpen}/>
        <main 
          className={clsx(classes.main, {
            [classes.mainSqueeze]: isSidebarOpen,
          })}
        >
          <LoadingSpinnerOverlay />
          <div className={classes.content}>
            {children}
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isSidebarOpen: state.login.isSidebarOpen
})

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: () => {
    dispatch(actions.toggleSidebar())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainLayout))