import React, { useState } from 'react';
import Solicitation from './pages/solicitation';
import CustomSnackbar from './components/snackbar/snackbar';

export default function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });

  return (
    <>
      {/* needs to be general in the application */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        setSnackbar={setSnackbar}
      />
      <Solicitation setSnackbar={setSnackbar} />
    </>
  );
}
