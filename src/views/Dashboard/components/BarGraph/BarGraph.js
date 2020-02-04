import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import palette from 'style/palette'
import {InstallNumberFilterType} from "utils/customEnum";

const useStyles = makeStyles(() => ({
  root: {
  },
  chartContainer: {
    height:'100%',
  },
  cardContent: {
    height: 734
  }
}));

let lineColor = new Array(60)
lineColor.push(palette.primary.main)
lineColor.fill(palette.extraLightGray,1,60)

let options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { 
    display: false 
  },
  layout: {
    padding: 8,
  },
  scales: {
    xAxes: [
      {
        // position: 'top',
        minBarLength: 3,
        ticks: {
          fontColor: palette.primary.main,
          fontSize: 15,
          min: 0,
          beginAtZero: true,
          precision: 0,
          drawTicks: true,
          suggestedMax: 30
        },
        gridLines: {
          // display: false,
          color: lineColor,
          borderDash: [2],
          borderDashOffset: [2],
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.extraLightGray
        },
      }
    ],
    yAxes: [
      {
        maxBarThickness: 48,
        ticks: {
          fontSize: 15,
          fontColor: palette.black,
          // fontStyle: 'bold',
        },
        gridLines: {
          color: palette.primary.main,
          display: false,
        }
      }
    ]
  }
};

const BarGraph = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(InstallNumberFilterType.lastMonth)
  const menus = ['Past 7 Days', 'Past 30 Days', 'Past year', 'All per month']

  const dataSource = props.data
  let barDatas = []
  let barLabels = []

  dataSource.forEach((item, index) => {
    barDatas.push(item.signupnum)
    barLabels.push(item.label)
  })

  const data = {
    labels: barLabels,
    datasets: [
      {
        label: 'Signed up',
        backgroundColor: 'rgba(255,88,10,0.5)',
        borderColor: palette.darkOrange,
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,88,10,0.75)',
        // hoverBorderColor: palette.primary.main,
        data: barDatas,
      },
    ]
  };

  const openDateMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (index) => {
    if (index >=0 || index <= 4) {
      setSelectedMenuIndex(index)
      setAnchorEl(null);
  
      let type = InstallNumberFilterType.lastYear
      if (index === 0) {
        type = InstallNumberFilterType.lastWeek
      }else if (index === 1) {
        type = InstallNumberFilterType.lastMonth
      }else if (index === 2) {
        type = InstallNumberFilterType.lastYear
      }else if(index === 3) {
        type = InstallNumberFilterType.all
      } 
      props.updateMenuFilter(type)
    }
    setAnchorEl(null)
  };

  const handleClose = () => setAnchorEl(null)

  const renderDateMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menus.map((item, index)=> {
          return(
            <MenuItem 
              key={item}
              selected={index===selectedMenuIndex}
              onClick={() => handleSelect(index)}
            >
              {item}
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  let dataSetMax = Math.max.apply(Math, barDatas.map(o => o))
  if (dataSetMax <= 2) { 
    options.scales.xAxes[0].ticks.stepSize = 0.5
    options.scales.xAxes[0].ticks.suggestedMax = dataSetMax + 0.5
  } else {
    options.scales.xAxes[0].ticks.suggestedMax = dataSetMax + 1
    options.scales.xAxes[0].ticks.stepSize = 1
  }

  return (
    <Card className={classes.root} raised>
      <CardHeader
        action={
          <Button
            size="medium"
            variant="text"
            onClick={openDateMenu}
          >
            {menus[selectedMenuIndex]} <ArrowDropDownIcon />
          </Button>
        }
        title="VIPHealth Sign Ups"
      />
      <Divider variant='middle'/>
      <CardContent className={classes.cardContent}>
        <div className={classes.chartContainer}>
          <HorizontalBar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      {renderDateMenu()}
    </Card>
  );
};


export default BarGraph;
