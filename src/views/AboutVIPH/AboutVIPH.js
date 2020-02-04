import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardHeader, 
  Divider,
  Paper,
  Collapse, 
} from '@material-ui/core';
import Logo from 'assets/navbarlogo.png'
import Coverflow from 'react-coverflow'
import { CustomButton } from 'basecomponents';

import DrIphone from 'assets/pool/driphone.png'
import Calendar from 'assets/pool/Calendar.png'
import PillBottle from 'assets/pool/pill-bottle.png'
import TestTube from 'assets/pool/test-tube.png'
import EcgMonitor from 'assets/pool/ecg-monitor.png'
import VisitHistory from 'assets/pool/medical-folder.png'
import MedFolder from 'assets/pool/medfolder.png'
import Injection from 'assets/pool/injection.png'
import Pharmacy from 'assets/pool/pharmacy.png'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    margin: '24px 64px 0px',
    border: '2px solid black',
    color: theme.palette.white,
  },
  horizontalPadding: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },
  header: {
    fontSize: 30,
    color: theme.palette.black,
    marginBottom: theme.spacing(1),
  },
  cardTitle: {
    color: theme.palette.primary.main,
  },
  media: {
    height: 100,
    objectFit: 'contain',
  },
  infoCard: {
    position: 'relative',
    padding: theme.spacing(1),
  },
  cardContent: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  showMore: {
    position:'absolute', 
    top: 450, 
    left: '50%', 
    transform: 'translateX(-50%)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)'
  },
  showLess: {
    position: 'absolute',
    bottom: -15,
    left: '50%', 
    transform: 'translateX(-50%)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)'
  },
  imgContainer: {
    // display: 'flex',
    // justifyContent: 'center'
  },
  featureCard: {
    padding:'40px 8px 8px',
    maxHeight:400
  },
  featureDetails: {
    textAlign: 'center'
  },
  infoContainer: {
    justifyContent: "center", 
    display: "flex", 
    flexDirection: 'column', 
    padding: '80px 0px'
  },
  logo: {
    height:160
  }
}));

const AboutCards = [
  {
    id: 1, 
    title: 'Messaging', 
    img: DrIphone, 
    details: "The message feature enables patients to receive messages from their provider regarding appointment reminders, preventative care alerts, etc. Patients may also create and send a message to their provider.",
  },
  {
    id: 2, 
    title: 'Schedule',  
    img: Calendar, 
    details: "Patients may view available dates and times and schedule an appointment through the App. They may also change or cancel an appointment, provided changes are made at least 24 hours in advance.",
  },
  {
    id: 3, 
    title: 'Medication',  
    img: PillBottle, 
    details: "Patients may view his or her active medication list. A patient can request a medication refill request for the drugs on the list. The patient's provider will then receive the requests in their inbox and can approve or deny the requests.",
  },
  {
    id: 4, 
    title: 'Lab Reports',  
    img: TestTube,
    details: "Lab reports are included from all MDNetwork providers. Patients can receive notifications when diagnostic reports are available and initiate follow up appointments to review results with their provider.",
  },
  {
    id: 5, 
    title: 'myMonitor', 
    img: EcgMonitor, 
    details: "myMonitor effortlessly integrates patient vitals obtained through take-home diagnostic tools such as blood pressure monitors. Data is automatically synced from the mobile app into the patient's medical chart in iClinic.",
  },
  {
    id: 6, 
    title: 'Visit History',  
    img: VisitHistory, 
    details: "Patients can access any previous visit history for appointment notes made available by the provider. Patients are able to view vaccination records and other important health records.",
  },
  {
    id: 7, 
    title: 'Medical Folder',
    img: MedFolder,
    details: 'Patients are able to upload photos and scan documents to their personal medical folder, allowing patients to have all relevant medical documents on hand for any doctor visit.'
  },
  {
    id: 8, 
    title: 'Vaccination', 
    img: Injection,
    details: 'Patients can view their full vaccination record on their device. Additionally, patients receive push notifications to schedule an appointment when upcoming vaccines are due.'
  },
  {
    id: 9, 
    title: 'Pharmacy', 
    img: Pharmacy,
    details: 'Patients can conveniently locate nearby pharmacies to fill their prescriptions, as well as save pharmacy locations to their favorites.'
  }
]


const AboutVIPH = () => {
  const classes = useStyles();
  const [collapseVbp, setCollapseVbp] = useState(false)
  const [collapseMu3, setCollapseMu3] = useState(false)

  const mapRenderCards = () => {
    return AboutCards.map((item) =>
      <Card key={item.id} raised>         
        <div className={classes.featureCard}>
          <CardMedia
            component = 'img'
            image = {item.img}
            title = {item.title}
            className = {classes.media}
          />
          <CardContent className={classes.featureDetails}>
            <Typography gutterBottom className={classes.cardTitle} variant="h5">
              {item.title}
            </Typography>
            <Typography variant="caption">
              {item.details}
            </Typography>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <div className = {classes.root}>
      <div className = {classes.horizontalPadding}>
        <img src={Logo} className={classes.logo} alt='viphealth' draggable={false}/>
      </div>
      <Coverflow
        height={500}
        infiniteScroll={true}
        displayQuantityOfSide={2}
        navigation={false}
        enableHeading={false}
        enableScroll={false}
        currentFigureScale={1.2}
        otherFigureScale={.8}
      >
        {mapRenderCards()}
      </Coverflow>
      <div className={classes.horizontalPadding}>
      <div className={classes.infoContainer}>
        <Grid container spacing={8}>
          <Grid item container xs={6}>  
            <Collapse in={collapseVbp} collapsedHeight={"500px"}>
            <Paper elevation={8} className={classes.infoCard}>
              <CardHeader 
                title={'Value Based Payments (VBP)'}
                subheader={'Value-based programs reward health care providers with incentive payments for the quality of care they give to Medicare patients'}
                titleTypographyProps={{
                  className: classes.header
                }}
              />
              <Divider variant='middle'/>
              <CardContent className={classes.cardContent}>
                <Typography>
                  Value-based programs are part of a strategy to provide better care for patients, better public health, at reasonable costs for everyone.
                  Due to these changes, healthcare providers would be reimbursed based on services given, as opposed to the regular fee-for-service reimbursements.
                  These adjustments are a part of a national incentive to transform the health care industry into providing better service, while delivering acceptable rates for all.
                  Value Based Payments (VBP) are an important part to a practice's success in this ever changing healthcare landscape.
                  At MDLand, we're working to aid our clients in providing the best care possible and enhancing their performance through technology.
                  Sending reminders, notifications, and appointment confirmations from VIPHealth, all assist in improving the efficiency of a practice while fulfilling relevant QPP measures.
                  Patients using the application will also generate data for a practice, giving rapid access to information in making key decisions for practitioners.
                  With VIPHealth, we're helping to meet quality measures for VBP, every time, to improve the quality score of our care providers.
                  By utilizing VIPHealth, you can be sure that we're working towards helping to achieve the most for our clients and their practices. 
                </Typography>
              </CardContent>
              <CustomButton
                className={classes.showMore}
                onClick={() => setCollapseVbp(true)}
                style={{display: collapseVbp && 'none'}}
              >
                Show more
              </CustomButton>
              <CustomButton
                className={classes.showLess}
                onClick={() => setCollapseVbp(false)}
                style={{display: !collapseVbp && 'none'}}
                bgColor='darkOrange'
              >
                Show less
              </CustomButton>
            </Paper>
            </Collapse>
          </Grid>

          <Grid item container xs={6}>  
          <Collapse in={collapseMu3} collapsedHeight={"500px"}>
            <Paper elevation={8} className={classes.infoCard}>
              <CardHeader 
                title={'Meaningful Use 3 (MU3)'}
                subheader={'Meaningful Use is the use of certified EHR technology in a meaningful manner that provides for the electronic exchange of health information to improve the quality of care'}
                titleTypographyProps={{
                  className: classes.header
                }}
              />
              <Divider variant='middle'/>
              <CardContent className={classes.cardContent}>
                <Typography>
                  MU3 (Meaningful Use 3) is a part of Meaningful Use, a program that is meant to improve the use of technology and electronic data for the health care industry.
                  This program is an initiative to modernize and update the current healthcare landscape within the United States.
                  The goals of this program are to provide for the exchange of health care information through technology while improving on the quality of care provided.
                  By using technology, Meaningful Use aims to improve public health and efficiency while also ensuring the privacy and security of personal information.
                  MU3 as the third stage of Meaningful Use will continue with these objectives, by implementing certain measures such as protected health information, e-prescribing, health information exchange and more, into their requirements. 
                  With MDLand & our product VIPHealth, you can be sure we're meeting these requirements for MU3.
                  Aptly structured and easily accessible, our data is securely kept with best practices while retaining simplicity and transferability. 
                  Physicians, patients, and other health care providers can be reassured that at MDLand, our first and foremost responsibility is keeping data confidential. 
                  Patients can also take a more active approach and have more control when it comes to personalizing their health care with the VIPHealth app. 
                  With protected data, patient engagement and messaging, and user generated health data, VIPHealth is able to assist physicians in meeting MU3 requirements.
                </Typography>
              </CardContent>
              <CustomButton
                className={classes.showMore}
                onClick={() => setCollapseMu3(true)}
                style={{display: collapseMu3 && 'none'}}
              >
                Show more
              </CustomButton>
              <CustomButton
                className={classes.showLess}
                onClick={() => setCollapseMu3(false)}
                style={{display: !collapseMu3 && 'none'}}
                bgColor='darkOrange'
              >
                Show less
              </CustomButton>
            </Paper>
          </Collapse>
          </Grid>
        </Grid>
      </div>
      </div>
    </div>
  );
};

export default AboutVIPH;