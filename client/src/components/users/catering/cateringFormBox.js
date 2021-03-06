import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';
import { cateringValidation } from '../../formValidation';

const CateringFormBox = ({
  catering,
  updateUserCatering,
  addFlashMessage,
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
  businessType,
}) => {
  const handleUpdateCatering = async (values, { setSubmitting }) => {
    const date = catering.date;
    const data = { ...values, date };

    const res = updateUserCatering(catering.userId, data);
    if (!res.error) {
      addFlashMessage('success', `저장되었습니다.`);
    }
    if (res.error) {
      addFlashMessage('error', `저장되지 않았습니다. 다시 시도해 주세요.`);
    }
    return setSubmitting(false);
  };

  const inputValues = {
    lunchQty: catering.lunchQty,
    dinnerQty: catering.dinnerQty,
    lateNightSnackQty: catering.lateNightSnackQty,
  };

  return (
    <Formik
      initialValues={inputValues}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <CateringForm
            {...props}
            isLunchQtyDisabled={isLunchQtyDisabled}
            isDinnerQtyDisabled={isDinnerQtyDisabled}
            businessType={businessType}
          />
        </Form>
      )}
      onSubmit={handleUpdateCatering}
      validationSchema={cateringValidation}
    />
  );
};

export default CateringFormBox;
