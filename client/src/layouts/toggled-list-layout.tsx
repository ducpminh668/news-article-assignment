import cx from 'classnames';
import { ReactElement, useContext, useLayoutEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Grid from '~/components/icons/grid';
import List from '~/components/icons/list';
import Refresh from '~/components/icons/refresh';
import { ViewContext } from '~/contexts/view-context';
import { storage } from '~/utils/storage';

export default function ToggledListLayout({
  header,
  children
}: {
  header?: JSX.Element | JSX.Element[];
  children: ReactElement | ReactElement[];
}) {
  const { view, setView } = useContext(ViewContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const stored = storage.load('view-list') === 'list' ? 'list' : 'grid';
    if (stored !== view) {
      setView(stored);
    }
  }, []);

  const onChange = (value: 'list' | 'grid') => {
    if (value !== view) {
      setView(value);
      storage.save('view-list', value);
    }
  };

  const isList = useMemo(() => view === 'list', [view]);

  return (
    <>
      <div className='flex items-center justify-end'>
        <button
          className='gradient-button cursor-pointer px-4 py-4 rounded-lg border-none font-semibold text-white'
          onClick={() => navigate('/article/create')}
        >
          Create a new article
        </button>
      </div>
      <div
        className={cx(
          'flex mt-4 mb-3',
          header ? 'justify-between' : 'justify-end'
        )}
      >
        {header && <div>{header}</div>}
        <div className='flex text-primary gap-1'>
          <Refresh
            classes={cx('p-2 rounded cursor-pointer')}
            onClick={() => {
              window.location.reload();
            }}
          />
          <List
            color={isList ? '#fff' : '#292D32'}
            classes={cx('p-2 rounded cursor-pointer', isList && 'bg-primary')}
            onClick={() => onChange('list')}
          />
          <Grid
            color={!isList ? '#fff' : '#292D32'}
            classes={cx('p-2 rounded cursor-pointer', !isList && 'bg-primary')}
            onClick={() => onChange('grid')}
          />
        </div>
      </div>
      <div className={cx(view === 'grid' ? 'grid-article' : 'list-article')}>
        {children}
      </div>
    </>
  );
}
