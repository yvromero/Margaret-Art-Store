import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#3A64D8'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },


    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, rgba(255, 192, 203, 0.05) 30%, rgba(192, 192, 192, 0.05) 70%)', 
          color:'black',
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 20,

          ":hover": {
            // backgroundColor: 'rgba(0,0,0,0.05)',
            background: 'linear-gradient(45deg, rgba(255, 192, 203, 0.7) 30%, rgba(192, 192, 192, 0.7) 70%)', 
            transition: 'all 0.1s ease-in-out'
          }
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
    
  }
});