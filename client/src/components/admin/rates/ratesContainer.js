import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Loader from '../../loader';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import AdminVerificationModal from '../../../shared/adminVerification/adminVerificationModal';
import {
  keepScrollPosition,
  saveYposition,
  scrollToElement,
} from '../../../helpers/scrollPosition';
/* --- Actions --- */
import * as rateActions from '../../../actions/rateAction';
import * as selectedActions from '../../../actions/selectedAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import { handleAdminVerificationStatus } from '../../../actions/authAction';

const EditRateModal = Loader({
  loader: () =>
    import('./editRateModal' /* webpackChunkName: 'EditRateModal' */),
});
const RatesContainer = ({
  rateActions: { getCateringRates, updateReservedPrice },
  modalActions: { showModal, hideModal },
  selectedActions: {
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  handleAdminVerificationStatus,
  addFlashMessage,
  isAdminVerified,
  selectedSearchItem,
  clickedUserData,
  show,
  updateRatesMonth,
}) => {
  const [data, setData] = useState(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const onFocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  const fetchCateringRates = async () => {
    const res = await getCateringRates();

    if (res.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    await setData(res);
    return keepScrollPosition();
  };

  useEffect(() => {
    // opens the admin password checking modal on page load
    if (!isAdminVerified) {
      showModal();
    }
    fetchCateringRates();
    return () =>
      Promise.all([
        clickedUserData.length !== 0 && resetClickedItemData(),
        selectedSearchItem && resetSelectedItemValue(),
        isAdminVerified && handleAdminVerificationStatus(),
        show && hideModal(),
      ]);
  }, []);

  const getClickedUserData = async id => {
    const userData = await data.filter(user => user.userId === id);
    return userData[0];
  };

  const handleEditUserBtnClick = async (e, id) => {
    e.preventDefault();
    const userData = await getClickedUserData(id);
    await saveClickedItemData(userData);
    return Promise.all([showModal(), offFocusOnSelectdRow()]);
  };

  const handleTableRowClick = id => {
    onFocusOnSelectdRow(id);
    if (selectedSearchItem) resetSelectedItemValue();
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  // funcions that runs after search component
  const handleSuggestionSelected = data => {
    scrollToElement(data.userId);
    if (selectedRow) offFocusOnSelectdRow();
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  // only renders mealprice data when admin user is confirmed
  const dataToRender = isAdminVerified ? data : [];
  const width = data && data.length > 10 ? 'w-90' : 'r--w-50';
  return (
    <div id="print" className={`container-a ${width}`}>
      {data && (
        <div className="print-width print-tc">
          <h2>식수가격</h2>
          <div className="paper-label-box flex justify-between">
            <SearchBar
              data={data}
              searchingProp="companyName"
              handleSuggestionSelected={handleSuggestionSelected}
              handleResetSearch={() => {}}
            />
            <IconButton
              name="print"
              width="32"
              height="32"
              viewBox="0 0 25 25"
              handleClick={() => printDiv('print')}
            />
          </div>
          <RatesPaper
            data={data}
            users={dataToRender}
            selectedRow={selectedRow}
            selectedSearchItem={selectedSearchItem}
            clickedUserData={clickedUserData[0] || clickedUserData}
            handleEditUserBtnClick={handleEditUserBtnClick}
            handleTableRowClick={handleTableRowClick}
            isAdminVerified={isAdminVerified}
          />
          {isAdminVerified && clickedUserData.length !== 0 && (
            <EditRateModal
              clickedUserData={clickedUserData[0]}
              hideModal={hideModal}
              updateReservedPrice={updateReservedPrice}
              addFlashMessage={addFlashMessage}
              saveYposition={saveYposition}
              updateRatesMonth={updateRatesMonth}
            />
          )}
          <AdminVerificationModal />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
  clickedUserData: state.selected.data,
  isAdminVerified: state.isAdminVerified.isAdminVerified,
  show: state.modal.show,
  updateRatesMonth: state.selected.updateMealPrice,
});

const mapDispatchToProps = dispatch => ({
  rateActions: bindActionCreators(rateActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  handleAdminVerificationStatus: () =>
    dispatch(handleAdminVerificationStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer);
