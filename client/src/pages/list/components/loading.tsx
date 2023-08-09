import React from 'react';
import { v4 as uudiv4 } from 'uuid';
import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Bookmark from '~/components/icons/bookmark';

export default function RowLoading({ length = 10 }: { length?: number }) {
  return (
    <>
      {Array.from({ length }).map(() => (
        <React.Fragment key={uudiv4()}>
          <Card className='my-3 !shadow-lg'>
            <CardContent>
              <div className='flex my-2 items-center justify-between'>
                <div className=''>
                  <Skeleton variant='rectangular' width='100%' height={24} />
                </div>
                <div className='cursor-pointer'>
                  <Bookmark />
                </div>
              </div>
              <Typography gutterBottom variant='h5' component='h5'>
                <Skeleton variant='rectangular' width='100%' height={16} />
              </Typography>
              <div className='flex my-3 text-sm'>
                <Skeleton variant='rectangular' width='100%' height={60} />
              </div>
              <Divider />
              <Typography
                className='!my-3 text-3-lines '
                variant='body2'
                color='text.secondary'
              >
                <Skeleton variant='rectangular' width='100%' height={60} />
              </Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </>
  );
}
