'use client';
import { createTheme } from "@mui/material";
// noinspection ES6UnusedImports
import type {} from '@mui/x-date-pickers/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    action: {
      active: "rgba(255, 255, 255, 0.54)",
      hover: "rgba(255, 255, 255, 0.04)",
    },
    background: {
      paper: "#CAA378",
      default: "#CAA378",
    }
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: '#CAA378',
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        root: {
          '& .MuiPickersYear-yearButton.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }
      }
    },
    MuiPickersMonth: {
      styleOverrides: {
        root: {
          '& .MuiPickersMonth-monthButton.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }
      }
    }
  }
});

export default theme;