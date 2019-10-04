import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Loader from '../../loader';

const CreateFormBox = Loader({
  loader: () =>
    import('./createFormBox' /* webpackChunkName: 'CreateFormBox' */),
});

const EditFormBox = Loader({
  loader: () => import('./editFormBox' /* webpackChunkName: 'EditFormBox' */),
});

const DeleteFormBox = Loader({
  loader: () =>
    import('./deleteFormBox' /* webpackChunkName: 'DeleteFormBox' */),
});

const EmployeeModal = ({
  bankAccountValidation,
  // local states
  data,
  clickedBtn,
  // global states
  clickedUserData,
  selectedSearchItem,
  // actions
  hideModal,
  addFlashMessage,
  resetClickedItemData,
  resetSelectedItemValue,
  createEmployee,
  editEmployee,
  deleteEmployee,
}) => {
  const title =
    clickedBtn === 'edit'
      ? '직원정보 수정'
      : clickedBtn === 'create'
        ? '직원정보 등록'
        : null;

  const handleCloseModal = async () => {
    await Promise.all([
      clickedUserData.length !== 0 ? resetClickedItemData() : null,
      selectedSearchItem !== null ? resetSelectedItemValue() : null,
    ]);
    return hideModal();
  };

  return (
    <Modal
      title={title}
      handleClose={handleCloseModal}
      component={
        <React.Fragment>
          {clickedBtn === 'edit' ? (
            <EditFormBox
              bankAccountValidation={bankAccountValidation}
              editEmployee={editEmployee}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData}
            />
          ) : clickedBtn === 'create' ? (
            <CreateFormBox
              bankAccountValidation={bankAccountValidation}
              createEmployee={createEmployee}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              data={data}
            />
          ) : clickedBtn === 'delete' ? (
            <DeleteFormBox
              deleteEmployee={deleteEmployee}
              selectedSearchItem={selectedSearchItem}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
            />
          ) : null}
        </React.Fragment>
      }
    />
  );
};

export default EmployeeModal;