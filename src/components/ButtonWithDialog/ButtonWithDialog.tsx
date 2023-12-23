import { Button } from '@mui/material';
import { useState } from 'react';

const ButtonWithDialog = (props: { children: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} />
      {open && props.children}
    </>
  );
};

export default ButtonWithDialog;
