import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { getIn } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '../../../assets/icons';

const styles = theme => ({
  // auth, admin & user account
  textField: {
    width: 300,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
  // forgot id, password
  textFieldA: {
    width: 250,
    margin: '14px 10px',
    [theme.breakpoints.up('md')]: {
      width: 520,
    },
  },
  // lunchQty, dinnerQty
  textFieldB: {
    width: 142,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 238,
    },
  },
  // [C,D,E] create/edit user account forms
  // [C] bank account
  textFieldC: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 260,
  },
  textFieldD: {
    marginLeft: theme.spacing(0.6),
    marginRight: theme.spacing(0.6),
    width: 80,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2.2),
      marginRight: theme.spacing(2.2),
      width: 170,
    },
  },
  // users catering
  textFieldE: {
    width: 65,
  },
  // rate form : reservePrice
  textFieldF: {
    width: 200,
  },
  // admin verification
  textFieldG: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2.2),
      marginRight: theme.spacing(2.2),
      width: 260,
    },
  },
  // special_meal
  textFieldH: {
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 580,
    },
  },
});

const Input = ({
  classes,
  icon,
  styleName,
  field: { name, value, onBlur },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const errorMessage = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;

    if (
      name === 'lunchQty' ||
      name === 'dinnerQty' ||
      name === 'lateNightSnackQty' ||
      name === 'mealPrice' ||
      name === 'reservePrice' ||
      name === 'lunch' ||
      name === 'dinner' ||
      name === 'quantity' ||
      name === 'sideDish'
    ) {
      // to avoid isNaN('') === false, use parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      } else {
        value = null;
      }
    }
    if (
      name === 'username' ||
      name === 'password' ||
      name === 'newPassword' ||
      name === 'confirmPassword'
    ) {
      value = inputValue.toLowerCase();
    }
    // manually need to add all names or number input value will set to string instead of null when it's empty.
    if (
      name === 'companyName' ||
      name === 'contactNo' ||
      name === 'address' ||
      name === 'email' ||
      name === 'bankAccountId' ||
      name === 'businessType' ||
      name === 'accountHolder' ||
      name === 'bankName' ||
      name === 'accountNo' ||
      name === 'note' ||
      name === 'time' ||
      name === 'date' ||
      name === 'businessNo' ||
      name === 'name' ||
      name === 'startDate'
    ) {
      value = inputValue;
    }

    return setFieldValue(name, value, shouldValidate);
  };

  if (
    name === 'password' ||
    name === 'newPassword' ||
    name === 'confirmPassword'
  ) {
    return (
      <TextField
        name={name}
        value={value || ''}
        onChange={e => change(e, name, true)}
        onBlur={onBlur}
        {...props}
        className={classes[styleName]}
        helperText={isTouched && errorMessage}
        error={isTouched && Boolean(errorMessage)}
      />
    );
  }
  return (
    <TextField
      name={name}
      value={value || ''}
      onChange={e => change(e, name, true)}
      onBlur={onBlur}
      {...props}
      className={classes[styleName]}
      helperText={isTouched && errorMessage}
      error={isTouched && Boolean(errorMessage)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              name={icon}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default withStyles(styles)(Input);
