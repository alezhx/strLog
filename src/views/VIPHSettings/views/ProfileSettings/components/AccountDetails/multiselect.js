import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText'
// import './multiselect.css'
// import { ValidatorForm, SelectValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: props => props.width && props.width
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    backgroundColor: 'rgba(5,167,227,0.24)',
    fontSize: '1em'
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  emptyText: {
    fontStyle:'italic', 
    fontSize:'1em', 
    color: theme.palette.primary.main
  }
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxHeight: 400,
      width: 250,
    },
  },
};

const MultipleSelect = (props) => {
  const classes = useStyles(props);
  const { 
    handleFormChange, 
    options, 
    availableOptions, 
    inputName, 
    placeholder, 
    ...rest 
  } = props

  // const handleChangeMultiple = event => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setLanguage(value);
  // };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="select-multiple-chip", spoken languages</InputLabel> */}
        <Select
          {...rest}
          multiple
          name={inputName}
          displayEmpty={true} 
          value={options ? options : []}
          onChange={handleFormChange}
          // input={<Input id="preferredlanguage" />}
          renderValue={selected => {
            if(!selected.length) {
              return <Typography className={classes.emptyText}>{placeholder}</Typography>
            }
            else return (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
          }
          MenuProps={MenuProps}
        >
          {availableOptions.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={options.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        {props.error &&
          <FormHelperText error>
            This field is required.
          </FormHelperText>
        }
      </FormControl>
    </div>
  );
};

export default MultipleSelect