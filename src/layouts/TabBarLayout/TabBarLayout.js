import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTabBar from 'basecomponents/CustomTabBar';
import { MainLayout } from 'layouts'


const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
  main: {
    display:'flex',
    flexDirection: 'column',
    // paddingTop: theme.spacing(3),
  },
}));

const settingsTabs = [          
  { label: 'Profile', path:'/settings/profile' },
  { label: 'General', path:'/settings/general' },
  { label: 'Schedule', path:'/settings/schedule' },
  { label: 'Live Preview', path:'/settings/preview' },
]

const TabBarLayout = (props) => {
  const classes = useStyles();

  return (
    <MainLayout>
      <div className={classes.root}>
        <CustomTabBar tabs={settingsTabs} />
        <div className={classes.main}>
          {props.children}
        </div>
      </div>
    </MainLayout>
  );
};

export default TabBarLayout;
