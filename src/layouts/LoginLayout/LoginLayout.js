import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Footer } from '../MainLayout/components'
import { LoadingSpinnerOverlay } from 'basecomponents';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  content: {
    height: '100%',
    width: '100%',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
  }
}));

const LoginLayout = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <LoadingSpinnerOverlay />
        {children}
        {/* <Footer/> */}
      </main>
    </div>
  );
};

export default LoginLayout;
