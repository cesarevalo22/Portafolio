import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core'
import TranslationProvider from './Context/translation/TranslationProvider'

import AppRoutes from './Navigation/appRoutes';

function App() {

  const theme = createTheme({
    palette: {
      colors: {
        mainColor: "#653fb5"
      }
    }
  })

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TranslationProvider>
          <AppRoutes />
        </TranslationProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
