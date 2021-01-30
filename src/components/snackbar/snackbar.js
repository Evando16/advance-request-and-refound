import React from 'react';
import {
  Snackbar,
  IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function CustomSnackbar({
  open, message, type, setSnackbar,
}) {
  // useEffect to get class using type variable
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false, message: '', type: '' });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={message}
      action={(
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      )}
    />
  );
}

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};
