/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { AuthProvider } from '../utils/context/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <ThemeProvider theme={original}>

          <AuthProvider>
            <ViewDirectorBasedOnUserAuthStatus
          // if status is pending === loading
          // if status is logged in === view app
          // if status is logged out === sign in page
              component={Component}
              pageProps={pageProps}
            />
          </AuthProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default MyApp;
