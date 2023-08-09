import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useState } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteArticle } from '~/services/article';
import { Alert, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function DeleteButton({
  id,
  title
}: {
  id: string;
  title: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteArticle(id), {
    onSuccess: () => {
      queryClient.resetQueries();
      navigate('/article');
    },
    onError: () => setIsError(true)
  });

  const onDelete = () => {
    mutate();
  };

  if (!id) {
    return <></>;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='border border-secondary px-4 py-[0.375rem] rounded dark:text-white'
        type='button'
      >
        Delete
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Warning'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure to delete <span className='font-bold'> {title}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className='px-4 py-[0.375rem] '
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <Button onClick={onDelete} variant='outlined' color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={() => setIsError(false)}
      >
        <Alert
          onClose={() => setIsError(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          Something went wrong. Please try again!
        </Alert>
      </Snackbar>
    </>
  );
}
