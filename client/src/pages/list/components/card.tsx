import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { memo, useRef } from 'react';
import { useNavigate } from 'react-router';
import Bookmark from '~/components/icons/bookmark';
import { IArticle } from '~/entities/article';
import { getOffsetDays } from '~/utils/date-time';

interface ICardArticle extends IArticle {}

function CardArticle(props: ICardArticle) {
  const navigate = useNavigate();
  const timeZone = useRef(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <Card
      className='!shadow-lg min-h-[264px] cursor-pointer dark:text-white dark:bg-gray-600'
      onClick={() => navigate(`/article/${props._id}`)}
    >
      <CardContent>
        <div className='flex my-2 items-center justify-between'>
          <div className='flex my-2 items-center'>
            <Typography>{timeZone.current}</Typography>
            <span className='mx-3'>-</span>
            <Typography>{getOffsetDays(props.date)}</Typography>
          </div>
          <div className='cursor-pointer'>
            <Bookmark />
          </div>
        </div>
        <Typography
          gutterBottom
          variant='h5'
          component='h5'
          className='text-ellipsis'
        >
          {props.title}
        </Typography>
        <div className='flex my-3 text-sm'>
          <div className='pr-3 border-r text-ellipsis dark:text-white'>
            1 COMPANY MENTIONED
          </div>
          <div className='uppercase pl-3 text-ellipsis dark:text-white'>
            AUTO-SUMMARISED BY {props.publisher}
          </div>
        </div>
        <Divider />
        <Typography
          className='!my-3 text-3-lines '
          variant='body2'
          color='text-secondary dark:text-white'
        >
          {props.summary}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default memo(CardArticle);
