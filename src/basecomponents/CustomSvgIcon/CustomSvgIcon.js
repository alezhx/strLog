import React from 'react';
import SvgIcon from "@material-ui/core/SvgIcon";

const CustomSvgIcon = (props) => {
  const {path, ...rest} = props

  return (
    <SvgIcon {...rest} >
      <path d={path ? path : null} />
    </SvgIcon>
  )
}

export default CustomSvgIcon