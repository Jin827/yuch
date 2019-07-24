import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import MealPriceField from '../../../shared/form/mealPriceField';
import FormButton from '../../../shared/form/formButton';
import Button from '../../../shared/form/button';
import IconButton from '../../../shared/form/iconButton';
import IconMessage from '../../../shared/iconMessage';
import BankAccountForm from './bankAccountForm';
import BusinessTypeForm from './businessTypeForm';

const EditUserForm = ({
  values: { bankAccountId, businessType },
  bankAccount,
  isSubmitting,
  setFieldValue,
  showSubModal,
}) => {
  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (name === 'bankAccountId' || name === 'businessType') {
      value = inputValue;
    }
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <React.Fragment>
      <div className="mh1 mb2 user-form">
        <div className="user-form--left">
          <FormikField
            label="고객명"
            name="companyName"
            type="text"
            icon="filledUser"
            styleName="textFieldC"
            placeholder="(한글) 유청"
            required
          />
          <FormikField
            label="고객 아이디"
            name="username"
            type="text"
            icon="user"
            styleName="textFieldC"
            placeholder="(영문) yucheong"
            required
          />
          <FormikField
            label="연락처"
            name="contactNo"
            type="text"
            icon="phone"
            styleName="textFieldC"
            placeholder="054 - 745 - 0999"
            required
          />
        </div>
        <div className="user-form--right">
          <MealPriceField
            label="식수가격"
            name="mealPrice"
            type="text"
            icon="user"
            styleName="textFieldC"
            placeholder="5000"
          />
          <FormikField
            label="이메일"
            name="email"
            type="email"
            icon="email"
            styleName="textFieldC"
            placeholder="sleket12@hanmail.net"
            required
          />
          <div className="flex justify-center">
            <FormikField
              label="중식 식수량"
              name="lunchQty"
              type="text"
              icon="catering"
              styleName="textFieldD"
              placeholder="70"
            />
            <FormikField
              label="석식 식수량"
              name="dinnerQty"
              type="text"
              icon="catering"
              styleName="textFieldD"
              placeholder="35"
            />
          </div>
        </div>
      </div>
      <FormikField
        label="주소"
        name="address"
        type="text"
        icon="address"
        styleName="textFieldE"
        placeholder="황성동 1071-1번지 강남골프장 맞은편"
      />
      <BusinessTypeForm businessType={businessType} change={change} />
      <BankAccountForm
        bankAccountId={bankAccountId}
        bankAccount={bankAccount}
        change={change}
      />
      <div className="edit-userform--bottom">
        <div>
          <Button
            typeValue="button"
            variantValue="outlined"
            buttonName="비밀번호 변경"
            width="medium"
            handleButtonClick={() => showSubModal('password')}
          />
          <FormButton
            typeValue="submit"
            variantValue="contained"
            buttonName="저장"
            width="medium"
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="edit-userform--bottom-delete">
          <div className="edit-userform--bottom-delete-icon">
            <IconButton
              name="delete"
              width="33"
              height="33"
              viewBox="0 0 24 24"
              handleClick={() => showSubModal('delete')}
            />
          </div>
          <div className="flex edit-userform--bottom-delete-message">
            <IconMessage
              name="warning"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fillOuter="#ed4337"
              fillInner="#ffffff"
              text="고객에 관한 모든 정보가 삭제됩니다."
              classes="icon-message--warning edit-userform--bottom-delete-message--p"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditUserForm;