/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import React from 'react';
import {
  Separator,
} from 'react95';
import { ThemeProvider } from 'styled-components';

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';
// import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { AuthProvider } from '../utils/context/authContext';

// const GlobalStyles = createGlobalStyle`
//   ${styleReset}
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('ms_sans_serif') format('woff2');
//     font-weight: 400;
//     font-style: normal
//   }
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('ms_sans_serif_bold') format('woff2');
//     font-weight: bold;
//     font-style: normal
//   }
//   body, input, select, textarea {
//     font-family: 'ms_sans_serif';
//   }
//   `;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <ThemeProvider theme={original}>
          <Separator />

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
