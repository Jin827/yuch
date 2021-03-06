import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import RateForm from './editRateForm';
import { reservePriceValidation } from '../../formValidation';
import { nextMonth } from '../../../helpers/moment';

const EditRateModal = ({
  // global states
  clickedUserData,
  // actions
  hideModal,
  updateReservedPrice,
  addFlashMessage,
  // helpers
  saveYposition,
}) => {
  const title = (
    <React.Fragment>
      <span className="b">{clickedUserData.companyName}</span> 식수가격
    </React.Fragment>
  );

  const [selectedDate, setSelectedDate] = React.useState(
    clickedUserData.reserveDate || nextMonth,
  );
  const reservePrice = clickedUserData.reservePrice;
  const values = { reservePrice };

  const handleSelectChange = e => setSelectedDate(e.target.value);
  const closeModal = () => hideModal();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { reservePrice } = values;
    const userId = clickedUserData.userId;
    const res = await updateReservedPrice(userId, reservePrice, selectedDate);
    if (res.error) {
      addFlashMessage(
        'error',
        `고객 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    } else {
      await saveYposition();
      await Promise.all([resetForm({}), closeModal()]);
      addFlashMessage(
        'success',
        ` ${clickedUserData.companyName} 식수가격이 수정되었습니다.`,
      );
      window.location.reload(true);
    }
    return setSubmitting(false);
  };
  return (
    <Modal
      title={title}
      handleClose={closeModal}
      component={
        <Formik
          initialValues={values}
          render={props => (
            <Form>
              <RateForm
                {...props}
                selectedDate={selectedDate}
                handleSelectChange={handleSelectChange}
              />
            </Form>
          )}
          validationSchema={reservePriceValidation}
          onSubmit={handleSubmit}
        />
      }
    />
  );
};

export default EditRateModal;
