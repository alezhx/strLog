import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  gridItem: {
    display:'flex',
    alignItems: 'center',
    // padding: theme.spacing(2),
  },
  description: {
    fontSize: '1rem',
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(3)
  },
  label: {
    paddingLeft: theme.spacing(3)
  },
  row: {
    padding: theme.spacing(1),
    // justifyContent: 'center'
  },
  rowContainer: {
    display:'flex', 
    flexDirection:'column'
  }
}));

const GeneralSettingsCard = props => {
  const { settingsData, handleChange } = props;
  const classes = useStyles();

  const options = [
    {
      label: 'Enable online scheduling',
      description:  'Enabling this setting will allow patients and users to schedule appointments through VIPHealth on their mobile device',
      userChose: settingsData.OnlineScheduleEnable,
      stateKey: 'OnlineScheduleEnable'
    },
    {
      label: 'Enable Telehealth',
      description: 
      <Typography component='div'>
        Enabling Telehealth allows patients and users to schedule virtual visit appointments through VIPHealth. To learn more about virtual visits click&nbsp;
        <a target='blank' href={'https://www.medicaid.gov/medicaid/benefits/telemed/index.html'}>
          here
        </a>
        .
      </Typography>
      ,
      userChose: settingsData.TelehealthEnable,
      stateKey: 'TelehealthEnable'
    },
    {
      label: 'Enable patient messaging',
      description: 'Enable this setting to allow patients to send and reply to messages in VIPHealth.',
      userChose: settingsData.AllowPatientSendMessage,
      stateKey: 'AllowPatientSendMessage'
    },
    {
      label: 'Display lab reports in VIPHealth',
      description: 'Enable this setting to allow patients to view lab reports inside VIPHealth. Lab reports must be checked in before patients can view it.',
      userChose: settingsData.ShowAllLabReportListInVIPHeath,
      stateKey: 'ShowAllLabReportListInVIPHeath'
    },
    {
      label: 'Display diagnostic details in VIPHealth',
      description: 'Enable this setting to allow patients to view diagnostic details such as ICD codes in their Visit History within VIPHealth.',
      userChose: settingsData.DisplayICDCodeInVIPHealth,
      stateKey: 'DisplayICDCodeInVIPHealth'
    },
  ]

  const renderSettingsList = () => {
    return options.map((item,index)=> (
    <div key={index} className={classes.rowContainer}>
      <Grid
        container
        spacing={3}
        className={classes.row}
      >
        <Grid item xs={3} className={classes.gridItem}>
          <Typography className={classes.label}>{item.label}</Typography>
        </Grid>
        <Grid item xs={1} className={classes.gridItem}>
          <Switch 
            checked={Boolean(item.userChose)} 
            onChange={handleChange(item.stateKey)}
            color="primary" 
          />          
        </Grid>
        <Grid item xs={8} className={classes.gridItem}>
          <Typography component="div" className={classes.description}>{item.description}</Typography>
        </Grid>
      </Grid>
      {index===(options.length-1)? null : <Divider variant='middle' />}
    </div>
    ))
  }

  return (
    <Card
      className={classes.root}
      raised
    >
      <CardHeader
        subheader="Customize which features patients will have access to within VIPHealth"
        title="General Settings"
      />
      <CardContent>
        {renderSettingsList()}
      </CardContent>
    </Card>
  );
};

export default GeneralSettingsCard;
