
import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MaleAvatar from 'assets/maleAvatar.png'
import FemaleAvatar from 'assets/femaleAvatar.png'

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: props => ({
    width: props.diameter,
  }),
  circleContainer: props => ({
    display:'flex',
    border:'2px solid',
    borderColor: theme.palette.primary.main, 
    width: props.diameter, 
    height: props.diameter, 
    borderRadius:'50%',
    overflow:'hidden',
    alignItems: 'center', 
    justifyContent: 'center'
  })
}))

const CircleAvatar = (props) => {
  const {user, source} = props
  const classes = useStyles(props);

  let avatarSrc
  user && user.gender === 'M' ? avatarSrc = MaleAvatar : avatarSrc = FemaleAvatar

  const avatarComponent = () => {
    return (
      <div className={classes.root}>
        <div className={classes.circleContainer}>
          <img alt='avatar' src={source?source:avatarSrc} className={classes.avatar}/>
        </div>
      </div>
    )
  }

  return (
    <Avatar component={avatarComponent} />
  )
}

export default CircleAvatar