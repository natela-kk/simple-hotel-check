// import React, { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AppRoute } from '../../AppRoute';
import LogIn from '../../pages/LogIn/LogIn';
import Main from '../../pages/Main/Main';
import NotFound from '../NotFound/NotFound';
// import styles from './App.module.scss';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.LogIn}
          element={<LogIn />}
        />
        <Route
          path={AppRoute.Error}
          element={<NotFound />}
        />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
