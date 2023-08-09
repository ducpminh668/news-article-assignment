import { TextareaAutosize } from '@mui/base';
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import Back from '~/components/icons/back';
import {
  DEFAULT_FORMAT_DATE,
  NO_CACHE_TIME,
  RFC3339_FORMAT_DATE_Z
} from '~/constants/time';
import articleSchema, { IArticle } from '~/entities/article';
import { createArticle, getArticle, uploadArticle } from '~/services/article';
import { formatFnsDate } from '~/utils/date-time';
import DeleteButton from './components/delete-button';

export default function Form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: response,
    isFetching,
    isLoading
  } = useQuery(['get-detail'], () => getArticle(id || ''), {
    cacheTime: NO_CACHE_TIME,
    staleTime: NO_CACHE_TIME,
    enabled: !!id
  });

  const formik = useFormik({
    initialValues: {
      date: dayjs(
        formatFnsDate(
          new Date(response?.data.article.date || '').toString(),
          DEFAULT_FORMAT_DATE
        )
      ),
      title: response?.data?.article.title || '',
      summary: response?.data?.article.summary || '',
      publisher: response?.data?.article.publisher || ''
    },
    onSubmit: (values) => {
      mutate({
        ...values,
        _id: id || '',
        date: formatFnsDate(values.date.toString(), RFC3339_FORMAT_DATE_Z)
      } as IArticle);
    },
    validationSchema: articleSchema,
    enableReinitialize: true
  });

  const {
    errors,
    touched,
    submitCount,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    resetForm
  } = formik;

  const { mutate, isLoading: isSubmitting } = useMutation(
    (payload: IArticle) => {
      if (id) {
        return uploadArticle(payload);
      }
      return createArticle(payload);
    },
    {
      onSuccess: () => {
        resetForm();
        queryClient.resetQueries();
        navigate('/article');
      }
    }
  );

  if ((isLoading || isFetching) && id) {
    return (
      <div className='h-full flex justify-center items-center'>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <>
      <form id='article-form' onSubmit={formik.handleSubmit}>
        <div className='px-2 flex items-center justify-between'>
          <Typography
            variant='h4'
            component='h4'
            className='flex items-center dark:text-white'
          >
            <Back
              classes='mr-4 cursor-pointer'
              onClick={() => navigate('..')}
            />{' '}
            {id ? response?.data.article.title : 'Create a new article'}
          </Typography>
          <div className='flex items-center gap-4'>
            <DeleteButton
              id={id || ''}
              title={response?.data?.article.title || ''}
            />
            <button
              className='!text-white border-primary px-4 py-[0.375rem] bg-primary rounded font-medium'
              type='submit'
              disabled={isSubmitting}
            >
              {!isSubmitting && id ? 'Update' : 'Create'}
              {isSubmitting && <CircularProgress size={20} />}
            </button>
          </div>
        </div>
        <Card sx={{ width: '100%' }} className='mt-3 p-4'>
          <CardContent>
            <Grid>
              <div className='text-lg font-medium '>General Info</div>
            </Grid>
            <Grid className='my-4'>
              <div>
                Article title <span className='text-red-500'>*</span>
              </div>
              <TextField
                id='art-title'
                className='md:w-1/2 w-full'
                name='title'
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.title && (touched.title || submitCount > 0)}
                helperText={
                  !!errors.title && (touched.title || submitCount > 0)
                    ? errors.title
                    : ''
                }
              />
            </Grid>

            <Grid className='my-4'>
              <div>
                Article Summary <span className='text-red-500'>*</span>
              </div>
              <div className='md:w-1/2 w-full min-h-[300px]'>
                <TextareaAutosize
                  name='summary'
                  value={values.summary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  minRows={14}
                  maxRows={30}
                  className={cx(
                    'border h-full w-full p-2',
                    !!errors.summary && (touched.summary || submitCount > 0)
                      ? 'border border-red-500'
                      : 'border'
                  )}
                />
              </div>

              {!!errors.summary && (touched.summary || submitCount > 0) ? (
                <div className='text-xs text-red-500 my-2'>
                  {errors.summary}
                </div>
              ) : (
                ''
              )}
            </Grid>

            <Grid className='my-4'>
              <div>
                Article date <span className='text-red-500'>*</span>
              </div>
              <DatePicker
                value={values.date}
                onChange={(newValue) => {
                  setFieldValue('date', newValue);
                }}
              />
            </Grid>

            <Grid className='my-4'>
              <div>
                Publisher Of Article <span className='text-red-500'>*</span>
              </div>
              <TextField
                id='art-publisher'
                className='md:w-1/2 w-full'
                name='publisher'
                value={values.publisher}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  !!errors.publisher && (touched.publisher || submitCount > 0)
                }
                helperText={
                  !!errors.publisher && (touched.publisher || submitCount > 0)
                    ? errors.publisher
                    : ''
                }
              />
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
