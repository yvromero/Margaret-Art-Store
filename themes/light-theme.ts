import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#FEC99A'
    },
    info: {
      main: '#fff'
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
        color: 'info'
      },
      styleOverrides: {
        root: {
          // background: '#646464',
          // color:'black',
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 20,
          ":hover": {
           //background: 'linear-gradient(pink, 80%, purple)',
          //background: 'radial-gradient(pink, blue)',
          // background: 'linear-gradient(70deg, pink, purple)',
          background: 'linear-gradient(104.9deg, rgb(255, 95, 162) 2.3%, rgb(254, 201, 154) 92.7%)',
          
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