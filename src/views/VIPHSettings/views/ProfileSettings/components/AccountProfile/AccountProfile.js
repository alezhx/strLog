import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  TextField,
  InputLabel
} from '@material-ui/core';
import SideBarProfile from 'layouts/MainLayout/components/SideBarComponents/SideBarProfile'
import { CustomButton, CustomSvgIcon } from 'basecomponents';

const UploadIcon = props => <CustomSvgIcon {...props} path="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/>

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  cardContent: {
    display:'flex',
    flexDirection:'column'
  },
  buttonContainer: {
    display:'flex', 
    justifyContent:'center'
  },
  input: {
    display:'none'
  },
  inputLabel: {
    color:'black', 
    paddingTop:16, 
    fontSize:'1.125em',
    paddingBottom:8
  }
}));

const AccountProfile = props => {
  const { 
    user, 
    profileDescription, 
    handleFormChange, 
    // handleNewImage, 
    openAvatarDialog 
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardContent className={classes.cardContent}>
        <div className={classes.buttonContainer}>
          <CustomButton 
            variant="contained" 
            // component="span" 
            icon={UploadIcon}
            onClick={openAvatarDialog}
          >
            Update Avatar
          </CustomButton>
          {/* <input
            className={classes.input}
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={file=>handleNewImage(file, openAvatarDialog)}
          />
          <label htmlFor="upload-photo">
            <CustomButton 
              variant="contained" 
              component="span" 
              className={classes.button}
              icon={UploadIcon}
            >
              Update Avatar
            </CustomButton>
          </label>   */}
        </div>
        
        <SideBarProfile diameter={120} user={user}/>
        <InputLabel className={classes.inputLabel}>
          Profile Description:
        </InputLabel>
        <TextField
          name="Profile"
          onChange={handleFormChange}
          placeholder="Enter description here..."
          multiline
          className={classes.textField}
          variant="outlined"
          value={profileDescription ? profileDescription : ''}
          InputProps={{style:{minHeight:80}}}
        />
      </CardContent>
    </Card>
  );
};

export default AccountProfile;
