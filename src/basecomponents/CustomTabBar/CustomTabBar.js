import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, withRouter } from 'react-router-dom'
import { Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import { CustomButton } from 'basecomponents'
import { SaveAlt as Save } from '@material-ui/icons'

const useTabsStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const useTabStyles = makeStyles((theme) => ({
  root: {
    minHeight: 53,
    minWidth: 80,
    [theme.breakpoints.up('md')]: {
      minWidth: 160,
    },
    '&:hover': {
      backgroundColor: 'rgba(29, 161, 242, 0.1)',
      '& .MuiTab-label': {
        color: theme.palette.primary.main,
      },
    },
    '&$selected': {
      '& *': {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
      },
    },
  },
  selected: {},
  textColorInherit: {
    opacity: 1,
  },
  wrapper: {
    textTransform: 'none',
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: theme.palette.lightGray,
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom:8
  },
  topNav: {
    display: 'flex'
  },
  button: {
    color: theme.palette.white,
    fontSize: '1em',
    maxHeight:40,
    backgroundColor: theme.palette.green,
  },
  buttonDiv: {
    width:'30%', 
    display:'flex', 
    justifyContent: 'flex-end'
  },
  divider: {
    height: 1.1
  }
}))

const CustomTabBar = withRouter(({ tabs, tabProps, history, ...props }) => {
  const tabsClasses = useTabsStyles(props);
  const tabClasses = useTabStyles(tabProps);
  const classes = useStyles();

  return (
  <div className={classes.root}>
    <div className={classes.topNav}>
      <Tabs 
        value={history.location.pathname} 
        classes={tabsClasses}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.label}
            value={tab.path}
            component={Link}
            to={tab.path}
            disableRipple
            classes={{
              ...tabClasses,
              wrapper: `${tabClasses.wrapper} MuiTab-label`,
            }}
            {...tab}
          />
        ))}
      </Tabs>
      <div className={classes.buttonDiv}>
        <CustomButton
          disabled={props.isSaveButtonDisabled}
          className={classes.button}
          bgColor='green'
          onClick={()=>props.saveButtonAction()}
          icon={Save}
          left
          style={{
            display: props.hideSaveButton && 'none',
            paddingRight:'0.75em', 
            paddingLeft:'2em'
          }}
        >
          SAVE CHANGES
        </CustomButton>
      </div>
    </div>
    <Divider className={classes.divider}/>
  </div>
  );
});

const mapStateToProps = state => ({
  saveButtonAction: state.settings.saveButtonAction,
  isSaveButtonDisabled: state.settings.isSaveButtonDisabled,
  hideSaveButton: state.settings.hideSaveButton
})

export default connect(mapStateToProps)(CustomTabBar);