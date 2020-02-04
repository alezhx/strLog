import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, } from '@material-ui/core';
import { UtilsTool } from 'utils'
import ReactToPrint from 'react-to-print'
import { CustomButton, CustomModal } from 'basecomponents';
import { Print } from '@material-ui/icons'

import IclinicInbox from 'assets/documentation/messaging/iclinicinbox.png'
import PtMessage from 'assets/documentation/messaging/ptmessage.png'
import VIPHome from 'assets/documentation/messaging/viphome.PNG'
import VIPMsgList from 'assets/documentation/messaging/vipmsglist.PNG'
import VIPMsg from 'assets/documentation/messaging/vipmsg.PNG'
import DocManagement from 'assets/documentation/messaging/docmanagement.png'
import SendToVipH from 'assets/documentation/messaging/sendtoviph.png'
import AttachmentMsg from 'assets/documentation/messaging/attachmentmsg.PNG'
import Attachment from 'assets/documentation/messaging/attachment.PNG'
import SaveShare from 'assets/documentation/messaging/saveshare.PNG'

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

const MessagingDoc = () => {
  const classes = useStyles();
  const [image,setImage] = useState(null)
  useEffect(()=>UtilsTool.scrollToTop(), []);

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
              Messaging
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
          Compose Patient Messages
        </Typography>
        
        <Typography>
          VIPHealth aims to help streamline communication between providers and patients with real time messaging. To send messages to patients, navigate to your 
          inbox inside iClinic. Click on <b>Compose Patient Message</b> to start a new message. Select the patient to message by pressing the <b>Search</b> button.
        </Typography>
        <Grid item container xs={12} justify='center' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={IclinicInbox} 
              onClick={() => openModal(IclinicInbox)}
            />
          </Grid>
          <Grid item container xs={10} style={{marginTop:40}} justify='center'>
            <img className={classes.image} alt='flyer' src={PtMessage}
              onClick={() => openModal(PtMessage)}
            />              
          </Grid>
        </Grid>

        <Typography>
          Enter a subject and body for the message and then press the <b>Send</b> button to send the message to
          the patient's device. The patient will receive a push notification on their phone upon receiving the
          message. Patients can access their messages by pressing the <b>Messages</b> feature on the home screen of VIPHealth.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={VIPHome}
              onClick={() => openModal(VIPHome)}
              />                            
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={VIPMsgList}
              onClick={() => openModal(VIPMsgList)}
            />                            
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={VIPMsg}
              onClick={() => openModal(VIPMsg)}
            />                            
          </Grid>
        </Grid>

        <Typography className={classes.header}>
          Sending Attachments
        </Typography>

        <Typography>
          As medical practices transition to a more paperless and electronic workflow, VIPHealth gives the powerful ability to send any printable file to patients
          in realtime. In addition to sending regular text messages, clinics are also able to send attachments such as pictures, documents, 
          lab reports, educational articles, and imaging tests. To attach a file to a patient message, navigate to the patient's chart in iClinic and click on the <b>Doc&Lab</b> or <b>Document Management</b> tab. 
          Select the file that you wish to send to the patient.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={DocManagement} 
              onClick={() => openModal(DocManagement)}
            />                            
          </Grid>
        </Grid>

        <Typography>
          On the file preview page, click on <b>Send to VIPHealth</b> at the top to open the new message dialog box. You can add a subject and body to the message if
          you choose to. Press the <b>Send</b> button on the dialog box to forward the attachment to the patient's device. 
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={10} justify='center'>
            <img className={classes.image} alt='flyer' src={SendToVipH} 
              onClick={() => openModal(SendToVipH)}
            />                            
          </Grid>
        </Grid>

        <Typography>
          Patients can find the attachment inside the <b>Messages</b> feature along with their other messages. To open the attachment, simply press on the attachment link
          within the patient message. Patients are also given the options to save the attachment to their medical folder inside the app, or share the file with others.
        </Typography>
        <Grid item container xs={12} justify='space-around' className={classes.container}>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={AttachmentMsg}
              onClick={() => openModal(AttachmentMsg)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={Attachment}
              onClick={() => openModal(Attachment)}
            />
          </Grid>
          <Grid item container xs={3} justify='center'>
            <img className={classes.image} alt='flyer' src={SaveShare}
              onClick={() => openModal(SaveShare)}
            />
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
};

export default MessagingDoc;