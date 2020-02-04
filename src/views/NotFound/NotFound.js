import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import NotFoundImage from 'assets/404.png'

const useStyles = makeStyles(theme => ({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '60vh',
    backgroundColor: theme.palette.primary
  },
  notFoundImage: {
    width:'15em', 
    height:'15em', 
    objectFit:'contain'
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <img
        alt='404'
        className={classes.notFoundImage}
        src={NotFoundImage}
      />
      <div>
        <Typography align='center' color={'primary'} variant='h1'>
          404
        </Typography>
        <Typography variant="h2" color={'textPrimary'}>
          Page Not Found :(
        </Typography>
      </div>
    </div>
  );
};

export default NotFound;
