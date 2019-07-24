import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { userLogout } from '../src/actions/authAction';
import { clearStorage } from '../localStorage';

const UserGuards = Component => {
  class LoginAuth extends React.Component {
    componentWillMount() {
      const {
        keepLoggedIn,
        userLogout,
        isLoggedIn,
        isAdmin,
        history,
      } = this.props;
      if (
        (!keepLoggedIn && !sessionStorage.getItem('keepLoggedIn')) || // if user reopen the browser ( keepLoggedIn is false)
        !isLoggedIn || // if user is not logged in
        isAdmin // if logged in user is admin
      ) {
        userLogout();
        clearStorage();
        return history.push('/login');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapPropsToState = state => ({
    keepLoggedIn: state.auth.keepLoggedIn,
    isLoggedIn: state.auth.isLoggedIn,
    isAdmin: state.auth.isAdmin,
  });
  return connect(
    mapPropsToState,
    { userLogout },
  )(LoginAuth);
};

export default UserGuards;