import imageUrl from '~/assets/404.gif';

export const PageNotFound = () => {
  return (
    <div className='p-3'>
      <h1 className='text-4xl text-center text-lightgrey'>Not Found</h1>
      <div className='text-center'>
        <img src={imageUrl} />
      </div>
      <p className='text-lg text-center'> We are sorry.</p>
    </div>
  );
};
