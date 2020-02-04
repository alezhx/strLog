import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Link, } from '@material-ui/core';
import { UtilsTool } from 'utils';
import ReactToPrint from 'react-to-print'
import { CustomButton, CustomModal } from 'basecomponents';
import { Print } from '@material-ui/icons'

import PhysicalOmron from 'assets/documentation/myMonitor/physicalomron.jpg'
import AppStoreOmron from 'assets/documentation/myMonitor/appstoreomron.PNG'
import Login from 'assets/documentation/myMonitor/login.PNG'
import CreateAccount from 'assets/documentation/myMonitor/createaccount.PNG'
import StartHome from 'assets/documentation/myMonitor/starthome.PNG'
import PairSelect from 'assets/documentation/myMonitor/pairselect.PNG'
import OmronDevice from 'assets/documentation/myMonitor/omrondevice.jpg'
import PairInstructions from 'assets/documentation/myMonitor/pairinstructions.PNG'
import Bluetooth from 'assets/documentation/myMonitor/bluetooth.PNG'
import VipHome from 'assets/documentation/myMonitor/viphome.PNG'
import VipSelectDevice from 'assets/documentation/myMonitor/viphselectdevice.PNG'
import VipLogin from 'assets/documentation/myMonitor/viphlogin.PNG'
import VipPermissions from 'assets/documentation/myMonitor/viphpermissions.PNG'
import VipSuccessPair from 'assets/documentation/myMonitor/viphsuccesspair.PNG'


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

const MyMonitorDoc = () => {
  const classes = useStyles();
  const [image,setImage] = useState(null)
  useEffect(()=>UtilsTool.scrollToTop(), [])

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
              myMonitor
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
          OMRON Setup
        </Typography>
        
        <Typography>
          The OMRON blood pressure monitor is an FDA approved device that can be used for remote patient monitoring of systolic and diastolic blood pressure. 
          The
          <Link href='https://www.amazon.com/Omron-Wireless-200-Reading-Technology-Bluetooth%C2%AE/dp/B00KW4PO82'> 
            &nbsp;OMRON BP-786N&nbsp;
          </Link>
          is available to purchase online, or can be provided by MDLand for testing purposes upon request. To use the OMRON blood pressure monitor with VIPHealth, 
          the patient will need to have the OMRON Connect mobile application installed on their phone in addition to the OMRON device.
        </Typography>
        
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={4} justify='center'>
              <img className={classes.image} alt='flyer' src={PhysicalOmron} 
                onClick={() => openModal(PhysicalOmron)}
              />
          </Grid>
          <Grid item container xs={4} justify='center'>
              <img className={classes.image} alt='info-card' src={AppStoreOmron}
                onClick={() => openModal(AppStoreOmron)}
              />
          </Grid>
        </Grid>

        <Typography>
          The OMRON Connect app can be downloaded from the App Store or Google Play Store. After installing the app, the patient should follow the steps to create an OMRON 
          account. 
        </Typography>

        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={Login} 
              onClick={() => openModal(Login)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={CreateAccount}
              onClick={() => openModal(CreateAccount)}
            />
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Pair OMRON Device
        </Typography>

        <Typography>
          After the account is created, the physical OMRON device will need to be paired with the patient's mobile device. To do this, press 
          “Get started” or “Add blood pressure”. Ensure that bluetooth is enabled on the mobile device, then follow the on-screen directions to 
          pair the blood pressure monitor to OMRON Connect.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={StartHome}
              onClick={() => openModal(StartHome)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={PairSelect}
              onClick={() => openModal(PairSelect)}
            />
          </Grid>
        </Grid>

        <Typography>
          To begin pairing the 
          <Link href='https://www.amazon.com/Omron-Wireless-200-Reading-Technology-Bluetooth%C2%AE/dp/B00KW4PO82'> 
            &nbsp;OMRON BP-786N&nbsp;
          </Link>          
          device, press and hold the clock button on the device until the flashing indicator appears on the monitor's 
          screen. Then press <b>Pair now</b> inside the OMRON Connect mobile app. A bluetooth pairing alert should pop up on the screen. Press <b>Pair</b> to
          approve the pairing request.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={4} justify='center'>
            <img className={classes.image} alt='flyer' src={OmronDevice}
              onClick={() => openModal(OmronDevice)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={PairInstructions}
              onClick={() => openModal(PairInstructions)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={Bluetooth}
              onClick={() => openModal(Bluetooth)}
            />
          </Grid>
        </Grid>

        
        <Typography className={classes.header}>
          Connect to VIPHealth
        </Typography>

        <Typography>
          Once the blood pressure monitor is paired with the patient's mobile device, the next step is to connect OMRON to
          VIPHealth. On the home screen in VIPHealth select <b>myMonitor</b> and then press the "<b>+</b>" icon in the top right to view the supported devices list.
          Select the OMRON device from the list.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='info-card' src={VipHome}
              onClick={() => openModal(VipHome)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='info-card' src={VipSelectDevice}
              onClick={() => openModal(VipSelectDevice)}
            />
          </Grid>
        </Grid>

        <Typography>
          The user will be prompted to authorize VIPHealth with their OMRON account. Enter your OMRON credentials and then press <b>Allow</b> to complete the setup. 
          The screen should then indicate successful authorization. Blood pressure measurements will now be able to sync with VIPHealth and iClinic automatically!
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='info-card' src={VipLogin}
              onClick={() => openModal(VipLogin)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='info-card' src={VipPermissions}
              onClick={() => openModal(VipPermissions)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='info-card' src={VipSuccessPair}
              onClick={() => openModal(VipSuccessPair)}
            />
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
};

export default MyMonitorDoc;