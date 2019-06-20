import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Icon from '../../assets/icons';
import AutoCompletePaper from './autoCompletePaper';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '2px solid #ee91054a',
    width: '160px',
    [theme.breakpoints.up('sm')]: {
      width: '250px',
    },
  },
  searchIcon: {
    width: '30px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '40px',
    },
  },
  inputInput: {
    padding: '1px 0 1px 0',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {},
  },
});

const SearchBar = ({ classes: { search, searchIcon, inputInput } }) => {
  const [inputValue, setInputValue] = useState(inputValue);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = ({ target: { value } }) => setInputValue(value);
  const handleOnKeyUp = e => setAnchorEl(anchorEl ? null : e.currentTarget);

  return (
    <React.Fragment>
      <div className={search}>
        <div className={searchIcon}>
          <Icon
            name="search"
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            fillOuter="#E8716F"
          />
        </div>
        <InputBase
          placeholder="Search…"
          className={inputInput}
          inputProps={{ 'aria-label': 'Search' }}
          onKeyUp={handleOnKeyUp}
          onChange={e => handleChange(e)}
          value={inputValue || ''}
        />
      </div>
      <AutoCompletePaper anchorEl={anchorEl} />
    </React.Fragment>
  );
};

export default withStyles(styles)(SearchBar);
