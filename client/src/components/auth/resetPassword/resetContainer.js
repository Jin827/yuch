import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import queryString from 'query-string';
/* --- Components --- */
import PasswordForm from './passwordForm';
import { resetPasswordValidation } from '../formValidation';
/* --- Actions --- */
import { resetPasswordWithAccessToken } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

const ResetContainer = ({
  addFlashMessage,
  resetPasswordWithAccessToken,
  history,
}) => {
  const handleResetPassword = async (values, { setSubmitting, resetForm }) => {
    const parsed = queryString.parse(location.search);
    const token = parsed.token;
    const { newPassword } = values;
    try {
      await resetPasswordWithAccessToken(token, newPassword);
      await addFlashMessage('success', `고객님의 비밀번호를 수정하였습니다.`);
      resetForm({});
      history.push('/login');
    } catch (error) {
      await addFlashMessage(
        'error',
        `유효하지 않는 링크입니다. 비밀번호 찾기를 처음부터 다시 해주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const passwordValues = {
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={passwordValues}
      render={props => <PasswordForm {...props} />}
      onSubmit={handleResetPassword}
      validationSchema={resetPasswordValidation}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  resetPasswordWithAccessToken: (id, password, newPassword) =>
    dispatch(resetPasswordWithAccessToken(id, password, newPassword)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ResetContainer);
