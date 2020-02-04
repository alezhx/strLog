import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align='center' variant='body2'>
        &copy;{' '}2020 All rights reserved.{' '}
        <Link
          component='a'
          href='https://google.com/'
          target='_blank'
        >
          Rice4Lyfe
        </Link>
        .
      </Typography>
    </div>
  );
};

export default Footer;
