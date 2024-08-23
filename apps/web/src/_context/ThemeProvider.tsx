'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, type PaletteColor, alpha, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import type React from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

declare module '@mui/material/styles' {
  interface Palette {
    gray: PaletteColor;
  }
  interface PaletteOptions {
    gray: PaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const theme = createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#111122',
      },
      text: {
        primary: '#eee',
      },
      gray: {
        main: '#A5A4A8',
        light: alpha('#A5A4A8', 0.5),
        dark: alpha('#A5A4A8', 0.9),
        contrastText: '#fff',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};
