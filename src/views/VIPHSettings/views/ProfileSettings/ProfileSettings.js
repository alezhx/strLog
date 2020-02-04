import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { 
  Grid, 
  Dialog, 
} from '@material-ui/core';
import { AccountProfile, AccountDetails, AvatarCropper } from './components';
import { API_EmployeeSetting } from 'utils/API';
import {UtilsTool, HttpTool} from 'utils';
import { connect } from 'react-redux';
import { actions } from 'redux/actions';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(3),
  },
});

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isCropImage: true,
      selectedImage: null,
      fileExt: null,
      // imagePreview: null,
      settings: {
        EmployeeFirstName: null, 
        EmployeeLastName: null,
        EmployeeMidName: null,
        EmployeeGender: null,
        EmployeeType: null,
        Motto: null,
        Profile: null,
        PhotoLink: null,
        preferredlanguage: null,
        specialty: null,
        Email: null,
      },
      isFormError: {
        EmployeeFirstName: false, 
        EmployeeLastName: false,
        EmployeeGender: false,
        EmployeeType: false,
        preferredlanguage: false,
        specialty: false,
      }
    }
  }

  componentDidMount() {
    this.fetchEmployeeSettings()
    
    // this.refreshUserSettings()

    this.props.setSaveButtonAction(this.saveProfileSettings);
  }
  
  checkFormErrors = () => {
    // const {        
    //   EmployeeFirstName,
    //   EmployeeLastName,
    //   EmployeeGender,
    //   EmployeeType,
    //   preferredlanguage,
    //   specialty
    // } = this.state.settings

    const validatorFields = [      
      'EmployeeFirstName',
      'EmployeeLastName',
      'EmployeeGender',
      'EmployeeType',
      'preferredlanguage',
      'specialty'
    ]

    return validatorFields.forEach(field => {
      if (!this.state.settings[field].length) {
        this.setState({
          isFormError: {
            ...this.state.isFormError, 
            [field]: true
          }
        }, () => this.toggleSaveButton())
      } else {
        this.setState({
          isFormError: {
            ...this.state.isFormError, 
            [field]: false
          }
        }, () => this.toggleSaveButton())
      }
    })
  }

  toggleSaveButton = () => {
    const {disableSaveButton, enableSaveButton} = this.props
    let errorCheck = Object.keys(this.state.isFormError).some(isTrue => this.state.isFormError[isTrue])
    if (errorCheck) {
      return disableSaveButton()
    } else {
      return enableSaveButton()
    }
  }

  refreshUserSettings = () => {
    const { MEmployeeID, getUserTHUNK } = this.props
    let param = {
      MEmployeeID
    };
    getUserTHUNK(param)
  }


  fetchEmployeeSettings = () => {
    const {toggleLoadingOn, MEmployeeID, toggleLoadingOffTHUNK} = this.props
    let param = {
      MEmployeeID
    };

    toggleLoadingOn();
    HttpTool.post(API_EmployeeSetting.getEmployeeSettingInfo, param, response => {
      // response.status === 200 ?
      if (response.status === 200) {
        const { 
          EmployeeFirstName, 
          EmployeeLastName, 
          EmployeeMidName,
          EmployeeGender,
          EmployeeType,
          Motto,
          Profile,
          PhotoLink,
          preferredlanguage,
          specialty,
          Email,
        } = response.data
  
        // this.setState({
        //   settings: {
        //     photoLink: PhotoLink,
        //     motto: Motto,
        //     firstName: EmployeeFirstName,
        //     midName: EmployeeMidName,
        //     lastName: EmployeeLastName,
        //     gender: EmployeeGender,
        //     title: EmployeeType,
        //     languages: preferredlanguage,
        //     specialty: specialty,
        //   }
        // },);
        this.setState({
          settings: {
            EmployeeFirstName: EmployeeFirstName.trim(), 
            EmployeeLastName: EmployeeLastName.trim(),
            EmployeeMidName: EmployeeMidName.trim(),
            EmployeeGender,
            EmployeeType,
            Motto,
            Profile,
            PhotoLink,
            preferredlanguage,
            specialty,
            Email,
          }
        },);
      };
      toggleLoadingOffTHUNK()

    }, error => {
      toggleLoadingOffTHUNK()
    });
    // toggleLoadingOffTHUNK();
  }

  handleSpecialtyChange = (index) => (event) => {
    const specialtyArr = this.state.settings.specialty.split(',');
    specialtyArr[index] = event.target.value;

    this.setState({
      settings: {
        ...this.state.settings,
        // specialty: (specialtyArr[index] = event.target.value).join(',')
        specialty: specialtyArr.join(',')
      }
    })
  }


  handleFormChange = (event) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [event.target.name]: event.target.value.constructor === Array 
          ? event.target.value.join(',') 
          : event.target.value
      }
    })
  }

  saveProfileSettings = () => {
    const {toggleLoadingOn, MEmployeeID, toggleLoadingOffTHUNK} = this.props
    const {
      EmployeeFirstName, 
      EmployeeLastName, 
      EmployeeMidName,
      EmployeeGender,
      EmployeeType,
      Motto,
      Profile,
      // PhotoLink,
      preferredlanguage,
      specialty,
      // Email,
    } = this.state.settings

    const param = {
      MEmployeeID,
      EmployeeFirstName,
      EmployeeMidName,
      EmployeeLastName,
      EmployeeType,
      Email: 'mdlandtest@mdland.com',
      Language: preferredlanguage,
      Specialty: specialty,
      Gender: EmployeeGender,
      Motto,
      Profile
    };

    toggleLoadingOn();
    HttpTool.post(API_EmployeeSetting.updateEmployeeInfo, param, (response)=>{
      if (response.status === 200) {
        this.refreshUserSettings()
      }
    }, (error) => {
      toggleLoadingOffTHUNK()
    });
    // toggleLoadingOffTHUNK();
  }  

  openDialog = () => {
    this.setState({isDialogOpen:true})
  }

  closeDialog = () => {
    // this.setState({isCropImage:true}, 
    //   ()=>this.setState({isDialogOpen:false, selectedImage:null}));
    this.setState({isDialogOpen: false, selectedImage: null});
  }

  onImageChange = (event, cb) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          selectedImage: e.target.result,
          fileExt: UtilsTool.getFileExtBase64(e.target.result),
          // isCropImage: true,
        }, () => cb && cb());
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadBase64Handler = (data) => {
    let base64data = data.split("base64,")[1]

    let param = {
      File: base64data,
      FileExt: this.state.fileExt,
      MEmployeeID: this.props.MEmployeeID,
    }
    

    HttpTool.post(API_EmployeeSetting.uploadEmployeePhoto, param, response => {
      if (response.status === 200) {
        let nextParam = {
          MEmployeeID: this.props.MEmployeeID
        }
        this.props.getUserTHUNK(nextParam)
      }
    }, error => {
      this.closeDialog()
    }, () => {
      this.closeDialog()
    })
  }


  removeToDefaultPicture = () => {
    const user = this.returnLoggedInUser()
    let avatarSrc
    user.gender === 'male' ? avatarSrc = '/assets/maleAvatar.png' : avatarSrc = '/assets/femaleAvatar.png'
    // let base64 = this.convertImageToBase64(testAvatar)
    
    this.setState({selectedImage:avatarSrc})
  }

  convertImageToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      // const base64String = (reader.result).match(/.+;base64,(.+)/)[1];
      const base64String = event.target.result
      return base64String;
    };
    // return base64String
  }

  onWebcamCapture = (image, cb) => {
    this.setState({selectedImage:image}, () => cb && cb())
  }

  renderAvatarDialog = () => {
    return (
      <Dialog 
        onClose={()=>{
          this.closeDialog()
        }}
        open={this.state.isDialogOpen} 
      >
        <AvatarCropper 
          image={this.state.selectedImage}
          onImageChange={this.onImageChange}
          onWebcamCapture={this.onWebcamCapture}
          closeDialog={this.closeDialog}
          uploadToServer={this.uploadBase64Handler}
        />
      </Dialog>
    )
  }

  returnLoggedInUser = () => {
    const {
      EmployeeLastName,
      EmployeeFirstName,
      EmployeeMidName,
      EmployeeGender,
      EmployeeType,
      PhotoLink,
      specialty,
      // Motto
    } = this.props.UserSettings

    const user = {
      fullName: UtilsTool.formatEnglishName(EmployeeLastName, EmployeeFirstName, EmployeeMidName, EmployeeType, 1),
      gender: EmployeeGender,
      specialty: specialty,
      photoLink: PhotoLink,
      // motto: Motto
    }

    return user
  }


  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
          justify='center'
        >
          <Grid
            item
            lg={4}
            md={4}
            xl={4}
            xs={12}
          >
            <AccountProfile 
              user={this.returnLoggedInUser()}
              profileDescription={this.state.settings.Profile}
              openAvatarDialog={this.openDialog}
              handleFormChange={this.handleFormChange}
              handleNewImage={this.onImageChange}
              // profileDescription={this.state.settings.motto}
              // settings={this.props.UserSettings}
            />
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            xl={8}
            xs={12}
          >
            <AccountDetails 
              // settings={this.props.UserSettings} 
              settings={this.state.settings}
              handleFormChange={this.handleFormChange}
              enableSaveButton={this.props.enableSaveButton}
              disableSaveButton={this.props.disableSaveButton}
            />
          </Grid>
        </Grid>
      {this.renderAvatarDialog()}
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  initializeAction: data => {
    dispatch(actions.initializeUserData(data))
  },
  getUserTHUNK: param => {
    dispatch(actions.getUserTHUNK(param))
  },
  setSaveButtonAction: (saveFunction) => {
    dispatch(actions.setSaveButtonAction(saveFunction))
  },
  toggleLoadingOn: () => {
    dispatch(actions.toggleLoadingOn())
  },
  toggleLoadingOffTHUNK: () => {
    dispatch(actions.toggleLoadingOffTHUNK())
  },
  updateUserSettings: data => {
    dispatch(actions.updateUserSettings(data))
  },
  disableSaveButton: () => {
    dispatch(actions.disableSaveButton())
  },
  enableSaveButton: () => {
    dispatch(actions.enableSaveButton())
  }
})

const mapStateToProps = (state) => ({
  loginStore: state.login,
  UserSettings: state.login.UserSettings,
  MEmployeeID: state.login.MEmployeeID
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProfileSettings));
