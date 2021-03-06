import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
  point: { fontWeight: 'bold' },
});

const BankTableRow = ({
  classes: { resize, point },
  handleTableRowClick,
  handleEditBtnClick,
  handleDeleteBtnClick,
  row,
  selected,
  labelId,
}) => (
  <TableRow
    key={row.id}
    onClick={() => handleTableRowClick(row.id)}
    role="checkbox"
    aria-checked={selected === row.id}
    tabIndex={-1}
    selected={selected === row.id}
  >
    <TableCell padding="checkbox">
      <div className="flex flex-row-m" data-testid="bank-account--tablerow">
        <IconButton
          name="edit"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          handleClick={() => handleEditBtnClick(row.id)}
        />
        <IconButton
          name="delete"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          handleClick={() => handleDeleteBtnClick(row.id)}
        />
      </div>
    </TableCell>
    <TableCell
      component="th"
      id={labelId}
      scope="row"
      className={`${resize} ${point}`}
    >
      {row.accountHolder}
    </TableCell>
    <TableCell align="right" className={resize}>
      {row.bankName}
    </TableCell>
    <TableCell align="right" className={resize}>
      {row.accountNo}
    </TableCell>
  </TableRow>
);

export default withStyles(styles)(BankTableRow);
