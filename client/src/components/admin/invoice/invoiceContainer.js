import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { thisMonthYYYYMM } from '../../../helpers/moment';
import { formatToMonthDateForm, formatToYYYYMM } from '../../../utils/date';
import { admin } from '../../../data/data.js';
import { printDiv } from '../../../utils/print';
import DateButtons from '../../../shared/form/dateButtons';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import Paper from './invoicePaper';
import IconMessage from '../../../shared/iconMessage';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as invoiceActions from '../../../actions/invoiceAction';
import { resetSelectedItemValue } from '../../../actions/selectedAction';

const InvoiceContainer = ({
  date,
  searchedValue,
  dateTrackerActions: { updateDateMonthly, resetDateMonthly },
  invoiceActions: { getUsersInvoice, updateUsersInvoice },
  addFlashMessage,
  resetSelectedItemValue,
}) => {
  // YYYYMMDD -> 'YYYY 년 MM 월'
  const formattedDate = formatToMonthDateForm(date);
  const [data, setData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const onfocusOnSelectdRow = id => {
    setSelectedRow(id);
    resetSelectedItemValue();
  };
  const offFocusOnSelectdRow = () => setSelectedRow(null);
  const handleSuggestionSelected = () => offFocusOnSelectdRow();

  useEffect(
    () => () => {
      offFocusOnSelectdRow();
    },
    [],
  );

  const fetchData = async when => {
    // YYYYMMDD -> YYYYMM
    const yyyymm = formatToYYYYMM(when);
    const res = await getUsersInvoice(yyyymm);

    if (res.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setData(res);
  };

  useEffect(() => {
    fetchData(date);
    // return () => resetDateMonthly();
  }, []);

  return (
    <div className="container-a r--w-80">
      <h2
        className="pointer"
        title="오늘 일자로 돌아가기"
        onClick={resetDateMonthly}
      >
        거래 명세서
      </h2>
      <DateButtons
        date={date}
        reload={true}
        unit="mm"
        formattedDate={formattedDate}
        startTime={admin.startTime}
        // endTime={`${thisMonthYYYYMM}01`}
        endTime="20300101"
        updateDate={updateDateMonthly}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        dateForwardMessage="존재하지 않는 페이지입니다."
      />
      <div className="paper-label-box justify-between">
        <SearchBar
          data={data}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={() => {}}
        />
        <div className="flex">
          <IconButton
            name="update"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => updateUsersInvoice(date)}
          />
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
        </div>
      </div>
      <Paper
        id="print"
        data={data}
        selectedRow={selectedRow}
        searchedValue={searchedValue}
        onfocusOnSelectdRow={onfocusOnSelectdRow}
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text="고객사에 등록되어있는 특식이 포함된 합계입니다."
        position="end"
        iconBoxStyle="mt3 pw1"
        textStyle="icon-message--info"
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text="고객사별 거래명세서를 보시려면 고객사명을 클릭하여주세요."
        position="end"
        iconBoxStyle="mt3 pw1"
        textStyle="icon-message--info"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.dateMm,
  searchedValue: state.selected.value,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  invoiceActions: bindActionCreators(invoiceActions, dispatch),
  resetSelectedItemValue: () => dispatch(resetSelectedItemValue()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceContainer);