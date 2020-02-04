import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@material-ui/core';
import { CustomSvgIcon } from 'basecomponents';
import InvertedLogo from 'assets/invertedLogo.png';
import palette from 'style/palette';

const PatientIcon = props => <CustomSvgIcon {...props} path='M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z' />

const VIPLogo = props =>
  <div {...props.rest}>
    <img alt='logo' src={InvertedLogo} draggable={false} style={{width:95}}/> 
  </div>

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 16
  },
  statLine: {
    paddingTop: 16
  },
  text: {
    fontWeight: 700,
    fontSize: '3em',
    lineHeight: 1.2
  },
  subtext: {
    lineHeight: 0,
    color: theme.palette.darkGray
  },
  patientIcon: {
    fontSize:95,
    padding:0
  },
  textContainer: {
    width:150, 
    display:'flex', 
    flexDirection: 'column', 
    textAlign:'center'
  }
}));

const StatsCard = (props) => {
  const classes = useStyles();
  const { totalVIP, totalPatients } = props

  const percentSignedUp = (totalVIP/totalPatients)*100

  return (
    <Card raised>
      <CardContent>
        <div className={classes.content}>
          <Grid container className={classes.statLine} alignItems='center' justify='center'>
            <Grid container justify='flex-end' item xs={5}>
              <PatientIcon color='primary' className={classes.patientIcon}/>
            </Grid>
            <Grid container item xs={6} style={{marginLeft:24}}>
              <div className={classes.textContainer}>
                <Typography className={classes.text}>
                  {totalPatients}
                </Typography>
                <Typography className={classes.subtext}>
                  total patients
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid container className={classes.statLine} alignItems='center' justify='center'>
            <Grid container justify='flex-end' item xs={5}>
              <VIPLogo />
            </Grid>
            <Grid container item xs={6} style={{marginLeft:24}}>
              <div className={classes.textContainer} style={{paddingBottom:16}}>
                <Typography className={classes.text}>
                  {totalVIP}
                </Typography>
                <Typography className={classes.subtext}>
                  VIPHealth patients
                </Typography>
              </div>
            </Grid>
          </Grid>

        </div>
      </CardContent>
      <Divider variant='middle'/>
      <CardContent>
      <div className={classes.content}>
        <Grid container justify='center'>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Typography 
              className={classes.text} 
              style={{
                fontSize:'4em', 
                color: !percentSignedUp ? palette.white : percentSignedUp > 50 ? palette.green
                : percentSignedUp > 25 ? palette.darkOrange : palette.cardinal
              }}
            >
              {(percentSignedUp&&percentSignedUp<=100) ? percentSignedUp.toString().substring(0,4) + "%" : null}
            </Typography>
            <Typography className={classes.subtext}>
              patients registered for VIPHealth
            </Typography>
          </Grid>
        </Grid>
      </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
