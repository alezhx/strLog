import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import UtilsTool from 'utils/UtilsTool'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const DaysEnum = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
}

const useStyles = makeStyles((theme) => ({
  noDataContainer: {
    width:'100%', 
    paddingTop:48, 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    fontStyle: 'italic',
    color: theme.palette.darkGray
  },
}))

const ViewScheduleTable = (props) => {
  const classes = useStyles();
  const { scheduleData } = props

  if (scheduleData.length) { 
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="left">Start Time</TableCell>
            <TableCell align="left">End Time</TableCell>
            <TableCell align="left">Break Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduleData.map(row => (
            <TableRow key={row.WeekDay}>
              <TableCell component="th" scope="row">
                {DaysEnum[row.WeekDay]}
              </TableCell>
              <TableCell align="left">{UtilsTool.timeConvert(row.StartTime)}</TableCell>
              <TableCell align="left">{UtilsTool.timeConvert(row.EndTime)}</TableCell>
              {<TableCell align="left">{row.BreaksBeginTime && row.BreakEndTime ?
                UtilsTool.timeConvert(row.BreaksBeginTime) + ' - ' + UtilsTool.timeConvert(row.BreakEndTime)         
                : null}
              </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  } else {
    return (
      <div>
        <Table size="small">
        <TableHead style={{width:'100%'}}>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="left">Start Time</TableCell>
            <TableCell align="left">End Time</TableCell>
            <TableCell align="left">Break Time</TableCell>
          </TableRow>
        </TableHead>
        </Table>
        <div className={classes.noDataContainer}>
          <Typography>
            <i>No schedule found. Click edit availability to add a schedule.</i>
          </Typography>
        </div>
      </div>
    )
  }
}
export default ViewScheduleTable