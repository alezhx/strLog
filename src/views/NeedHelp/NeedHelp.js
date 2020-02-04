import React, { PureComponent } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';
import MDLogo from 'assets/mdlogo.png'
import HomeIcon from '@material-ui/icons/Home';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { connect } from 'react-redux'
import { actions } from 'redux/actions'
import { CustomButton, CustomAlert } from 'basecomponents';
import { HttpTool } from 'utils';
import { API_EmployeeSetting } from 'utils/API';


const styles = theme => ({
  root: {
    padding: theme.spacing(6)
  },
  card: {
    padding:theme.spacing(6),
    height: 500,
    display:'flex',
    alignItems:'center'
  },
  content: {
    height:'100%', 
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center'
  },
  contactContainer: {
    height:'100%', 
    width:'100%', 
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    padding: '24px 0px'
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  mdlogo: {
    maxWidth: '75%',
    height: 'auto',
  },
  icons: {
    color: theme.palette.primary.main,
    fontSize: '5em',
    paddingRight: 24
  },
  subtitle: {
    color: theme.palette.darkGray,
  },
});

class NeedHelp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      subject: null,
      message: null,
      isAlertOpen: false
    }
  }

  openAlert = () => {
    this.setState({isAlertOpen: true})
  }

  closeAlert = () => {
    this.setState({isAlertOpen: false})
  }

  sendEmail = (event) => {
    event.preventDefault();
    const {toggleLoadingOn, toggleLoadingOffTHUNK, MEmployeeID} = this.props;

    let param = {
      MEmployeeID: MEmployeeID,
      Email: this.state.email,
      Subject: this.state.subject,
      Content: this.state.message,
    }

    toggleLoadingOn();
    HttpTool.post(API_EmployeeSetting.addEmployeeFeedback, param, (response) => {
      if (response.status === 200) {
        toggleLoadingOffTHUNK();
      }
    }, (error) => {
      toggleLoadingOffTHUNK();
    }, () => {
      this.openAlert()
    })

    this.setState({
      email: '',
      subject: '',
      message: ''
    })
  }

  renderContactInfo = () => {
    const {classes} = this.props

    const data = [
      {id:1, icon:<HomeIcon className={classes.icons}/>, title:'15 East 32nd Street, 2nd Floor', subtitle:'New York, NY 10016'},
      {id:2, icon:<CallIcon className={classes.icons}/>, title:'212-363-8000', subtitle: 'Monday - Friday, 9:00AM - 6:00PM'},
      {id:3, icon:<EmailIcon className={classes.icons}/>, title:'support@mdland.com', subtitle: 'We look forward to hearing from you!' }
    ]

    return (
      <Card className={classes.card} raised>
        <CardContent className={classes.content}>
          <img 
            className={classes.mdlogo}
            alt='mdland' 
            src={MDLogo}
            draggable={false}
          />
          <div className={classes.contactContainer}>
          {data.map((item,index) => 
            <Grid item container xs={12} key={item.title+index}>
              <Grid item container xs={3} justify='flex-end' alignItems='center'>
                {item.icon}
              </Grid>
              <Grid item container xs={8} justify='center' direction='column'>
                <Typography variant='h5' color='primary'>
                  {item.title}
                </Typography>
                <Typography variant='h6' className={classes.subtitle}>
                  {item.subtitle}
                </Typography>
              </Grid>
            </Grid>
          )}
          </div>
        </CardContent>  
      </Card>
    )
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderContactForm = () => {
    const {classes} = this.props
    return(
      <Card className={classes.card} raised>          
        <ValidatorForm
          onSubmit={this.sendEmail}
        >            
          <TextValidator
            errorMessages = {['This field is required.', 'Email is not valid.']}
            validators = {['required', 'isEmail']}
            className={classes.textField}
            onChange={this.handleFormChange}
            fullWidth
            label="Email"                            
            type="text"              
            variant="outlined"
            name="email"
            value={this.state.email ? this.state.email : ''}
          />
          <TextField
            className={classes.textField}
            onChange={this.handleFormChange}
            fullWidth
            label="Subject"
            name="subject"
            type="text"
            variant="outlined"
            value={this.state.subject ? this.state.subject : ''}
          />
          <TextValidator
            errorMessages = {['This field is required.']}
            validators = {['required']}
            className={classes.textField}
            onChange={this.handleFormChange}
            fullWidth
            multiline = {true}
            rows = {13}
            label="Write to us!"
            name="message"
            type="text"
            variant="outlined"
            value={this.state.message ? this.state.message : ''}
          />
          <CustomButton
            fullWidth
            style={{margin:'24px 0px 8px', fontSize: '1.25em', padding:'12px 0'}} // Keep inline styles
            type="submit"
            size="large"
          >
            Submit
          </CustomButton>
        </ValidatorForm>
      </Card>
    )
  }

  render() {
    const {classes} = this.props
    return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item container sm={12} md={6} >
          {this.renderContactInfo()}
        </Grid>
        <Grid item container sm={12} md={6} >
          {this.renderContactForm()}
        </Grid>
      </Grid>
      <CustomAlert 
        open={this.state.isAlertOpen}
        onClose={this.closeAlert}
        title='Message sent successfully'
        message='Your feedback is valuable to us. Thank you!'
      />
    </div>
    );
  }  
};

const mapDispatchToProps = (dispatch) => ({
  toggleLoadingOn: () => {
    dispatch(actions.toggleLoadingOn())
  },
  toggleLoadingOff: () => {
    dispatch(actions.toggleLoadingOff())
  },
  toggleLoadingOffTHUNK: () => {
    dispatch(actions.toggleLoadingOffTHUNK())
  }
})

const mapStateToProps = (state) => ({
  isLOADING: state.login.isLOADING,
  MEmployeeID: state.login.MEmployeeID
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NeedHelp));