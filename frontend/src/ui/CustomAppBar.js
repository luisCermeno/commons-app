import clsx from 'clsx';

import {AppBar, Toolbar, IconButton} from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import useStyles from '../styles'
import jigsaw from '../img/jigsaw.png'
import logo from '../img/logocrop.png'

const CustomAppBar = (props) => {
  // ******** STYLING ************
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  // ******** RENDER ********
  return(
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: props.open,
    })}
  >
    <Toolbar className={classes.toolbar}>
      {md?
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: props.open,
          })}
        >
          <img alt="jigsaw" src={jigsaw} style={{width: "40px",display: "inline"}}/>
        </IconButton>
      :
        <img alt="jigsaw" src={jigsaw} style={{width: "40px",display: "inline"}}/>
      }
      <img alt="logo" src={logo} style={{height: "65px", display: "inline"}}></img>
    </Toolbar>
  </AppBar>
  )
}

export default CustomAppBar;