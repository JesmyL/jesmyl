import { createTheme, PaletteColorOptions } from '@mui/material/styles';

export const createMaterialUITheme = createTheme;

declare module '@mui/material/styles' {
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger: string;
    };
  }

  interface PaletteOptions extends Record<ColorKeys, PaletteColorOptions> {
    x1: PaletteColorOptions;
  }
}

type ColorKeys = 'x1' | 'x2' | 'x3' | 'x4' | 'x5' | 'x6' | 'x7' | 'x8' | 'xKO' | 'xOK';
type ColorPalette = Record<ColorKeys, true>;

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends ColorPalette {
    x1: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides extends ColorPalette {
    x1: true;
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides extends ColorPalette {
    x1: true;
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides extends ColorPalette {
    x1: true;
  }
}

declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides extends ColorPalette {
    x1: true;
  }
}
