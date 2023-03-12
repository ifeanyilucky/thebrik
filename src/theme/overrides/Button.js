// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
            borderRadius: '18px'
          }
        },
        sizeLarge: {
          height: 48
        },
        sizeMedium: {
          borderRadius: '12px',
          '&:hover': {
            borderRadius: '12px'
          }
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: 'none',
          borderRadius: '18px',
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        },

        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          borderRadius: '18px',
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    }
  };
}
