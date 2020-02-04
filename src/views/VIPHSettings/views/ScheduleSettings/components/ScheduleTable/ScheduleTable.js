import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { TextField, Typography, CardActions, Paper, MenuItem } from '@material-ui/core'
import {UtilsTool} from 'utils'
import { makeStyles } from '@material-ui/styles';
import AddCircle from '@material-ui/icons/AddCircle'
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { CustomButton } from 'basecomponents';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddCircle {...props} ref={ref} style={{fontSize:'1.5em'}}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Days = [
  {id: 1, value: 'Monday'},
  {id: 2, value: 'Tuesday'},
  {id: 3, value: 'Wednesday'},
  {id: 4, value: 'Thursday'},
  {id: 5, value: 'Friday'},
  {id: 6, value: 'Saturday'},
  {id: 7, value: 'Sunday'},
]


const CheckInterval = (interval) => {
  let allowedTimes
  switch (interval) {
    case 5:
      allowedTimes = ['00','05','10','15','20','25','30','35','40','45','50','55']
      break;
    case 10:
      allowedTimes = ['00','05','10','15','20','25','30','35','40','45','50','55']
      break;
    case 15:
      allowedTimes = ['00', '15', '30', '45']
      break;
    case 20:
      allowedTimes = ['00', '20', '40']
      break;
    case 30:
      allowedTimes = ['00', '30']
      break;
    case 60:
      allowedTimes = ['00']
      break;
    default:
      allowedTimes = []
      break;
  }
  
  return allowedTimes
}

const TimePicker = (props) =>  {
  return (
    <TextField
      id="time"
      type="time"
      margin='dense'
      defaultValue={props.value}
      onChange={e => {
        props.onChange(e.target.value)}}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        style: {fontSize:18}
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
  )
};

const DayPicker = (props) =>  {
  return (
    <TextField
      variant='outlined' 
      select
      margin='dense'
      fullWidth
      value={props.value ? props.value : 0}
      onChange={e => 
        props.onChange(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        style: {fontSize:18}
      }}
    >
      {Days.map((option, index)=> (
        <MenuItem key={option.index+option.value} value={option.id}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  )
};

const useStyles = makeStyles((theme) => ({
  timeText: {
    fontSize: '1.25rem'
  },
  scheduleContainer: {
    display:'flex', 
    flexDirection:'column', 
    width:'100%', 
    backgroundColor:'white', 
    alignItems:'center', 
  },
  cardActions: {
    width:'100%', 
    justifyContent:'flex-end', 
    paddingRight:48
  },
}));

const ScheduleTable = (props) => {
  const classes = useStyles();
  const {
    scheduleData, 
    saveScheduleModalChanges,
    onCancel, 
    deleteScheduleRows
  } = props

  const [state, setState] = React.useState({
    columns: [
      { title: 'Day', field: 'WeekDay', editComponent: DayPicker, cellStyle: {fontSize: '1.15rem'}, render: rowData => <Typography className={classes.timeText}>{rowData.WeekDay && Days[rowData.WeekDay-1].value}</Typography> },
      { title: 'Start Time', field: 'StartTime', editComponent: TimePicker, render: rowData => <Typography className={classes.timeText}>{rowData.StartTime && UtilsTool.timeConvert(rowData.StartTime)}</Typography>},
      { title: 'End Time', field: 'EndTime', editComponent: TimePicker, render: rowData => <Typography className={classes.timeText}>{rowData.EndTime && UtilsTool.timeConvert(rowData.EndTime)}</Typography>},
      { title: 'Break Start', field: 'BreaksBeginTime', editComponent: TimePicker, render: rowData => <Typography className={classes.timeText}>{rowData.BreaksBeginTime && UtilsTool.timeConvert(rowData.BreaksBeginTime)}</Typography>},
      { title: 'Break End', field: 'BreakEndTime', editComponent: TimePicker, render: rowData => <Typography className={classes.timeText}>{rowData.BreakEndTime && UtilsTool.timeConvert(rowData.BreakEndTime)}</Typography>},
    ],
    data: [],
    deletableRows: [],
  });

  const updateTableData = (data) => {
    return setState(prevState => {
      return ({
        ...prevState,
        data: data
      })
    })
  }

  // eslint-disable-next-line
  useEffect(() => updateTableData(scheduleData), [])
  
  const checkData = (newData, oldData) => {
    const requiredKeys = ['StartTime', 'EndTime', 'WeekDay'];
    const optionalKeys = ['BreaksBeginTime', 'BreakEndTime'];

    let hasAllRequired = requiredKeys.every(key => newData.hasOwnProperty(key));
    let hasAllOptional = optionalKeys.every(key => newData.hasOwnProperty(key));

    // let intervalCheck
    // const allowedTimes = CheckInterval(props.scheduleInterval)
    // if (allowedTimes.includes(newData.StartTime.slice(-2))
    //   && allowedTimes.includes(newData.EndTime.slice(-2))
    //   && allowedTimes.includes(newData.BreaksBeginTime.slice(-2))
    //   && allowedTimes.includes(newData.BreakEndTime.slice(-2))
    // ) {
    //   intervalCheck = true
    // } else {
    //   intervalCheck = false
    // }

    let sameWeekdayCheck
    let weekDay
    if (newData.WeekDay) {
      if (oldData && newData.WeekDay === oldData.WeekDay) {
        sameWeekdayCheck = false
        weekDay = null
      } else {
        if (state.data) {
          sameWeekdayCheck = state.data.find(row => row.WeekDay === newData.WeekDay.toString());
          weekDay = Days[newData.WeekDay-1].value;  
        } else {
          sameWeekdayCheck = false
          weekDay = null
        }
      }
    } else {
      sameWeekdayCheck = false;
      weekDay = null;
    }

    let breakCheck
    if (hasAllOptional) {
      if (
        newData.BreaksBeginTime < newData.EndTime 
        && newData.BreaksBeginTime > newData.StartTime
        && newData.BreakEndTime < newData.EndTime
        && newData.BreakEndTime > newData.StartTime
        // && newData.BreaksBeginTime < newData.BreakEndTime
      ) {
        breakCheck = true
      } else breakCheck = false
    } else {
      breakCheck = true
    }


    if (!hasAllRequired) {
      return 'Weekday, start time, and end time must be specified.'
    } else {
      if (sameWeekdayCheck) {
        return `Scheduled hours are already defined for ${weekDay}. You can edit or remove this rule to proceed.`
      } else if (newData.EndTime < newData.StartTime) {
        return 'End time cannot be before start time.'
      } else {
        if (newData.hasOwnProperty('BreaksBeginTime') || newData.hasOwnProperty('BreakEndTime')) {
          if (!hasAllOptional) {
            return 'Both break start time and break end time must be specified.'
          } else {
            if (!breakCheck) {
              return 'Break times must be within day start and end times.'
            } else {
              let intervalCheck
              const allowedTimes = CheckInterval(props.scheduleInterval)
              if (allowedTimes.includes(newData.StartTime.slice(-2))
                && allowedTimes.includes(newData.EndTime.slice(-2))
                && allowedTimes.includes(newData.BreaksBeginTime.slice(-2))
                && allowedTimes.includes(newData.BreakEndTime.slice(-2))
              ) {
                intervalCheck = true
              } else {
                intervalCheck = false
              }

              if (!intervalCheck) {
                return `Hours must correspond to selected schedule interval of ${props.scheduleInterval} minutes.`
              } else return 'PASS'
            }
          } 
        } else {
          let intervalCheck
          const allowedTimes = CheckInterval(props.scheduleInterval)
          if (allowedTimes.includes(newData.StartTime.slice(-2))
            && allowedTimes.includes(newData.EndTime.slice(-2))
          ) {
            intervalCheck = true
          } else {
            intervalCheck = false
          }

          if (!intervalCheck) {
            return `Hours must correspond to selected schedule interval of ${props.scheduleInterval} minutes.`
          } else return 'PASS'
        }
      }
    }

  }

  const deleteScheduleRow = (weekday) => {
    if (!state.deletableRows.includes(weekday)) {
      return setState(prevState => {
        return ({
          ...prevState,
          deletableRows: [...prevState.deletableRows, weekday]
          // deletableRows: +weekday
        })
      })
    }
  }

  return (
    <Paper className={classes.scheduleContainer}>
      <MaterialTable
        title={
          <Typography component="div" variant='h5'>{props.title} Schedule</Typography>
        }
        icons={tableIcons}
        options={{
          search: false,
          paging: false,
          sorting: false,
          actionsColumnIndex: -1,
          draggable: false
        }}
        columns={state.columns}
        data={state.data}
        style={{margin:16, boxShadow: 'none', width:'95%'}} // Keep inline styles
        editable={{
          onRowAdd: newData =>
            new Promise((resolve,reject) => {
              setTimeout(() => {
                if (checkData(newData) !== "PASS") {
                  reject();
                  alert(checkData(newData))
                } else {
                  resolve();
      
                  const data = [...state.data];
                  data.push(newData);
                  data.sort((a,b) => a.WeekDay - b.WeekDay);
                  updateTableData(data);
                }
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve,reject) => {
              setTimeout(() => {
                if (checkData(newData, oldData) !== "PASS") {
                  reject();
                  alert(checkData(newData, oldData))
                } else {
                  resolve();

                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  data.sort((a,b) => a.WeekDay - b.WeekDay);
                  updateTableData(data);
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                deleteScheduleRow(oldData.WeekDay);
                updateTableData(data);
              }, 600);
            }),
        }}
      />
      <CardActions className={classes.cardActions}>
        <CustomButton
          color="primary"
          variant={'outlined'}
          onClick={onCancel}
        >
          Cancel
        </CustomButton>
        <CustomButton
          color="primary"
          onClick={() => {
            deleteScheduleRows(state.deletableRows);
            saveScheduleModalChanges(state.data)
          }}
        >
          Update schedule
        </CustomButton>
      </CardActions>
    </Paper>
  );
}

export default ScheduleTable