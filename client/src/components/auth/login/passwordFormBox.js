import React, { useState } from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import PasswordForm from './passwordForm';

const ForgotContainer = ({
  companyName,
  forgotPasswordValidation,
  sendVerificationCodeToEmail,
  addFlashMessage,
}) => {
  const [state, setState] = useState({ emailSent: false, email: '' });

  const handleForgotPassword = async (values, { setSubmitting, resetForm }) => {
    const { username, email } = values;
    try {
      await sendVerificationCodeToEmail(username, email);
      await setState({ emailSent: true, email });
      resetForm({});
    } catch (err) {
      await addFlashMessage(
        'error',
        `${email}로 이메일을 보내는데 실패하였습니다. 이메일 주소가 맞는지 확인하고, 다시 시도해주세요.`,
      );
    }
    return setSubmitting();
  };

  const passwordValues = {
    username: '',
    email: '',
  };

  return (
    <div className="flex flex-column-m items-center">
      <p className="mb2 b f-regular lh-2">
        고객님의 아이디와 {companyName}에 등록되어 있는 이메일 주소를 입력해
        주세요.
      </p>
      <p className="c-text-grey f-mini">
        고객님이 입력한 이메일로 인증코드가 전송됩니다.
      </p>
      <p className="c-text-grey f-mini">
        이메일 주소를 등록하지 않았거나, 기억이 나지 않으시면&#8201;
        {companyName}
        으로 문의 바랍니다.
      </p>
      <Formik
        initialValues={passwordValues}
        render={props => <PasswordForm {...props} />}
        onSubmit={handleForgotPassword}
        validationSchema={forgotPasswordValidation}
      />
      {state.emailSent && (
        <p className="mt4 f-regular lh-2">
          <span className="b">{state.email}</span> &#8201;로 인증코드가
          성공적으로 전송되었습니다. <br />
          <span className="c-point2">이메일을 확인해주세요.</span>
        </p>
      )}
    </div>
  );
};

export default ForgotContainer;