import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  CardHeader,
} from '@material-ui/core';
import {GetApp, Print} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    width: 300,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    cursor: 'zoom-in',
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.red,
  },
  dlButton: {
    backgroundColor: theme.palette.primary.main,
    minWidth: 0,
    padding: '5px 10px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonUnderlay: {
    backgroundColor: theme.palette.green, 
    borderRadius: 4,
    margin: 5,
  },
  buttonsContainer: {
    display:'flex',
    padding:theme.spacing(1),
  },
  subtitle: {
    fontStyle: 'italic',
  },
  description: {
    paddingTop: theme.spacing(2)
  }
}));

const MediaCard = props => {
  const { media, openModal } = props;

  const classes = useStyles();

  const printImage = (url) => {
    let win = window.open('');
    win.document.write('<img src="' + url + '" onload="window.print();window.close()" style="width:8.5in;max-height:11in;"/>');
    win.focus();
  }

  const renderCardActions = () => 
    <div className={classes.buttonsContainer}>
      <div className={classes.buttonUnderlay}>
        <a href={media.imageUrl} download>
        <Button className={classes.dlButton}>
          <GetApp color='secondary'/>
        </Button>
        </a>
      </div>
      <div className={classes.buttonUnderlay}>
        <Button 
          className={classes.dlButton} 
          onClick={()=>printImage(media.imageUrl)}
        >
          <Print color={'secondary'}/>
        </Button>
      </div>
    </div>

  return (
    <Card raised>
      <CardHeader
        action={renderCardActions()}
        title={media.title}
        subheader={media.language}
        subheaderTypographyProps={{className: classes.subtitle}}
      />
      <Divider variant='middle'/>
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="mediaresource"
            className={classes.image}
            src={media.imageUrl}
            onClick={() => openModal && openModal(media.imageUrl)}
          />
        </div>
        <Typography
          className={classes.description}
          align="center"
          variant="body2"
        >
          {media.description}&nbsp;
          <i>{media.suggestion}</i>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MediaCard;