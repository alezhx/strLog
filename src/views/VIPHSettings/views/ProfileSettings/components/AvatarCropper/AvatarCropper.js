import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
// import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import {
  Grid,
  IconButton,
  Slider,
  Tooltip,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button
} from '@material-ui/core'
import {
  RotateRight,
  RotateLeft,
  AddAPhoto,
  AddPhotoAlternate,
  Camera
} from '@material-ui/icons'
import { CircleAvatar, CustomButton } from 'basecomponents'
import palette from 'style/palette';
import Webcam from 'react-webcam';

const ValueLabelComponent = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={(value*100+'').substr(0,3) + ' %'}>
      {children}
    </Tooltip>
  );
}

const styles = theme => ({
  root: {
    width: 500
  },
  previewContent: {
    display:'flex', 
    justifyContent:'center',
    padding: theme.spacing(4)
  },
  rotateButton: {
    margin: theme.spacing(1)
  },
  rotateContainer: {
    paddingTop: theme.spacing(1),
  },
  zoomContainer: {
    paddingBottom: theme.spacing(2)
  },
  input: {
    display:'none'
  },
  optionsDialogContent: {
    display:'flex', justifyContent:'center'
  },
  optionButton: {
    height: 240,
    width: 192,
    borderRadius:8,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    border: `3px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(2)
  },
  optionButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  optionIcon: {
    position: 'relative',
    fontSize: '6.8em',
    top: -16
  },
  optionButtonText: {
    fontWeight:800, 
    position:'absolute',
    bottom:24,
    fontSize: 18
  },
  webcamDialogContent: {
    display:'flex', 
    flexDirection: 'column', 
    alignItems:'center', 
    justifyContent:'center'
  },
  cameraIrisButton: {
    color:'white', margin:8
  }
})

const screens = {
  home: 0,
  webcam: 1,
  cropper: 2,
  preview: 3,
}

class AvatarCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: null,
      // image: this.props.image,
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 150,
      preview: null,
      width: 300,
      height: 300,
      
      currentScreen: screens.home
    }
    this.webcamRef = React.createRef(null);
  }

  // componentDidMount() {
  //   this.setState({ image: this.props.image})
  // }

  navigate = (screen) => {
    this.setState({currentScreen:screen})
  }

  goBackToCrop = () => {
    this.setState({preview:null})
  }

  showPreview = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      }
    }, () => this.navigate(screens.preview))
  }

  handleScale = (event, newValue) => {
    // const scale = parseFloat(e.target.value)
    const scale = newValue
    this.setState({ scale })
  }

  rotateLeft = e => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90,
    })
  }

  rotateRight = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90,
    })
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] })
  }

  renderCropper = () => {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <DialogTitle>
          Update Avatar
        </DialogTitle>
        <Divider variant='middle'/>

        <DialogContent>
          <Grid container justify='center'>

            <Grid item container justify='center' xs={12}>
              <AvatarEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                width={this.state.width}
                height={this.state.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.width / (100 / this.state.borderRadius)}
                // onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                // onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                // onImageReady={this.logCallback.bind(this, 'onImageReady')}
                // image={this.state.image}
                image={this.props.image}
                className="editor-canvas"
              />
            </Grid>

            <Grid item container justify="center" xs={12} className={classes.rotateContainer}>
              <IconButton
                size='small'
                className={classes.rotateButton}
                style={{backgroundColor: palette.primary.main}} //Keep inline style
                color='secondary'
                onClick={this.rotateLeft}
              >
                <RotateLeft />
              </IconButton>
              <IconButton
                size='small'
                className={classes.rotateButton}
                style={{backgroundColor: palette.primary.main}} //Keep inline style
                color='secondary'
                onClick={this.rotateRight}
              >
                <RotateRight />
              </IconButton>
            </Grid>

            <Grid item container xs={8} className={classes.zoomContainer}>
              <Typography>
                Zoom level
              </Typography>
              <Slider
                ValueLabelComponent={ValueLabelComponent} 
                valueLabelDisplay='auto'
                name="scale"
                type="range"
                min={0.5}
                max={2}
                step={0.01}
                defaultValue={1}
                onChange={this.handleScale}
              />
            </Grid>
            
          </Grid>
        </DialogContent>

        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            color="primary"
            variant={'outlined'}
            onClick={()=>this.navigate(screens.home)}
          >
            Back
          </CustomButton>
          <CustomButton 
            color="primary"
            onClick={this.showPreview}
          >
            Confirm
          </CustomButton>
        </DialogActions>
      </div>
    )
  }

  renderSavePreview = () => {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <DialogTitle>
          Preview
        </DialogTitle>
        <Divider variant='middle'/>
        <DialogContent className={classes.previewContent}>
          <CircleAvatar source={this.state.preview.img} diameter={300} />
        </DialogContent>
        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            variant={'outlined'}
            onClick={() => this.navigate(screens.cropper)}
          >
            Back
          </CustomButton>
          <CustomButton
            onClick={()=>this.props.uploadToServer(this.state.preview.img)}
          >
            Save Avatar
          </CustomButton>
        </DialogActions>
      </div>
    )
  }

  renderOptionsScreen = () => {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <DialogTitle>
          Update Avatar
        </DialogTitle>
        <Divider variant='middle'/>
        <DialogContent className={classes.optionsDialogContent}>
          <Button
            component='div'
            className={classes.optionButton}
            classes={{
              label: classes.optionButtonLabel
            }}
            onClick={() => this.navigate(screens.webcam)}
            // style={{color: palette.primary.main}}
            style={{backgroundColor:palette.primary.main, color:'white'}}
          >
            <AddAPhoto className={classes.optionIcon}/>
            <Typography className={classes.optionButtonText}>
              Use Camera
            </Typography>
          </Button>

          <input
            className={classes.input}
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={file=>this.props.onImageChange(file, this.navigate(screens.cropper))}
          />
          <label htmlFor="upload-photo">
            <Button 
              component='div'
              className={classes.optionButton}
              classes={{
                label: classes.optionButtonLabel
              }}
              style={{color: palette.primary.main}}
              // style={{backgroundColor:palette.primary.main, color:'white'}}
            >
              <AddPhotoAlternate className={classes.optionIcon}/>
              <Typography className={classes.optionButtonText}>
                Upload Photo
              </Typography>
            </Button>
          </label>  
        </DialogContent>
        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            variant={'outlined'}
            onClick={this.props.closeDialog}
          >
            Cancel
          </CustomButton>
        </DialogActions>
      </div>
    )
  }

  renderWebcamScreen = () => {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <DialogTitle>
          Take a Photo
        </DialogTitle>
        <Divider variant='middle'/>
        <DialogContent className={classes.webcamDialogContent}>
          <Webcam
            audio={false}
            // height={'50%'}
            ref={this.webcamRef}
            screenshotFormat="image/jpeg"
            width={452}
          />
          <IconButton
            className={classes.cameraIrisButton}
            style={{backgroundColor: palette.primary.main}} //Keep inline style
            onClick={()=>{
              let captureImage = this.webcamRef.current.getScreenshot()
              this.props.onWebcamCapture(captureImage, this.navigate(screens.cropper))
            }}
          >
           <Camera style={{fontSize:'1.6em'}}/> 
          </IconButton>
        </DialogContent>
        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            variant={'outlined'}
            onClick={() => this.navigate(screens.home)}
          >
            Back
          </CustomButton>
        </DialogActions>
      </div>
    )
  }


  render() {
    // return !this.state.preview ? this.renderCropper() : this.renderSavePreview()
      switch(this.state.currentScreen) {
        case screens.home: return this.renderOptionsScreen();
        case screens.webcam: return this.renderWebcamScreen();
        case screens.cropper: return this.renderCropper();
        case screens.preview: return this.renderSavePreview();
        default: return this.renderOptionsScreen()
      }
  }

};

export default withStyles(styles)(AvatarCropper)