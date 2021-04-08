import clsx from 'clsx';

import {AppBar, Toolbar, IconButton} from '@material-ui/core';

import useStyles from '../styles'

import jigsaw from '../img/jigsaw.png'
import logo from '../img/logocrop.png'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const CustomAppBar = (props) => {
  const classes = useStyles();

  // ******** STYLING ************
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

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
          <img src={jigsaw} style={{width: "40px",display: "inline"}}/>
        </IconButton>
      :
        <img src={jigsaw} style={{width: "40px",display: "inline"}}/>
      }
      <img src={logo} style={{height: "65px", display: "inline"}}></img>
    </Toolbar>
  </AppBar>
  )
}

export default CustomAppBar;