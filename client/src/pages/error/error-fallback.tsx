import type { FallbackProps } from 'react-error-boundary';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ErrorFallback = (props: FallbackProps) => {
  return (
    <>
      <Typography variant='h1' component='h2'>
        Something wrong
      </Typography>
      <div>
        <p>{t('other.something-wrong')}</p>
        {props.error && (
          <>
            <pre>{props.error.message}</pre>
          </>
        )}
        <div>
          <Button variant='outlined'>Back to home</Button>
        </div>
      </div>
    </>
  );
};
