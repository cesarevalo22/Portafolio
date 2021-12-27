import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { TranslationContext } from '../../Context/translation/TranslationContext'
import { Navigate } from '../../Common/Common'
import { paths } from '../../Config/ConfigPaths'

import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  MenuList,
  Menu,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './StylesNav'


export default function NavBar() {

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [languageAnchorEl, setlanguageAnchorEl] = React.useState(null);

  const { translate, langCode, appLanguages, setLanguage, updateTranslate, setCookieLang } = useContext(TranslationContext)


  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setlanguageAnchorEl(null);
  };


  const handleLanguageMenuOpen = (event) => {
    setlanguageAnchorEl(event.currentTarget);
  };

  const onLanguageSelect = (e) => {
    let languageObj = appLanguages.filter(item => (item.code === e.target.value))
    setLanguage(languageObj[0])
    setCookieLang('stam_lang', e.target.value, { path: '/' });
    updateTranslate(JSON.parse(localStorage.getItem('lng-data')))
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const classes = useStyles();

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.mobileMenu}

    >
      <Link className={classes.elementText} to={{ pathname: paths.home }} >
        <MenuItem> {translate('nav', 'home')} </MenuItem>
      </Link>
      <Link className={classes.elementText} to={{ pathname: paths.aboutMe }}>
        <MenuItem> {translate('nav', 'about')} </MenuItem>
      </Link>
      <Link className={classes.elementText} to={{ pathname: paths.frontEnd }}>
        <MenuItem> {translate('nav', 'front')} </MenuItem>
      </Link>
      <Link className={classes.elementText} to={{ pathname: paths.backEnd }}>
        <MenuItem> {translate('nav', 'back')} </MenuItem>
      </Link>
      <Link className={classes.elementText} to={{ pathname: paths.documents }}>
        <MenuItem> {translate('nav', 'documents')} </MenuItem>
      </Link>
      <Link to={{pathname: paths.gitHub}}>
      <a className={classes.elementText} href={paths.gitHub} target="_blanck">
      <MenuItem> {translate('nav', 'github')} </MenuItem>
      </a>
      </Link>
    </Menu>
  );



  const languageMenuId = 'language-menu';
  const languageMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}

    >

      {appLanguages.map((item) => {
        return <MenuItem> {item.code} </MenuItem>
      })}
    </Menu>
  );

  const formControl = (
    <FormControl id="selectorLanguage" className={classes.containerLanguages}>
      <InputLabel className={classes.labelSelectLanguage}>
        <LanguageIcon className={classes.iconLanguages} />
      </InputLabel>
      <Select
        value={langCode.code}
        onChange={onLanguageSelect}
        className={`${classes.selectLanguage}`}
      >
        {appLanguages.map(item => (
          <MenuItem key={item._id} value={item.code} selected={item.code === langCode.code}>
            {item.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )




  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar} >
        <Toolbar>

          <div className={classes.sectionDesktop}>
            <div className={classes.menuContainer}>
              <MenuList>
                <Link className={classes.elementText} to={{ pathname: paths.home }}>
                  <MenuItem className={classes.MenuItem}> {translate('nav', 'home')} </MenuItem>
                </Link>
                <Link className={classes.elementText} to={{ pathname: paths.aboutMe }}>
                  <MenuItem className={classes.MenuItem}> {translate('nav', 'about')} </MenuItem>
                </Link>
                <Link className={classes.elementText} to={{ pathname: paths.frontEnd }}>
                  <MenuItem className={classes.MenuItem}> {translate('nav', 'front')} </MenuItem>
                </Link>
                <Link className={classes.elementText} to={{ pathname: paths.backEnd }}>
                  <MenuItem className={classes.MenuItem}> {translate('nav', 'back')} </MenuItem>
                </Link>
                <Link className={classes.elementText} to={{ pathname: paths.documents }}>
                  <MenuItem className={classes.MenuItem}> {translate('nav', 'documents')} </MenuItem>
                </Link>
                <a className={classes.elementText} href={paths.gitHub} target="_blanck">
                  <MenuItem className={classes.MenuItem}> {translate('nav', 'github')} </MenuItem>
                </a>
              </MenuList>
            </div>

            {formControl}

          </div>


          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {formControl}




          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {languageMenu}

    </div>
  );
}