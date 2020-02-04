import React, {PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Modal,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit'
import ScheduleTable from '../ScheduleTable'
import ViewScheduleTable from '../ViewScheduleTable'
import { CustomButton, CustomAlert } from 'basecomponents';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  textField: {
    width:'75%',
  },
  inputLabelContainer: {
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingRight:16,
  },
  blackFont: {
    color:'black'
  },
  themeFont: {
    color: theme.palette.primary.main
  },
  viewTableContainer: {
    padding:'16px 64px 64px'
  },
  modalTableContainer: {
    outline:'none',
    width:'60%'
  }
});

const intervals = [
  {
    value: 5,
    label: '5 minutes',
  },
  {
    value:  10,
    label: '10 minutes',
  },
  {
    value: 15,
    label: '15 minutes',
  },
  {
    value: 20,
    label: '20 minutes',
  },
  {
    value: 30,
    label: '30 minutes',
  },
  {
    value: 60,
    label: '1 hour',
  },
];

const doubleBooks = [
  {value: 1, label: '1 appointment'},
  {value: 2, label: '2 appointments'},
  {value: 3, label: '3 appointments'},
  {value: 4, label: '4 appointments'},
  {value: 5, label: '5 appointments'},
  {value: 6, label: '6 appointments'},
  {value: 7, label: '7 appointments'},
  {value: 8, label: '8 appointments'},
  {value: 9, label: '9 appointments'},
  {value: 10, label: '10 appointments'},
]

const visitTypes = [
  {value: 0, label: 'Office visits and TeleHealth'},
  {value: 1, label: 'Office visits only'},
  {value: 2, label: 'TeleHealth only'}
]

class ScheduleLocationCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isScheduleModalOpen: false,
      // isBlockDialogOpen: false,
      // blockStart: new Date(),
      // blockEnd: new Date(),
      // displayBlocks: [],
      // isEditingBlocks: false,

      isAlertOpen: false
    }
  }

  openScheduleModal = () => {
    this.setState({isScheduleModalOpen: true})
  }

  closeScheduleModal = () => {
    this.setState({isScheduleModalOpen: false})
  }

  openBlockDialog = () => {
    this.setState({isBlockDialogOpen: true})
  }

  closeBlockDialog = () => {
    this.setState({isBlockDialogOpen: false})
  }

  renderLocationSettings = () => {
    const {classes} = this.props
    const { scheduleInterval, maxAppointment, visitTypesAllowed, locationId, handleChange } = this.props

    return (
      <Grid container spacing={1}>
        <Grid item xs={6} container justify='center'>
          <Grid item container xs={6} className={classes.inputLabelContainer}>
            <InputLabel className={classes.blackFont}>
              Schedule interval
            </InputLabel>
          </Grid>
          <Grid item xs={6} container>
            <TextField
              required
              error={!scheduleInterval[locationId]}
              fullWidth
              name='scheduleInterval'
              onChange={event=>handleChange(event, locationId)}
              select
              label="Select"
              className={classes.textField}
              value={
                scheduleInterval[locationId] ? scheduleInterval[locationId] : 0
              }
              margin="normal"
              variant="outlined"
            >
              {intervals.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value + ' minutes'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs={6} container justify='center'>
          <Grid item container xs={6} className={classes.inputLabelContainer}>
            <InputLabel className={classes.blackFont}>
              Patients per time slot
            </InputLabel>
          </Grid>
          <Grid item xs={6} container>
            <TextField
              name='maxAppointment'
              onChange={event=>handleChange(event, locationId)}
              select
              label="Select"
              className={classes.textField}
              value={
                maxAppointment[locationId] ? maxAppointment[locationId] : 1
              }
              margin="normal"
              variant="outlined"
              style={{width:'50%'}}
            >
              {doubleBooks.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item container xs={3} className={classes.inputLabelContainer}>
            <InputLabel className={classes.blackFont}>
              Visit types allowed
            </InputLabel>
          </Grid>
          <Grid item xs={5} container>
            <TextField
              name='visitTypesAllowed'
              onChange={event=>handleChange(event, locationId)}
              select
              label="Select"
              className={classes.textField}
              value={
                visitTypesAllowed[locationId] ? visitTypesAllowed[locationId] : 1
              }
              margin="normal"
              variant="outlined"
            >
              {visitTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  checkScheduleInterval = () => {
    const { scheduleInterval, locationId } = this.props

    if(scheduleInterval[locationId]) {
      this.openScheduleModal()
    } else {
      this.openAlert()
    }
  }

  renderCardContent = () => {
    const {scheduleData, clinicName, phone, address, classes} = this.props

    const Subheader = () => {
      return (
        <Grid container>
          <Grid item container xs={8} direction='column'>
            <Typography variant='body1' className={classes.blackFont}>
              Phone: <span className={classes.themeFont}>{phone}</span>
            </Typography>
            <Typography variant='body1'>
              {address}
            </Typography>
          </Grid>

          <Grid item container xs={4} justify='flex-end' alignItems='center'>
            <CustomButton
              // onClick={this.openScheduleModal}
              onClick={this.checkScheduleInterval}
              icon={Edit}
              iconProps={{
                fontSize: 'small'
              }}
            >
              Edit Availability
            </CustomButton>
          </Grid>
        </Grid>
      )
    }

    return (
      <div>
        <CardHeader
          title={<Typography variant='h4'>{clinicName}</Typography>}
          subheader={<Subheader/>}
        />
        <CardContent className={classes.viewTableContainer}>
          <ViewScheduleTable scheduleData={scheduleData}/>
        </CardContent>
        <Divider />
        <CardHeader
          title="Location Settings"
          subheader="Change your scheduling preferences for this location"
        />
        <CardContent>
          {this.renderLocationSettings()}
        </CardContent>
      </div>
    )
  }

  saveScheduleModalChanges = (modalData) => {
    const {setScheduleData, locationId} = this.props
    setScheduleData(locationId, modalData, this.closeScheduleModal)
  }

  deleteScheduleRows = (oldData) => {
    const {deleteScheduleData, locationId} = this.props
    deleteScheduleData(locationId, oldData)
  }

  renderScheduleModal = () => {
    const {classes, scheduleData, clinicName, scheduleInterval, locationId} = this.props

    return (
      <Modal 
        open={this.state.isScheduleModalOpen}
        onClose={this.closeScheduleModal}
        className={classes.modal}
      >
        <div className={classes.modalTableContainer}>
          <ScheduleTable
            title={clinicName}
            onCancel={this.closeScheduleModal}
            scheduleData={scheduleData}
            deleteScheduleRows={this.deleteScheduleRows}
            saveScheduleModalChanges={this.saveScheduleModalChanges}
            scheduleInterval={scheduleInterval[locationId]}
          />
        </div>
      </Modal>
    )
  }

  openAlert = () => {
    this.setState({isAlertOpen:true})
  }

  closeAlert = () => {
    this.setState({isAlertOpen:false})
  }


  render() {
    const {classes} = this.props

    return (
      <Card
        className={classes.root}
        raised={true}
      >
        {this.renderCardContent()}
        {this.renderScheduleModal()}
        <CustomAlert
          open={this.state.isAlertOpen}
          onClose={this.closeAlert}
          title={'No schedule interval'}
          message={'Please select a schedule interval before adding availability.'}
        />
      </Card>
    );
  };
}

export default withStyles(styles)(ScheduleLocationCard);
