import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import MultipleSelect from './multiselect'
import {allTitles, allLanguages, allSpecialties, allGenders} from './allSelectOptions'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  inputLabelContainer: {
    display:'flex', 
    alignItems:'center', 
    justifyContent:'flex-end', 
    marginRight:16
  },
  inputLabel: {
    color:'black'
  },
  submit: {
    display:'none'
  },
  marginTop: {
    marginTop: theme.spacing(1)
  },
  smallField: {
    width: '50%'
  },
  mediumField: {
    width: '75%'
  }
}));

const AccountDetails = props => {
  const { 
    settings, 
    handleFormChange, 
    enableSaveButton, 
    disableSaveButton 
  } = props;
  const classes = useStyles();

  const [formError, setFormError] = useState(false);
  useEffect(() => {
    checkForm();
    if (formError) {
      disableSaveButton();
    } else {
      enableSaveButton();
    }
  });
  
  let formRef = React.createRef()

  const {preferredlanguage, specialty} = settings
  let userSpecialties = specialty ? specialty.split(',') : []
  let userLanguages = preferredlanguage ? preferredlanguage.split(',') : []

  const isMultiSelectValid = () => {
    if (!userSpecialties.length || !userLanguages.length) {
      return false
    } else { 
      return true
    }
  }

  const checkForm = () => {
    formRef.isFormValid().then(result => {
      if (result===true && isMultiSelectValid()===true) {
        setFormError(false)
      } else {
        setFormError(true)
      }
    })
  }

  const validateOnBlur = event => {
    document.getElementById("profileForm").dispatchEvent(new Event("submit"))
  };

  return (
    <Card
      className={classes.root}
      raised={true}
    >
      <CardHeader
        subheader="Edit your profile seen by users in VIPHealth"
        title="Profile"
      />
      <CardContent> 
      <ValidatorForm
        ref={r=>formRef=r}
        id='profileForm'
        onSubmit={()=>null}
        // onSubmit={e => checkForm()}
        // onError={errors => setFormError(true)}
      >        
        <Grid container spacing={2} direction='column'>
          <Grid item container>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                First name
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextValidator
                name="EmployeeFirstName"
                fullWidth
                onBlur={validateOnBlur}
                onChange={handleFormChange}
                placeholder='Type here...'
                margin="dense"
                variant="outlined"
                value={settings.EmployeeFirstName ? settings.EmployeeFirstName : ''}
                validators={['required', ]}
                errorMessages={['This field is required.']}
              />            
            </Grid>
          </Grid>
          <Grid item container>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                Middle name
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                onBlur={validateOnBlur}
                placeholder='Type here...'
                margin="dense"
                name="EmployeeMidName"
                onChange={handleFormChange}
                value={settings.EmployeeMidName ? settings.EmployeeMidName : ''}
                variant="outlined"
              />            
            </Grid>
          </Grid>
          <Grid item container>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                Last name
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextValidator
                fullWidth
                placeholder='Type here...'
                margin="dense"
                name="EmployeeLastName"
                onBlur={validateOnBlur}
                onChange={handleFormChange}
                value={settings.EmployeeLastName ? settings.EmployeeLastName : ''}
                variant="outlined"
                validators={['required']}
                errorMessages={['This field is required.']}
              />            
            </Grid>
          </Grid>

          <Grid item container className={classes.marginTop}>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                Gender
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.smallField}
                fullWidth
                select
                label='Select'
                name='EmployeeGender'
                onChange={handleFormChange}
                value={settings.EmployeeGender ? settings.EmployeeGender : ""}
                variant="outlined"
              >
                {allGenders.map((option, index)=> (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>            
            </Grid>
          </Grid>

          <Grid item container className={classes.marginTop}>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                Title
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.mediumField}
                fullWidth
                select
                label='Select'
                name='EmployeeType'
                onChange={handleFormChange}
                value={settings.EmployeeType
                  ? settings.EmployeeType.trim()
                  : ""
                }
                variant="outlined"
              >
                {allTitles.map((option, index)=> (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>            
            </Grid>
          </Grid>


          <Grid item container>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                Languages
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <MultipleSelect 
                // onBlur={validateOnBlur}
                onBlur={validateOnBlur}
                handleFormChange={handleFormChange}
                options={userLanguages}
                availableOptions={allLanguages}
                placeholder='Select spoken languages...'
                inputName={'preferredlanguage'}
                error={!userLanguages.length}
              />
            </Grid>
          </Grid>

          <Grid item container>
            <Grid className={classes.inputLabelContainer} item container xs={2}>
              <InputLabel className={classes.inputLabel}>
                Specialty
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <MultipleSelect 
                onBlur={validateOnBlur}
                handleFormChange={handleFormChange}
                options={userSpecialties}
                availableOptions={allSpecialties}
                placeholder='Select your specialty...'
                inputName={'specialty'}
                error={!userSpecialties.length}
              />
            </Grid>
          </Grid>
            {/* <Grid item container>
                <Grid className={classes.inputLabelContainer} item container xs={2}>
                <InputLabel className={classes.inputLabel}>
                  Email address
                </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  // label="First name"
                  placeholder='Type here...'
                  margin="dense"
                  name="firstName"
                  onChange={handleFormChange}
                  required
                  // value={values.email}
                  variant="outlined"
                />            
              </Grid>
            </Grid> */}
        </Grid>
        <button type='submit' className={classes.submit}/>
      </ValidatorForm>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;