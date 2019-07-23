import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getIn } from 'formik';

const Input = ({
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

    if (name === 'lunchQty' || name === 'dinnerQty' || name === 'mealPrice') {
      // to avoid isNaN('') === false, use parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      }
      if (inputValue === '') {
        value = inputValue;
      }
    }
    if (
      name === 'username' ||
      name === 'password' ||
      name === 'confirmPassword'
    ) {
      value = inputValue.toLowerCase();
    }
    if (name === 'bankAccountId' || name === 'businessType') {
      value = inputValue;
    }
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <React.Fragment>
      <TextField
        name={name}
        value={value || ''}
        onChange={e => change(e, name, true)}
        onBlur={onBlur}
        {...props}
        helperText={isTouched && errorMessage}
        error={isTouched && Boolean(errorMessage)}
      />
    </React.Fragment>
  );
};

export default Input;
