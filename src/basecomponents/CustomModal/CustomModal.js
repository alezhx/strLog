
import React from 'react';
import { Modal, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CustomSvgIcon } from 'basecomponents';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  imageContainer: {
    position:'relative',
    outline: 'none'
  },
  image: {       
    // minHeight: 300,
    maxHeight: '80vh',
    maxWidth: '80vw',
    objectFit: 'contain',
    border: `4px solid ${theme.palette.primary.main}`,
  },
  button: {
    top:5, right:5,
    position:'absolute',
    display:'flex',
    alignItems:'center',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  icon: {
    width:30, height:30,
    color: theme.palette.cardinal
  }
}))

const CloseIcon = props => <CustomSvgIcon {...props} path="M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z" />

const CustomModal = (props) => {
  const {onClose, imageSrc, imageStyle} = props;
  const classes = useStyles(props);

  return (
    <Modal
      className={classes.root}
      open={Boolean(imageSrc)}
      onClose={onClose}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      disableRestoreFocus={true}
    >
      <div className={classes.imageContainer}>
        <img
          alt="modalImage" 
          src={imageSrc}
          style={imageStyle && imageStyle}
          className={classes.image}
        />
        <IconButton
          className={classes.button}
          size="small"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon}/>
        </IconButton>
      </div>
    </Modal>
  )
}

export default CustomModal