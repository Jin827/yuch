import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import EmployeeTableRow from './employeeTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 470 },
});

const EmployeeTable = ({
  classes: { tableWrapper, table },
  employeeColumns,
  // local state
  data,
  selectedRow,
  // global state
  selectedSearchItem,
  clickedUserData,
  // actions
  saveClickedItemData,
  saveSelectedItemValue,
  // funcs
  handleButtonClick,
  handleTableRowClick,
}) => {
  const getClickedUserData = async bankId => {
    const filteredData = await data.filter(b => b.id === bankId);
    return filteredData[0];
  };

  const handleEditBtnClick = async id => {
    const clickedData = await getClickedUserData(id);
    await saveClickedItemData(clickedData);
    return handleButtonClick('edit');
  };

  const handleDeleteBtnClick = async id => {
    await saveSelectedItemValue(id);
    return handleButtonClick('delete');
  };

  const emptyRows = data && 7 - data.length;

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="bank" size="small">
        <EnhancedTableHead list={employeeColumns} />
        <TableBody data-testid="bank-account--table">
          {data &&
            data.length !== 0 &&
            data.map(row => (
              <EmployeeTableRow
                key={row.name}
                handleTableRowClick={handleTableRowClick}
                handleEditBtnClick={handleEditBtnClick}
                handleDeleteBtnClick={handleDeleteBtnClick}
                row={row}
                selectedRow={selectedRow}
                selectedSearchItem={selectedSearchItem}
                clickedUserData={clickedUserData}
              />
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(EmployeeTable);
