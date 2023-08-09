import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound } from '~/pages/error/error-not-found';
import ErrorPage from '~/pages/error/error-route';
import Form from '~/pages/form';
import List from '~/pages/list';
import HeaderLayout from '~/layouts/header-layout';
import { ViewProvider } from './contexts/view-context';

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <List />
      },
      {
        path: '/article',
        element: <List />
      },
      {
        path: '/article/create',
        element: <Form />
      },
      {
        path: '/article/:id',
        element: <Form />
      },
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]);

function App() {
  return (
    <>
      <ViewProvider>
        <RouterProvider router={router} />
      </ViewProvider>
    </>
  );
}

export default App;
