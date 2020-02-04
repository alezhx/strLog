import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Topbar } from './components';
import { Footer } from '../MainLayout/components'
import { LoadingSpinnerOverlay } from 'basecomponents';

const appBarHeight = 86

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: appBarHeight,
    height: '100%',
  },
  content: {
    display:'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(8),
    alignItems:'center',
    justifyContent:'center',
    minHeight: '68vh'
  }
}));

const LoginLayout = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>
        <LoadingSpinnerOverlay />
        {children}
        <Footer/>
      </main>
    </div>
  );
};

export default LoginLayout;
