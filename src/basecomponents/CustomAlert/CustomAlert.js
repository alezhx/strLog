
import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import { 
  Dialog, 
  Typography, 
  DialogContent, 
  DialogActions, 
  DialogTitle, 
  Divider 
} from '@material-ui/core';
import { CustomButton } from 'basecomponents';

const styles = theme => ({
  dialog: {
    minWidth: 300
  },
  content:{
    padding: theme.spacing(3)
  }, 
  button: {
    fontSize:'1em'
  }
});

class CustomAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.open !== this.props.open) {
      this.setState({open: this.props.open})
    }
  }

  openAlert = () => {
    this.setState({open:true})
  }

  closeAlert = () => {
    this.setState({open:false})
  }

  render() {
    const {classes, title, message, onClose} = this.props

    return (
      <Dialog
        open={this.state.open}
        onClose={onClose ? onClose : this.closeAlert}
      >
        <div className={classes.dialog}>
        <DialogTitle>
          <Typography component='div' variant='h6' color='primary'>
            {title}
          </Typography>
        </DialogTitle>
        <Divider variant='middle'/>
        <DialogContent className={classes.content}>
          <Typography>
            {message}
          </Typography>
        </DialogContent>
        <Divider variant='middle'/>
        <DialogActions>
          <CustomButton
            onClick={onClose ? onClose : this.closeAlert}
            className={classes.button}
          >
            Done
          </CustomButton>
        </DialogActions>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(CustomAlert)