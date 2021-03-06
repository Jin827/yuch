import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
/* --- Components --- */
import EnhancedTableHead from '../../../shared/tableHead';
import EmployeeContactTableRow from './employeeContactTableRow';
import EmployeeBankTableRow from './employeeBankTableRow';

const styles = () => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: { minWidth: 300 },
});

const EmployeeTable = ({
  classes: { tableWrapper, table },
  listType,
  employeeBankColumns,
  employeeContactColumns,
  // local state
  data,
  selectedRow,
  // global state
  selectedSearchItem,
  // funcs
  handleTableRowClick,
}) => {
  const emptyRows = data && 7 - data.length;

  return (
    <div className={tableWrapper}>
      <Table className={table} aria-labelledby="bank" size="small">
        <EnhancedTableHead
          list={
            listType === 'bank' ? employeeBankColumns : employeeContactColumns
          }
        />
        <TableBody data-testid="bank-account--table">
          {data &&
            data.length !== 0 &&
            data.map(row => (
              <React.Fragment>
                {listType === 'bank' ? (
                  <EmployeeBankTableRow
                    key={row.id}
                    handleTableRowClick={handleTableRowClick}
                    row={row}
                    selectedRow={selectedRow}
                    selectedSearchItem={selectedSearchItem}
                  />
                ) : (
                  <EmployeeContactTableRow
                    key={row.id}
                    handleTableRowClick={handleTableRowClick}
                    row={row}
                    selectedRow={selectedRow}
                    selectedSearchItem={selectedSearchItem}
                  />
                )}
              </React.Fragment>
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
