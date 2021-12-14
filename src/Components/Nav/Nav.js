import React, { useContext } from 'react';

import { TranslationContext } from '../../Context/translation/TranslationContext'

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
  const classes = useStyles();
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
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}

    >


      <MenuItem> {translate('nav', 'home')} </MenuItem>
      <MenuItem> {translate('nav', 'about')} </MenuItem>
      <MenuItem> {translate('nav', 'front')} </MenuItem>
      <MenuItem> {translate('nav', 'back')} </MenuItem>
      <MenuItem> {translate('nav', 'documents')} </MenuItem>
      <MenuItem> {translate('nav', 'github')} </MenuItem>


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
                <MenuItem className={classes.MenuItem}> {translate('nav', 'home')} </MenuItem>
                <MenuItem className={classes.MenuItem}> {translate('nav', 'about')} </MenuItem>
                <MenuItem className={classes.MenuItem}> {translate('nav', 'front')} </MenuItem>
                <MenuItem className={classes.MenuItem}> {translate('nav', 'back')} </MenuItem>
                <MenuItem className={classes.MenuItem}> {translate('nav', 'documents')} </MenuItem>
                <MenuItem className={classes.MenuItem}> {translate('nav', 'github')} </MenuItem>
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