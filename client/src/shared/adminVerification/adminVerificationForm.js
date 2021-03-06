import React from 'react';
/* --- Components --- */
import PasswordField from '../form/passwordField';
import FormButton from '../form/formButton';
import VerificationMessage from './verificationMessage';

const AdminVerificationForm = ({ isSubmitting, confirmType }) => (
  <div className="mh3 lh-3 mh-auto">
    <VerificationMessage type={confirmType} />
    <div className="media--justify-center mt4">
      <PasswordField
        label="비밀번호"
        name="password"
        styleName="textFieldG"
        variant="outlined"
      />
      <div className="mt2">
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="확인"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  </div>
);

export default AdminVerificationForm;
