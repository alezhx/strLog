import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Link, } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import { UtilsTool } from 'utils';
import ReactToPrint from 'react-to-print'
import { CustomButton, CustomModal } from 'basecomponents';
import { Print } from '@material-ui/icons'

import EnglishFlyer from 'assets/media/englishFlyer.png'
import ScanQRCode from 'assets/documentation/registration/scanqrcode.PNG'
import SearchAppStore from 'assets/documentation/registration/searchappstore.PNG'
import AppStore from 'assets/documentation/registration/appstore.PNG'
import Indicator from 'assets/documentation/registration/indicator.png'
import RegistrationCode from 'assets/documentation/registration/registrationcode.png'
import LoginScreen from 'assets/documentation/registration/loginscreen.PNG'
import EnterCode from 'assets/documentation/registration/entercode.PNG'
import BirthDate from 'assets/documentation/registration/birthdate.PNG'
import SmsVerify from 'assets/documentation/registration/smsverify.PNG'
import CreateAccount from 'assets/documentation/registration/createaccount.PNG'

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

const RegistrationDoc = () => {
  const classes = useStyles();
  const [image,setImage] = useState(null)
  useEffect(() => UtilsTool.scrollToTop(), [])

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
              Patient Registration
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
          Installation
        </Typography>
        
        <Typography>
          To begin using VIPHealth, patients must first install the mobile application on their device. 
          The VIPHealth provider portal offers 
          &nbsp;
          <Link to='/mediaresources' component={CustomNavLink}>
            media resources
          </Link>
          &nbsp;
          such as flyers and info cards, which can be displayed around the clinic in waiting room and patient room areas. 
        </Typography>
        
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={4} justify='center'>
            <img 
              className={classes.image} 
              alt='flyer' 
              src={EnglishFlyer} 
              onClick={() => openModal(EnglishFlyer)}
            />
          </Grid>
          <Grid item container xs={4} justify='center'>
              <img 
                className={classes.image} 
                alt='qrcode' 
                src={ScanQRCode}
                onClick={() => openModal(ScanQRCode)}
              />
          </Grid>
        </Grid>

        <Typography>
          These resources contain a QR code which can be scanned with the patient’s phone camera to easily download VIPHealth from the app store. Alternatively, users can also
          download the app by simply searching for <b>VIPHealth</b> within their device's app store.
        </Typography>

        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='searchappstore' 
              src={SearchAppStore}
              onClick={() => openModal(SearchAppStore)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='searchapp' 
              src={AppStore}
              onClick={() => openModal(AppStore)}
            />
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Registration
        </Typography>

        <Typography>
          After installation, patients must create an account to access VIPHealth. Registration requires a sign-up code (6 digit or QR code) which can be found in the patient's
          chart inside iClinic. Each patient in iClinic has a VIPHealth indicator located in the top right.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img 
              className={classes.image} 
              alt='info-card' 
              src={Indicator}
              onClick={() => openModal(Indicator)}
            />
          </Grid>
        </Grid>


        <Typography>
          A red indicator means that the patient is not yet signed up for VIPHealth; a green indicator means the patient is enrolled. 
          Click on the VIPHealth indicator to view the patient's registration code.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={12} justify='center'>
            <img 
              className={classes.image}
              alt='info-card' 
              src={RegistrationCode}
              onClick={() => openModal(RegistrationCode)}
            />
          </Grid>
        </Grid>


        <Typography>
          The registration code can be sent to the patient's phone via SMS, given verbally, or printed out for the patient. After obtaining the registration code, 
          patients can create their account within VIPHealth by pressing <b>Sign Up</b> on the login screen and then entering their registration code.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='info-card' 
              src={LoginScreen}
              onClick={() => openModal(LoginScreen)}
            />
          </Grid>
          {/* <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='info-card' src={'/assets/documentation/registration/signup.png'}/>
          </Grid> */}
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='info-card' 
              src={EnterCode}
              onClick={() => openModal(EnterCode)}
            />
          </Grid>
        </Grid>

        <Typography>
          The patient will then be prompted to enter their birthdate and phone number in order to verify their identity. The birthdate must match the patient's birthdate within 
          iClinic. After inputting this information, the user will be able to create their Health ID and password used to login to VIPHealth.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='info-card' 
              src={BirthDate}
              onClick={() => openModal(BirthDate)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='info-card' 
              src={SmsVerify}
              onClick={() => openModal(SmsVerify)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img 
              className={classes.image} 
              alt='info-card' 
              src={CreateAccount}
              onClick={() => openModal(CreateAccount)}
            />
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
};

export default RegistrationDoc;