import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  bg: {
    height: '100%',
    backgroundImage: 'url(/images/login_bg.jpg)',
    backgroundSize: 'cover',
    overflow: 'auto'
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: '20%',
    left: '53%',
    width: 440
  },
  loginContent: {
    padding: 80
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  subTitle: {
    fontWeight: 600,
    fontSize: 14
  },
  formItem: {
    marginTop: theme.spacing(3)
  },
  formLabel: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  alert: {
    padding: 2,
    paddingBottom: 15,
    marginTop: -15,
    display: ' flex',
    justifyContent: 'center',
    color: theme.palette.danger
  },
  infoWrapper: {
    borderRadius: 5,
    position: 'sticky',
    top: '90%',
    left: '2%',
    width: '40%',
    maxHeight: '50%',
    display: 'block',
    paddingBottom: 15,
    overflow: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,.2)',
      outline: '1px solid slategrey',
      borderRadius: 15
    }
  },
  infoTitle: {
    display: 'flex',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  infoDescription: {
    color: 'white'
  },
  loading: {
    height: 140,
    width: '100%'
  },
  // Drawer
  drawerPaper: {
    width: '50%',
    padding: 50
  }
  // SignUp
}));
