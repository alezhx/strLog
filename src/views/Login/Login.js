import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import {
  Grid,
  Link,
  Typography,
  Card,
  InputAdornment,
  Tooltip
} from '@material-ui/core';
import {
  PersonOutline,
  LockOpen,
  Info
} from '@material-ui/icons'
import MDLogo from 'assets/mdlogo.png'
import { API_Login, API_EmployeeSetting } from 'utils/API'
import {connect} from 'react-redux'
import {actions} from 'redux/actions'
import {
  // AESTool,
  HttpTool
} from 'utils'
import {
  CustomButton,
  CustomSvgIcon,
  CustomAlert
} from 'basecomponents';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ClinicIdTooltip from 'assets/clinicIdTooltip.png'
import MD5 from 'crypto-js/md5'

const ClinicGroupIcon = props => <CustomSvgIcon {...props} path="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z" />

const styles = theme => ({
  rootCard: {
    backgroundColor: theme.palette.white,
    height: '100%',
    width: '40%',
    maxWidth: 600,
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    padding: theme.spacing(6)
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  mdlogo: {
    maxWidth: '100%',
    height: 'auto'
  },
  tooltipContainer: {
    display:'flex',
    justifyContent:'flex-end',
    height:0,
  },
  infoIcon: {
    color:'blue',
    position:'relative',
    bottom:-8,
    right:-20
  },
  clinicIdRow: {
    display:'flex',
    marginTop:16,
    alignItems:'center'
  }
});

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      clinicId: '',

      alertTitle: '',
      alertMessage: ''
    }
  }

  componentDidMount() {
    this.handleLoginFromiClinic()
  }

  handleLoginFromiClinic = () => {
    let loginPromise = new Promise((res,rej)=>{
      return this.loginFromiClinic(res)
    })
    let getUserPromise = (nextParam) => new Promise((res,rej)=>{
      return this.getUser(nextParam, res)
    })
    loginPromise.then(nextParam => {
      return getUserPromise(nextParam)
    }).then(userSettings => {
      return this.props.updateUserSettings(userSettings)
    }).then(()=>this.props.history.push('/dashboard'))
  }

  loginFromiClinic = (promiseCb) => {
    const {pathname} = this.props.location;
    const { toggleLoadingOn, toggleLoadingOffTHUNK } = this.props

    let encryptedData = pathname.split('login/')[1]

    toggleLoadingOn();
    if (encryptedData) {
      let param = {
        EncryptData: encryptedData
      }

      HttpTool.post(API_Login.loginEncrypt, param, (response) => {
        if (response.data.ClinicID) {
          this.fetchToken(response.data , () => {
            this.props.verifyAuthSuccess(response.data);
            let nextParam = {
              MEmployeeID: response.data.MEmployeeID
            };
            // this.props.getUserTHUNK(nextParam);
            // this.props.history.push('/dashboard');
            promiseCb && promiseCb(nextParam)
          });
        }
        toggleLoadingOffTHUNK()
      }, error => {
        toggleLoadingOffTHUNK()
      })
    } else {
      toggleLoadingOffTHUNK()
    }
  }

  openAlert = (title,message) => {
    // Review this code
    this.setState({
      isAlertOpen: true,
      alertTitle: title,
      alertMessage: message,
    }, this.setState({isAlertOpen:false}))
  }

  // handleChange = input => e => {
  //   this.setState({[input]:e.target.value})
  // };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  getUser = (param, promiseCb) => {
    HttpTool.post(API_EmployeeSetting.getEmployeeSettingInfo, param, response => {
      if (response.status === 200) {
        promiseCb && promiseCb(response.data) //userSettings
      } else {
        this.openAlert('An error occured', 'We could not verify your credentials at this time. Please try again.');
      }
    }, err => {
        this.openAlert('An error occured', 'We could not verify your credentials at this time. Please try again.');
    })
  }

  handleLogin = (event) => {
    let loginPromise = new Promise((res,rej)=>{
      return this.login(event, res)
    })
    let getUserPromise = (nextParam) => new Promise((res,rej)=>{
      return this.getUser(nextParam, res)
    })

    loginPromise.then(nextParam => {
      return getUserPromise(nextParam)
    }).then(userSettings => {
      return this.props.updateUserSettings(userSettings)
    }).then(() => this.props.history.push('/dashboard'))
  }

  login = (event, promiseCb) => {
    event.preventDefault()
    const { toggleLoadingOn, toggleLoadingOffTHUNK } = this.props

    let cryptoPassword = this.MD5Encrypt(this.state.userId.toLowerCase() + this.state.password).toUpperCase()

    let param = {
      ClinicID: this.state.clinicId,
      UserName: this.state.userId,
      Password: cryptoPassword
      // Password: this.state.password
    }
    // Use thunk to automate login actions
    // this.props.autoLoginTHUNK(param)

    toggleLoadingOn()
    HttpTool.post(API_Login.login, param, response => {
      // response.status === 200 ?
      if (response.data.ClinicID) {
        this.fetchToken(response.data , ()=>{
          this.props.verifyAuthSuccess(response.data);
          let nextParam = {
            MEmployeeID: response.data.MEmployeeID
          };
          promiseCb && promiseCb(nextParam)
          // this.props.getUserTHUNK(nextParam, this.props.history.push('/dashboard'));
        });
      }
      else {
        this.openAlert('Invalid credentials', 'The credentials you entered are incorrect. Please try again.')
      }
      toggleLoadingOffTHUNK();
    }, error => {
      toggleLoadingOffTHUNK();
      this.openAlert('An error occured', 'We could not verify your credentials at this time. Please try again.')
    })
  }

  MD5Encrypt(text) {
    return MD5(text).toString()
  }

  fetchToken = (data, cb) => {
    // let param = JSON.stringify({
    //   ClinicID: data.ClinicID,
    //   MEmployeeID: data.MEmployeeID,
    //   UserName: this.state.userId,
    //   Password: this.state.password,
    // })

    // fetch('/api/auth',{
    //   method: 'POST',
    //   body: param,
    //   headers: {"Content-Type": "application/json"}
    // })
    // .then((response) => {
    //   return response.json()
    // }).then((body) => {
    //   let encryptedToken = AESTool.encrypt(body.token)
    //   localStorage.setItem('jwtToken', encryptedToken)
    // }).then(() => {
    //   cb && cb()
    // }).catch();


    cb && cb()
  }

  renderTooltipContent = () => {
    return (
      <div style={{padding:5}}>
        <Typography style={{marginBottom:8}}>
          Clinic ID can be found within iClinic
        </Typography>
        <img
          alt='clinicId'
          src={ClinicIdTooltip}
        />
      </div>
    )
  }

  renderFormContent = () => {
    const {classes} = this.props

    return (
      <ValidatorForm
        onSubmit={this.handleLogin}
        // onError={errors => console.log('Login form errors: ', errors)}
      >
        <div className={classes.tooltipContainer}>
          <Tooltip
            title={this.renderTooltipContent()}
            placement='top-start'
          >
            <Info className={classes.infoIcon}/>
          </Tooltip>
        </div>

        <div className={classes.clinicIdRow}>
          <div style={{width:'65%'}}>
            <Typography
              className={classes.title}
              variant="h6"
            >
              Login with iClinic credentials
            </Typography>
          </div>
          <div style={{width:'35%'}}>
            <TextValidator
              name="clinicId"
              autoComplete='on'
              type='tel'
              className={classes.textField}
              fullWidth
              label="Clinic ID"
              onChange={this.handleChange}
              value={this.state.clinicId}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ClinicGroupIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength:5
              }}
              validators={['required']}
              errorMessages={['Clinic ID is required']}
              // errorStyle={{display:'none'}}
            />
          </div>
        </div>

        <TextValidator
          name="userId"
          autoComplete='on'
          className={classes.textField}
          fullWidth
          label="User ID"
          onChange={this.handleChange}
          type="text"
          value={this.state.userId}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonOutline />
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength:64
          }}
          validators={['required']}
          errorMessages={['User ID is required']}
        />
        <TextValidator
          name="password"
          autoComplete='on'
          type='password'
          className={classes.textField}
          fullWidth
          label="Password"
          onChange={this.handleChange}
          value={this.state.password}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockOpen />
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength:64
          }}
          validators={['required']}
          errorMessages={['Password is required']}
        />
        <CustomButton
          fullWidth
          style={{margin:'24px 0px 8px', fontSize: '1.25em', padding:'12px 0'}} // Keep inline styles
          type="submit"
          size="large"
        >
          Login
        </CustomButton>
        <Link
          href="https://login.mdland.com/reset/resetPwd_index.aspx"
          variant="body1"
          rel="noopener"
          target="_blank"
        >
          Forgot your password?
        </Link>
      </ValidatorForm>
    )
  }

  render() {
    const {classes} = this.props
    return (
      <Card className={classes.rootCard}>
        <div className={classes.content}>
          <Grid container alignItems='center' justify='center'>
            <Grid item container justify='center' xs={8}>
              <img
                className={classes.mdlogo}
                alt='mdland'
                src={MDLogo}
                draggable={false}
              />
            </Grid>
          </Grid>
          {this.renderFormContent()}
        </div>
        <CustomAlert
          open={this.state.isAlertOpen}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
        />
      </Card>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  autoLoginTHUNK: param => {
    dispatch(actions.autoLoginTHUNK(param))
  },
  verifyAuthSuccess: data => {
    dispatch(actions.verifyAuthSuccess(data))
  },
  getUserTHUNK: param => {
    dispatch(actions.getUserTHUNK(param))
  },
  toggleLoadingOn: () => {
    dispatch(actions.toggleLoadingOn())
  },
  toggleLoadingOff: () => {
    dispatch(actions.toggleLoadingOff())
  },
  toggleLoadingOffTHUNK: () => {
    dispatch(actions.toggleLoadingOffTHUNK())
  },
  updateUserSettings: (data) => {
    dispatch(actions.updateUserSettings(data))
  },
})

const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Login)));
