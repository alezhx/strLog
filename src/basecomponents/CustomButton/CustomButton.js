
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core'

const useStyles = makeStyles(({shadows,palette}) => ({
  root: {
    borderRadius: 100,
    minHeight: 30,
    padding: props => props.icon ? '0.25em 2.25em' : '0.25em 1em',
    width: props => props.fullWidth && '100%'
  },
  label: {
    textTransform: 'none',
    fontSize: '1em',
    fontWeight: 700,
  },
  contained: {
    minHeight: 30,
    boxShadow: shadows[0],
    '&:active': {
      boxShadow: shadows[0],
    },
  },
  containedPrimary: props => ({
    backgroundColor: props.bgColor ? palette[props.bgColor] : palette.primary.main,
    color: palette.white,
    '&:hover': {
      filter: 'brightness(85%)',
      backgroundColor: palette[props.bgColor],
      '@media (hover: none)': {
        filter: 'brightness(85%)',
        backgroundColor: palette[props.bgColor],
      },
    },
  }),
  outlinedPrimary: {
    borderColor: palette.primary.main,
    borderWidth: 1.5,
    color: palette.primary.main,
    '&:hover': {
      borderColor: palette.primary.main,
      borderWidth: 1.5,
      color: palette.primary.main,
      backgroundColor: 'rgb(5, 167, 227, 0.1)',
    },
  },
}));

const CustomButton = (props) => {
  const styles = useStyles(props)
  const { icon: SvgIcon, children, left, iconProps, fullWidth, bgColor, ...rest} = props

  return (
    <Button 
      classes={styles} 
      color={'primary'} 
      variant={'contained'}
      {...rest}
    >
      {children}
      {SvgIcon && 
        <SvgIcon 
          {...iconProps}
          style={{
            position: 'absolute',
            right: !left && '0.25em',
            left: left && '0.25em'
          }}
        />
      }
    </Button>
  ) 
}

export default CustomButton