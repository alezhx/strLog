import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import palette from 'style/palette'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: 300
  },
}));


const options = {
  legend: {
    display: true,
    position:'bottom'
  },
  maintainAspectRatio: false,
  cutoutPercentage: 55
};


const PieChart = (props) => {
  const classes = useStyles();

  const data = {
    labels: ['VIPHealth Patients', 'Unregistered Patients' ],
    datasets: [
      {
        backgroundColor: [
          'rgb(5,167,227,0.7)',
          palette.lightGray,
        ],
        hoverBackgroundColor: [
          palette.primary.main,
          palette.darkGray
        ],
        borderColor: [
          '#2962ff', //dark blue
          palette.darkGray
        ],
        borderWidth: 1,
        data: [props.totalVIP, props.unregistered],
      }
    ]
  }

  return (
    <Card raised>
      <CardHeader
        title='VIPHealth Overview'
      />
      <Divider variant='middle'/>
      <CardContent>
        <div className={classes.chartContainer}>
          {(props.totalVIP !== null && props.unregistered != null) ? 
            <Doughnut
              data={data}
              options={options}
            /> : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
