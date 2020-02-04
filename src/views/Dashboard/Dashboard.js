import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { API_Patient } from 'utils/API'
import { PieChart, BarGraph, StatsCard } from './components'
import { connect } from 'react-redux'
import { actions } from 'redux/actions'
import { HttpTool } from 'utils'
import {InstallNumberFilterType} from "utils/customEnum";
import moment from 'moment';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
  }
});

const DateType = {
  year: 0,
  month: 1,
  day: 2,
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPatients: null,
      totalVIP: null,
      signUpDates: [],
      installNumberFilterType: InstallNumberFilterType.lastMonth
    }
  }

  componentDidMount() {
    const {toggleLoadingOn} = this.props
    toggleLoadingOn();
    this.fetchDashboardData();
  }

  fetchDashboardData = () => {
    const {toggleLoadingOffTHUNK} = this.props
    
    let promise1 = new Promise((res,rej) => {
      this.fetchTotalPatients(res)
    })
    let promise2 = new Promise((res,rej) => {
      this.fetchSignUpByDate(this.state.installNumberFilterType, res)
    })
    let promise3 = new Promise((res,rej) => {
      this.fetchVIPPatients(res)
    })

    let fetches = [promise1, promise2, promise3]
    
    Promise.all(fetches).then(() => toggleLoadingOffTHUNK())
  }

  fetchTotalPatients = (promiseCb) => {
    const {loginStore} = this.props

    let param = {
      ClinicID: loginStore.ClinicID,
    }

    HttpTool.post(API_Patient.getClinicTotalPatient, param, response => {
      // response.status === 200 ?
      this.setState({totalPatients:response.data.PatientNum}, 
        () => promiseCb && promiseCb());
    }, error => {
      promiseCb && promiseCb();
    })
  }

  fetchVIPPatients = (promiseCb) => {
    const {loginStore} = this.props

    let param = {
      ClinicID: loginStore.ClinicID,
    }

    HttpTool.post(API_Patient.getSignupPatientNum, param, response => {
      // response.status === 200 ?
      this.setState({totalVIP:response.data.PatientNum}, 
        () => promiseCb && promiseCb())
    }, error => {
      promiseCb && promiseCb();
    })
  }

  fetchSignUpByDate = (type, promiseCb) => {
    const {loginStore} = this.props

    let dateType = DateType.day
    if(type === InstallNumberFilterType.lastYear || type === InstallNumberFilterType.all) {
        dateType = DateType.month
    }

    let filterDate = this.getFilterDate(type)
    let param = {
      ClinicID: loginStore.ClinicID,
      DateType: dateType,
      StartDate: filterDate.StartDate,
      EndDate: filterDate.EndDate,
    }

    HttpTool.post(API_Patient.getSignupSuccessPatientDateByType, param, response => {
      let filterData = response ? response.data : []
      let filterList = this.filterDataWithType(filterData, type)

      this.setState({signUpDates: filterList}, 
        () => promiseCb && promiseCb())
    }, error => {
      promiseCb && promiseCb();
    })
  }

  getFilterDate(type) {
    let startDate
    let endDate = new Date()

    switch(type) {
      case InstallNumberFilterType.lastWeek:
        // .format???
        startDate = moment(endDate).subtract(7, 'days')
        break
      case InstallNumberFilterType.lastMonth:
        startDate = moment(endDate).subtract(1, 'months')
        break
      case InstallNumberFilterType.lastYear:
        startDate = moment(endDate).subtract(1, 'years')
        break
      case InstallNumberFilterType.all:
        startDate = '01/01/2017'
        break
      default: startDate = moment(endDate).subtract(1, 'years')
    }

    return {
      StartDate: moment(startDate).format('MM/DD/YYYY'), EndDate: moment(endDate).format('MM/DD/YYYY')
    }
  }

  filterDataWithType(dataSource, type) {
    let endDate = moment(new Date());
    let startDate
    let cleanList = []

    switch(type) {
      case InstallNumberFilterType.lastWeek:
        endDate.subtract(1, 'days') // start at 1 day earlier to match API
        startDate = moment(endDate).subtract(7, 'days')
        while(!startDate.isSame(endDate)) {
          let intervalUnit = startDate.add(1, 'days').format('YYYYMMDD')
          let newItem = {
            date: intervalUnit,
            signupnum: 0,
            label: moment(intervalUnit).format('MMM D')
          }

          dataSource.forEach((dataItem, index) => {
            if(dataItem.date === newItem.date) {
              newItem.signupnum = dataItem.signupnum
            }
          })

          cleanList.push(newItem)
        }
        break
      case InstallNumberFilterType.lastMonth:
        endDate.subtract(1, 'days') // start at 1 month earlier to match API
        startDate = moment(endDate).subtract(1, 'months')
        while(!startDate.isSame(endDate)) {
          let intervalUnit = startDate.add(1, 'days').format('YYYYMMDD')
          let newItem = {
            date: intervalUnit,
            signupnum: 0,
            label: moment(intervalUnit).format('MMM-D')
          }

          dataSource.forEach((dataItem, index) => {
            if(dataItem.date === newItem.date) {
              newItem.signupnum = dataItem.signupnum
            }
          })

          cleanList.push(newItem);
        }
        break

      case InstallNumberFilterType.lastYear:
        endDate.subtract(1, 'months') // start at last full month
        startDate = moment(endDate).subtract(1, 'years')
        while(!startDate.isSame(endDate)) {
          let intervalUnit = startDate.add(1, 'months').format('YYYYMM')
          let newItem = {
            date: intervalUnit,
            signupnum: 0,
            label: moment(intervalUnit, 'YYYYMM').format('MMM YYYY')
          }

          dataSource.forEach((dataItem, index) => {
            if(dataItem.date === newItem.date) {
              newItem.signupnum = dataItem.signupnum
            }
          })

          cleanList.push(newItem);
        }
        break

      case InstallNumberFilterType.all:
        endDate = endDate.subtract(1, 'months').format('YYYYMM')
        startDate = moment('12/2017', 'MM/YYYY').format('YYYYMM')
        while(startDate !== endDate) {
          let intervalUnit = moment(startDate, 'YYYYMM').add(1, 'months').format('YYYYMM')
          let newItem = {
            date: intervalUnit,
            signupnum: 0,
            label: moment(intervalUnit, 'YYYYMM').format('MMM-YYYY')
          }

          dataSource.forEach((dataItem, index) => {
            if(dataItem.date === newItem.date) {
              newItem.signupnum = dataItem.signupnum
            }
          })

          cleanList.push(newItem);
          startDate = moment(startDate, 'YYYYMM').add(1, 'months').format('YYYYMM')
        }
        break
      default: cleanList = []
    }
    return cleanList
  };

  updateBarGraph = (dateType) => {
    this.setState({installNumberFilterType: dateType}, () => {
      this.fetchSignUpByDate(this.state.installNumberFilterType)
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>

          <Grid item container xl={4} lg={4} sm={12} xs={12}>
            <Grid item xs={12}>
              <PieChart
                totalVIP={this.state.totalVIP}
                unregistered={this.state.totalPatients-this.state.totalVIP}
              />
            </Grid>
            <Grid item xs={12} style={{marginTop:32}}>
              <StatsCard
                totalVIP={this.state.totalVIP}
                totalPatients={this.state.totalPatients}
              />
            </Grid>
          </Grid>

          <Grid item xl={8} lg={8} sm={12} xs={12}>
            <BarGraph
              data={this.state.signUpDates}
              updateMenuFilter={this.updateBarGraph}
            />
          </Grid>
          
        </Grid>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleLoadingOn: () => {
    dispatch(actions.toggleLoadingOn())
  },
  toggleLoadingOff: () => {
    dispatch(actions.toggleLoadingOff())
  },
  toggleLoadingOffTHUNK: (time) => {
    dispatch(actions.toggleLoadingOffTHUNK(time))
  }
})

const mapStateToProps = (state) => ({
  initialSettings: state.global,
  loginStore: state.login,
  settingsStore: state.settings
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
