import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { MediaCard } from './components';
import mediaData from './mediaData'
import { CustomModal } from 'basecomponents';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
}));

const MediaResources = () => {
  const classes = useStyles();
  const [image, setImage] = useState(null)

  const openModal = (image) => {
    return setImage(image)
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        {mediaData.map((media, index) => (
          <Grid
            item
            key={index+media.title}
            lg={4}
            md={6}
            xs={12}
          >
            <MediaCard 
              media={media}
              openModal={openModal}
            />
          </Grid>
        ))}
      </Grid>
      <CustomModal 
        imageSrc={image}
        onClose={()=>setImage(null)}
        imageStyle={{maxWidth:'40vw'}}
      />
    </div>
  );
};

export default MediaResources;
