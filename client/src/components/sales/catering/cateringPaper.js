import React from 'react';
/* --- Components --- */
import { stableSort, getSorting } from '../../../utils/sort';
import Paper from '../../../shared/paper';
import CateringTable from './cateringTable';

const CateringPaper = ({
  users,
  selectedSearchItem,
  handleEditUserBtnClick,
  selectedRow,
  editBtnClickedRow,
  handleTableRowClick,
}) => {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('companyName');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  let sortedDataA;
  let sortedDataB;
  if (users && users.length <= 10) {
    sortedDataA = stableSort(users, getSorting(order, orderBy));
    sortedDataB = [];
  }
  if (users && users.length > 10) {
    const line =
      users.length % 2 === 0 ? users.length / 2 : users.length / 2 + 0.5;
    sortedDataA = stableSort(users, getSorting(order, orderBy)).slice(0, line);
    sortedDataB = stableSort(users, getSorting(order, orderBy)).slice(
      line,
      users.length,
    );
  }

  return (
    <div id="print" className="paper users-catering--width">
      <Paper
        component={
          <CateringTable
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataA}
            handleRequestSort={handleRequestSort}
            selectedSearchItem={selectedSearchItem}
            handleEditUserBtnClick={handleEditUserBtnClick}
            selectedRow={selectedRow}
            editBtnClickedRow={editBtnClickedRow}
            handleTableRowClick={handleTableRowClick}
          />
        }
      />
      <Paper
        classes="paper--sec"
        component={
          <CateringTable
            order={order}
            orderBy={orderBy}
            sortedData={sortedDataB}
            handleRequestSort={handleRequestSort}
            selectedSearchItem={selectedSearchItem}
            handleEditUserBtnClick={handleEditUserBtnClick}
            selectedRow={selectedRow}
            editBtnClickedRow={editBtnClickedRow}
            handleTableRowClick={handleTableRowClick}
          />
        }
      />
    </div>
  );
};

export default CateringPaper;