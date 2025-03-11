import { muiTheme } from './theme';
import { createMaterialUITheme } from './theme.declares';

export const muiDarkThemePalette = createMaterialUITheme(
  {
    colorSchemes: {
      dark: true,
      light: true,
    },
    palette: {
      mode: 'dark',

      x1: { main: '#242a26' },
      x2: { main: '#3b4b40' },
      x3: { main: '#d5e6d6' },
      x4: { main: '#b2b9b1' },
      x5: { main: '#1a1c19' },
      x6: { main: '#d3e5d7' },
      x7: { main: '#b5f2c8' },
      x8: { main: '#fbfdf8' },
      xKO: { main: '#ec6969' },
      xOK: { main: '#9bec69' },
    },
  },
  muiTheme,
);
