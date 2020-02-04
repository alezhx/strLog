import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import { UtilsTool } from 'utils'
import ReactToPrint from 'react-to-print'
import { CustomButton, CustomModal } from 'basecomponents';
import { Print } from '@material-ui/icons'

import EnableSchedule from 'assets/documentation/scheduling/enableSchedule.png'
import SelectLocation from 'assets/documentation/scheduling/selectLocation.png'
import EditAvailability from 'assets/documentation/scheduling/editAvailability.png'
import ScheduleTable from 'assets/documentation/scheduling/scheduleTable.png'
import ScheduleRow from 'assets/documentation/scheduling/scheduleRow.png'
import DropDown from 'assets/documentation/scheduling/dropdown.png'
import SaveChanges from 'assets/documentation/scheduling/saveChanges.png'
import InboxScheduler from 'assets/documentation/scheduling/inboxscheduler.png'
import Scheduler from 'assets/documentation/scheduling/scheduler.png'
import SchedulerConfirm from 'assets/documentation/scheduling/schedulerconfirm.png'
import SearchProvider from 'assets/documentation/scheduling/searchprovider.PNG'
import ProfileView from 'assets/documentation/scheduling/profileview.PNG'
import BookedMsg from 'assets/documentation/scheduling/bookedmsg.PNG'
import ScheduleHome from 'assets/documentation/scheduling/scheduleHome.PNG'
import Appointment from 'assets/documentation/scheduling/appointments.PNG'
import Favorites from 'assets/documentation/scheduling/favorites.PNG'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    '@media print' : {
      paddingTop: '20mm'
    }
  },
  title: {
    fontSize: 40,
    marginBottom: theme.spacing(1)
  },
  header: {
    fontSize: 30,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
    maxHeight: 480,
    objectFit: 'contain',
    border: `2px solid ${theme.palette.primary.main}`,
    cursor: 'zoom-in'
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  triggerButton: {
    paddingLeft: '2em',
    paddingRight:'1.25em',
    '@media print' : {
      display: 'none'
    }   
  }
}));

const SchedulingDoc = () => {
  const classes = useStyles();
  const [image,setImage] = useState(null)
  useEffect(()=>UtilsTool.scrollToTop(), []);

  const CustomNavLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <NavLink {...itemProps} innerRef={ref} />
      ))
  ,[]);

  const openModal = (imageUrl) => {
    return setImage(imageUrl)
  }

  const printRef = React.useRef()

  return (
    <div className={classes.root} ref={printRef}>
      <CustomModal 
        imageSrc={image}
        onClose={()=>setImage(null)}
      />
      <Grid container direction='column'>
        <Grid item container xs={12} alignItems='center'>
          <Grid item xs={9}>
            <Typography className={classes.title}>
              Scheduling
            </Typography>
          </Grid>
          <Grid item container xs={3} justify='flex-end'>
            <ReactToPrint 
              trigger={() => 
                <CustomButton 
                  left
                  className={classes.triggerButton}
                  icon={Print}
                  iconProps={{
                    fontSize: 'small'
                  }}
                >
                  Print
                </CustomButton>}
              content={() => printRef.current}
            />
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Enable Online Scheduling
        </Typography>
        
        <Typography>
        To allow patients to schedule appointments through VIPHealth, providers must first enable the online scheduling setting in the Provider Portal. 
        Navigate to the
        &nbsp;
        <Link to='/settings/general' component={CustomNavLink}>
          Settings → General
        </Link>
        &nbsp;
        tab to turn on online scheduling. Additionally, the <i>Enable Telehealth</i> option will allow patients to schedule
        Telehealth virtual visit appointments. To learn more about telemedicine and virtual visits, click&nbsp;
        <Link
          component='a'
          href='https://www.medicaid.gov/medicaid/benefits/telemed/index.html'
          target='_blank'
        >
          here
        </Link>
        .
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={EnableSchedule} 
              onClick={() => openModal(EnableSchedule)}
            />
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Customize Location Schedule
        </Typography>
        <Typography>
        After enabling online scheduling, navigate to the 
        <Link to='/settings/schedule' component={CustomNavLink}>
          &nbsp;Settings → Schedule&nbsp;
        </Link>
        tab to configure your schedule settings for each office location.
        Use the dropdown menu to select the location you wish to edit from your location list.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={SelectLocation} 
              onClick={() => openModal(SelectLocation)}            
            />
          </Grid>
        </Grid>

        <Typography>
        In the location schedule card, you can customize your scheduling preferences including scheduling interval,
        availability and patients per time slot. Note that each location will have separate schedule settings.
        You must set your location settings for each location you wish to enable online scheduling for.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={EditAvailability}
              onClick={() => openModal(EditAvailability)}
            />
          </Grid>
        </Grid>

        <Typography>
        To customize your online scheduling hours, click the <b>Edit Availability</b> button to open your schedule table. In the schedule 
        table dialog, providers can add new scheduling rules for each day of the week. To edit or remove a rule, select the corresponding 
        icon button in the <b>Actions</b> column. 
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={ScheduleTable} 
              onClick={() => openModal(ScheduleTable)}
            />
          </Grid>
        </Grid>

        <Typography>
        To add a new row, click on the add icon in the top right. Weekday, start time, and end time must be specified in order to set up a new rule. 
        Click on the checkmark icon to confirm the new table row entry. Finally, to save all changes to your schedule table, click the <b>Update schedule</b> button in the bottom right of the dialog box.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={ScheduleRow} 
              onClick={() => openModal(ScheduleRow)}
            />
          </Grid>
        </Grid>

        <Typography>
        To configure your scheduling interval (time between each appointment slot) and max patient per time slot settings, simply use the 
        dropdown menus located at the bottom of the location schedule card. Finally, when you are finished editing all location settings, 
        click the green <b>SAVE CHANGES</b> button to submit your preferences.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={6} justify='center'>
            <img className={classes.image} alt='flyer' src={DropDown} 
              onClick={() => openModal(DropDown)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={SaveChanges} 
              onClick={() => openModal(SaveChanges)}
            />
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Viewing your patient schedule requests from iClinic 
        </Typography>
        <Typography>
          You can view your schedule requests within the iClinic environment.
          When a patient sends your office a request for an appointment, you can see the request inside your Inbox/Outbox tab inside of iClinic.
          You can click on the patient message to view, approve, or reject the details of the appointment.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={InboxScheduler} 
              onClick={() => openModal(InboxScheduler)}
            />
          </Grid>
        </Grid>

        <Typography>
          Alternatively, you can go see the proposed appointment in the schedule section of iClinic.
          You can click on the time block to decide what action to take for the appointment.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={Scheduler} 
              onClick={() => openModal(Scheduler)}
            />
          </Grid>
        </Grid>

        <Typography>
          Once you have clicked inside the appointment time block, iClinic will take you to the appointment editor page.
          Here you can change the status to confirm the appointment.
          You can provide other details and documentation as you like.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={SchedulerConfirm} 
              onClick={() => openModal(SchedulerConfirm)}
            />
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Patient Scheduling
        </Typography>
        <Typography>
          Patients can schedule and send appointment requests through their patient portal on VIPHealth.
          To get started, simply login to VIPHealth and press on the schedule icon in the home grid.
          Once inside the Schedule tab the patient will see all their appointments they have and the status of them.
          Click the plus sign in the bottom right corner to create an appointment.
          Patients can also create a list of their most frequent or favorite doctors to make appointments with.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={ScheduleHome} 
              onClick={() => openModal(ScheduleHome)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={Appointment} 
              onClick={() => openModal(Appointment)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={Favorites} 
              onClick={() => openModal(Favorites)}
            />
          </Grid>
        </Grid>

        <Typography>
          To find their doctor they'd like, they can search for the doctor within the <b>Find a Doctor</b> search bar at the top center.
          Once they've clicked on the doctor they can add them to their favorites.
          In the physician's profile, we can now book an appointment when viewing their profile.
          Simply select whether it will be an in person office visit or a virtual visit.
          Then select the time and date, and press <b>Book</b> at the bottom of the screen.
          Once booked, the patient will receive a confirmation message in their messages in VIPHealth.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={SearchProvider} 
              onClick={() => openModal(SearchProvider)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={ProfileView} 
              onClick={() => openModal(ProfileView)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={BookedMsg} 
              onClick={() => openModal(BookedMsg)}
            />
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
};

export default SchedulingDoc;