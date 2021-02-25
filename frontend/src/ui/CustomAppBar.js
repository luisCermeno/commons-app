import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './useStyles'
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';


const CustomAppBar = (props) => {
  const classes = props.classes;

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
        Mini variant drawer
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default CustomAppBar;