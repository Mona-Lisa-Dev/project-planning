import 'date-fns';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import s from './CreateSprint.module.scss';

const useStyles = makeStyles({
  root: {
    '& .MuiGrid-container': {
      // backgroundColor: 'red',
      marginRight: 30,
    },

    '& .MuiFormControl-root': {
      margin: 0,
      width: '100%',

      // '& div': {
      //   backgroundColor: 'red',
      // },

      // '&.MuiTextField-root:first-child': {
      //   backgroundColor: 'red',
      //   // marginBottom: 40,
      //   // [`@media (min-width: ${768}px)`]: {
      //   //   marginBottom: 53,
      //   // },
      // },
    },

    // Lable
    '& label': {
      fontFamily: ['Montserrat', 'sans-serif'],
      fontWeight: 400,
      letterSpacing: '0.04em',
      color: 'rgba(24, 28, 39, 0.6)',

      '&.MuiFormLabel-root': {
        // paddingLeft: 0,
        paddingLeft: 7,
        color: 'rgba(24, 28, 39, 0.6)',
        fontSize: 16,

        [`@media (min-width: ${768}px)`]: {
          fontSize: 18,
        },

        '&.MuiFormLabel-root.MuiInputLabel-shrink': {
          fontSize: '1.2rem',
          paddingLeft: 0,
        },

        // '&.MuiFormLabel-root.MuiFormLabel-filled': {
        //   fontSize: 30,
        // },
      },

      // '&.Mui-focused': {
      //   paddingLeft: 0,
      //   fontSize: '1rem',
      //   color: 'green',
      //   // color: '#ff6b08',
      // },
    },

    '& input': {
      paddingLeft: 7,
      fontFamily: ['Montserrat', 'sans-serif'],
      fontSize: 18,
      color: '#181C27',
    },

    // '& input:focus': {
    //   fontFamily: ['Montserrat', 'sans-serif'],
    // },

    // Input border
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff6b08',
    },

    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(24, 28, 39, 0.2)',
    },

    '& .MuiInput-underline:hover:before': {
      borderBottom: '1px solid rgba(24, 28, 39, 0.2)',
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'skyblue',
        backgroundColor: 'green',
      },
    },
  },
});

const CreateSprint = () => {
  const [sprintName, setSprintName] = useState('');
  const [previousDays, setPreviousDays] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const classes = useStyles();

  // Input - Date
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // Input - sprintName and duration
  const handleInputForm = e => {
    const { name, value } = e.target;
    name === 'sprintName' ? setSprintName(value) : setDuration(value);
  };

  // Checkbox
  const handlePeviousDaysChange = e => {
    setPreviousDays(e.currentTarget.checked);
  };

  // New sprint
  const createNewSprint = e => {
    e.preventDefault();

    console.log('sprintName', sprintName);
    console.log('selectedDate', selectedDate);
    console.log('duration', duration);

    setSprintName('');
    setSelectedDate(new Date());
    setDuration('');
  };

  return (
    <div className={s.CreateSprintWrap}>
      <h3>Creating a sprint</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={createNewSprint}
      >
        <div className={s.nameTextFieldWrap}>
          <TextField
            id="standard-basic"
            label="The name of the sprint"
            type="text"
            name="sprintName"
            value={sprintName}
            onChange={handleInputForm}
          />
        </div>

        <label className={s.checkboxLabel}>
          <input
            className={s.visuallyHidden}
            type="checkbox"
            name="previousDays"
            checked={previousDays}
            onChange={handlePeviousDaysChange}
          />
          <span className={s.checkboxIcon}>
            <span className={s.orangeCircle} />
          </span>
          <span className={s.checkboxLabel}>Previous Days</span>
        </label>

        <div className={s.dataWrap}>
          <div className={s.KeyboardDatePickerWrap}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                {previousDays ? (
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd MMM"
                    margin="normal"
                    id="date-picker-inline"
                    label="End date"
                    type="text"
                    name="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                ) : (
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    minDate={new Date()}
                    format="dd MMM"
                    margin="normal"
                    id="date-picker-inline"
                    label="End date"
                    type="text"
                    name="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                )}
              </Grid>
            </MuiPickersUtilsProvider>
          </div>

          <div className={s.durationTextFieldWrap}>
            <TextField
              id="standard-basic"
              label="Duration"
              type="text"
              name="duration"
              value={duration}
              onChange={handleInputForm}
            />
          </div>
        </div>
        <button className={s.formBtn} type="submit">
          Ready
        </button>

        <span className={s.cancelBtn}>Cancel</span>
      </form>
    </div>
  );
};

export default CreateSprint;
