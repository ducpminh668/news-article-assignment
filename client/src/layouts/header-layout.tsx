import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import logoUrl from '~/assets/vite.svg';
import DarkModeButton from '~/components/dark-mod-button';
import Heart from '~/components/icons/heart';
import Search from '~/components/icons/search';

const style = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function HeaderLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
    }
  };

  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setOpen(false);
      navigate(`/article?keySearch=${inputRef.current?.value}&page=1&limit=20`);
    }
  };

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  useEffect(() => {
    window.addEventListener('keypress', handleKeypress);
    return () => {
      window.removeEventListener('keypress', handleKeypress);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', handleSearch);
    return () => {
      window.removeEventListener('keypress', handleSearch);
    };
  }, []);

  useEffect(() => {
    if (inputRef?.current?.value && !open) {
      inputRef.current.value = '';
    }
  }, [open]);

  return (
    <>
      <div className='container px-2 md:px-3 mx-auto'>
        <header
          id='header'
          className='py-4 pl-4 flex justify-between items-center sticky top-0 left-0 bg-[#f3f6f9] dark:bg-gray-900'
        >
          <div
            className='w-1/2 flex items-center cursor-pointer'
            onClick={() => navigate('/article')}
          >
            <img src={logoUrl} alt='logo' className='w-fit mr-4' />
            <span className='flex-grow text-3xl logo-text  dark:text-white'>
              Articles
            </span>
          </div>
          <div className='flex w-1/2 justify-end items-center'>
            <div
              className='icon mx-2 cursor-pointer border border-primary py-1 px-2 flex gap-2 rounded w-52 bg-white'
              onClick={onOpen}
            >
              <div>
                <Search />
              </div>
              <div>Search...</div>
            </div>
            <div className='icon mx-2  w-8 cursor-pointer'>
              <Heart />
            </div>
            <div className='icon mx-2 w-8 cursor-pointer'>
              <DarkModeButton />
            </div>
          </div>
        </header>
        <div className='flex-grow'>
          <Outlet />
        </div>
      </div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {/* <Fade in={open}> */}
        <Box sx={style}>
          <div className='flex relative h-16 gap-3 items-center border border-[#36BFB6]'>
            <div className='px-2 '>
              <Search color='#36BFB6' />
            </div>
            <div className='outline-none h-16 p-2 flex-grow '>
              <input
                type='text'
                className='outline-none h-full w-full'
                autoFocus
                ref={inputRef}
              />
            </div>
            <div className='hidden lg:visible lg:block text-sm font-medium bg-white rounded-sm border absolute top-1/2 right-2 px-1 -translate-y-1/2'>
              esc
            </div>
          </div>
        </Box>
        {/* </Fade> */}
      </Modal>
    </>
  );
}
