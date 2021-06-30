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
    '& .MuiFormControl-root': {
      width: '100%',
      // backgroundColor: 'red',
    },

    // Lable
    '& label': {
      fontFamily: ['Montserrat', 'sans-serif'],
    },

    '& label.Mui-focused': {
      // fontFamily: ['Montserrat', 'sans-serif'],
      color: '#ff6b08',
    },

    '& input': {
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
// const useStyles = makeStyles({
//   root: {
//     '& > *': {
//       // margin: theme.spacing(1),
//       margin: '40',
//       width: '280',
//     },
//   },
// });

const CreateSprint = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const classes = useStyles();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={s.CreateSprintWrap}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />

        <div className={s.dataWrap}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                minDate={new Date()}
                format="dd MMM"
                margin="normal"
                id="date-picker-inline"
                label="End date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
      </form>
    </div>
  );
};

export default CreateSprint;
