import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import { TextField } from '@material-ui/core';
import IconButton from '../../../shared/form/iconButton';
import IconFormButton from '../../../shared/form/iconFormButton';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
  textField: { width: 60 },
});

const CateringTableRow = ({
  classes: { resize, textField },
  // var
  row,
  labelId,
  // global state
  selectedSearchItem,
  // local state
  editIndex,
  // funcs
  handleChange,
  updateMealQty,
  startEditing,
  endEditing,
  // actions
  saveSelectedItemValue,
  resetSelectedItemValue,
}) => {
  const { userId, companyName, lunchQty, dinnerQty, lateNightSnackQty } = row;

  const currentlyEditing = editIndex === userId;

  const lunch = lunchQty === null ? '' : lunchQty;
  const dinner = dinnerQty === null ? '' : dinnerQty;
  const lateNightSnack = lateNightSnackQty === null ? '' : lateNightSnackQty;

  // blur the rest on edit
  const isOff =
    !editIndex || !selectedSearchItem
      ? null
      : selectedSearchItem !== userId
        ? 'off'
        : null;

  // on search click
  // editIndex = null
  // clear searchbar input

  const handleEditBtnClick = async (e, id) => {
    e.preventDefault();
    await saveSelectedItemValue(id);
    return startEditing(id);
  };

  const handleCloseBtnClick = async () => {
    endEditing();
    resetSelectedItemValue();
  };

  return (
    <React.Fragment>
      <TableRow
        key={`tr-${userId}`}
        hover
        // selected row on search
        selected={selectedSearchItem === companyName}
        className={isOff}
      >
        {currentlyEditing ? (
          <React.Fragment>
            <TableCell padding="checkbox">
              <IconFormButton
                name="done"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                // isSubmitting={isSubmitting}
                handleClick={() => updateMealQty(userId)}
              />
            </TableCell>
            <TableCell padding="checkbox">
              <div className="table-btn--close">
                <IconButton
                  name="close"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  handleClick={handleCloseBtnClick}
                />
              </div>
            </TableCell>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TableCell padding="checkbox">
              <div className="table-btn--edit">
                <IconButton
                  name="edit"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  handleClick={e => handleEditBtnClick(e, userId)}
                />
              </div>
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              className={resize}
            />
          </React.Fragment>
        )}
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          className={resize}
        >
          {companyName}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="lunchQty"
              onChange={e => handleChange(e, 'lunchQty', userId)}
              value={lunch}
              className={textField}
            />
          ) : (
            `${lunch}`
          )}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="dinnerQty"
              onChange={e => handleChange(e, 'dinnerQty', userId)}
              value={dinner}
              className={textField}
            />
          ) : (
            `${dinner}`
          )}
        </TableCell>
        <TableCell align="right" className={resize}>
          {currentlyEditing ? (
            <TextField
              name="lateNightSnackQty"
              onChange={e => handleChange(e, 'lateNightSnackQty', userId)}
              value={lateNightSnack}
              className={textField}
            />
          ) : (
            `${lateNightSnack}`
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default withStyles(styles)(CateringTableRow);
