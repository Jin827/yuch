import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import { isLoggedIn, saveUserToken } from '../../../../localStorage';
import { loginValidation } from '../../formValidation';
import * as data from '../../../data/data';
/* --- Actions --- */
import { userLogin, keepMeLoggedIn } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

const Login = ({
  history,
  // states
  keepLoggedIn,
  userData,
  // actions
  userLogin,
  addFlashMessage,
  keepMeLoggedIn,
}) => {
  const { loggedInUser, loginFailed } = data.message.auth;

  const handleUserLogin = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;

    if (isLoggedIn()) {
      await addFlashMessage('warning', loggedInUser);
      resetForm({});
      setSubmitting(false);
      return history.push('/');
    }

    try {
      const token = await userLogin(username, password);
      await saveUserToken(token, keepLoggedIn);
      await resetForm({});
      await setSubmitting(false);
      history.push('/');
    } catch (error) {
      addFlashMessage('error', loginFailed);
      return setSubmitting(false);
    }
  };

  // when user found username from 'forgot ID'.
  // userData[0].username state is purposly saved temporary.
  // In order to achieve this, save it in 'HTTP_SUCCESS' action of 'forgotUsername'.

  return (
    <LoginForm
      keepMeLoggedIn={keepMeLoggedIn}
      keepLoggedIn={keepLoggedIn}
      userData={userData}
      handleUserLogin={handleUserLogin}
      loginValidation={loginValidation}
    />
  );
};

const mapStateToProps = state => ({
  keepLoggedIn: state.auth.keepLoggedIn,
  userData: state.httpHandler.data,
});
const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
  keepMeLoggedIn: () => dispatch(keepMeLoggedIn()),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
