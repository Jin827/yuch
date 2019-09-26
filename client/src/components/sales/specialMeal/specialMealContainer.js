import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { twoYearsAgo, inTwoYears, formattedTmr } from '../../../helpers/moment';
import { formatToYearDateForm, formatToYYYYMM } from '../../../utils/date';
import DateButtons from '../../../shared/form/dateButtons';
import Paper from '../../../shared/paper';
import Table from './specialMealTable';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import CreateModal from './createSpecialMealModal';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as specialMealActions from '../../../actions/specialMealAction';

const SpecialMealContainer = ({
  date,
  specialMealActions: {
    getSpecialMeal,
    createSpecialMeal,
    updateSpecialMeal,
    deleteSpecialMeal,
  },
  dateTrackerActions: { updateDate, resetDate },
  modalActions: { showModal, hideModal },
  addFlashMessage,
}) => {
  const [specialMeal, setSpecialMeal] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);
  const yyyymm = formatToYYYYMM(date);

  const fetchData = async when => {
    const res = await getSpecialMeal(when);
    return setSpecialMeal(res);
  };

  useEffect(() => {
    fetchData(yyyymm);
    return () => resetDate();
  }, []);

  const handleButtonClick = sub => {
    Promise.all([setClickedBtn(sub), showModal()]);
  };

  const handleSuggestionSelected = () => {};
  const handleResetSearch = () => {};

  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToYearDateForm(date);

  return (
    <div className="container-a pw3">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        특식 관리
      </h2>
      <DateButtons
        reload={true}
        monthlyUnit={true}
        startTime={twoYearsAgo}
        endTime={inTwoYears}
        formattedDate={formattedDate}
        date={yyyymm}
        updateDate={updateDate}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        dateForwardMessage="존재하지 않는 페이지입니다."
      />
      <div className="paper-label-box justify-between">
        <SearchBar
          data={specialMeal}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={handleResetSearch}
        />
        <div>
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
          <IconButton
            handleClick={() => handleButtonClick('create')}
            name="add"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          />
        </div>
      </div>
      <Paper component={<Table data={specialMeal} />} />
      {clickedBtn !== null && (
        <CreateModal
          hideModal={hideModal}
          createSpecialMeal={createSpecialMeal}
          formattedTmr={formattedTmr}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  modalActions: bindActionCreators(modalActions, dispatch),
  specialMealActions: bindActionCreators(specialMealActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpecialMealContainer);
