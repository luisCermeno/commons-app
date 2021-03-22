import clsx from 'clsx';

import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from '../styles'

const CustomAppBar = (props) => {
  const classes = useStyles();

  return(
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: props.open,
    })}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: props.open,
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        The Commons
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default CustomAppBar;