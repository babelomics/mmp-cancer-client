import { createMuiTheme } from '@material-ui/core/styles';

// This code is used for add custom palette properties
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    danger: string;
  }
  interface PaletteOptions {
    danger: string;
  }
}

// This code is used for add custom theme properties
declare module '@material-ui/core/styles/createMuiTheme' {
  interface IButton {
    main?: string;
    dark?: string;
    text?: string;
    border?: {
      main?: string;
      dark?: string;
    };
  }
  interface Theme {
    // Custom properties
    buttons: {
      primary: IButton;
      secondary: IButton;
      default: IButton;
    };
    textfield: {
      background: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    // Optional custom properties
    buttons?: {
      primary: IButton;
      secondary: IButton;
      default: IButton;
    };
    textfield?: {
      background: string;
    };
  }
}

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00739F',
      light: '#00ADEF'
    },
    secondary: {
      main: '#59CD90'
    },
    danger: '#E34850'
  },
  buttons: {
    primary: {
      main: '#59CD90',
      dark: '#53BC85', //'#47A473',
      text: 'white'
    },
    secondary: {
      main: '#696969',
      dark: '#5B5B5B',
      text: 'white'
    },
    default: {
      main: 'white',
      dark: '#f2f2f2',
      text: 'black',
      border: {
        main: '#E8E8E8',
        dark: 'black'
      }
    }
  },
  textfield: {
    background: '#F3F3F4'
  },
  typography: {
    fontFamily: 'Roboto',
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:before': {
          borderColor: 'transparent'
        },
        '&:after': {
          borderColor: 'transparent'
        }
      }
    },
    MuiTextField: {
      root: {
        '& .MuiInput-underline:after': {
          borderBottomColor: 'transparent'
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
          '& fieldset': {
            borderColor: 'transparent'
          }
          // '&:hover fieldset': {
          //   borderColor: 'transparent'
          // },
          // '&.Mui-focused fieldset': {
          //   borderColor: 'transparent'
          // }
        },
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent'
        },
        '& .MuiOutlinedInput-multiline': {
          padding: 0,
          '& textarea': {
            padding: '18.5px 14px'
          }
        },
        '& .MuiFormHelperText-root': {
          whiteSpace: 'normal'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        // '& $notchedOutline': {
        //   borderColor: 'transparent'
        // },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
          borderWidth: 2
        }
        // '&$focused $notchedOutline': {
        //   borderColor: 'rgba(0, 0, 0, 0.23)'
        // }
      },
      notchedOutline: {}
    },
    MuiFab: {
      root: {
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#f0f0f0'
        },
        '&:hover:active': {
          boxShadow: 'none',
          backgroundColor: '#f0f0f0'
        }
      },
      sizeSmall: {
        width: 35,
        height: 35
      }
    }
  }
});

export default AppTheme;
