import { makeStyles } from '@material-ui/core/styles';

const navStyles = makeStyles((theme) => ({

  appBar:{
    background: theme.palette.colors.mainColor
  },

  menuButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
 
  inputRoot: {
    color: 'inherit',
  },

  elementText:{
    textDecoration:"none",
    color: theme.palette.colors.white
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    width: "100%",
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  menuContainer:{
    display:"flex",
  },

 

  MenuItem:{
    display: "inline-flex"
  },

  sectionMobile: {
    width:"100%",
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenu:{
    "& .MuiMenu-paper":{
      backgroundColor: theme.palette.colors.mainColor
    }
  },

  containerLanguages: {
    marginLeft: "auto",
    marginRight:"10px"
  },

  iconLanguages:{
    color:"white"
  },

  labelSelectLanguage: {
      color:"white",
    '.MuiFormLabel-root.Mui-focused':{
      color:"white",
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInputBase-input ':{
      color:"white"
    }
  },
  selectLanguage: {
    color:"white",
    borderRadius: '4px',
    boxShadow: '3px 1px 3px -1px rgba(0, 0, 0, 0.25)',
    ['@media (max-height:810px)']: {// eslint-disable-line no-useless-computed-key
      fontSize: '12px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '11px'
      },
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px'
    },
  }
}));

export default (navStyles)