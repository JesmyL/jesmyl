import { muiTheme } from './theme';
import { createMaterialUITheme } from './theme.declares';

export const muiLightThemePalette = createMaterialUITheme(
  {
    colorSchemes: {
      dark: true,
      light: true,
    },
    palette: {
      mode: 'light',

      x1: { main: '#eaf1e9' },
      x2: { main: '#d5e8d5' },
      x3: { main: '#122217' },
      x4: { main: '#414840' },
      x5: { main: '#fbfdf8' },
      x6: { main: '#f8fbf4' },
      x7: { main: '#2d995a' },
      x8: { main: '#fbfdf8' },
      xOK: { main: '#47bb00' },
      xKO: { main: '#ec6969' },
    },
  },
  muiTheme,
);
