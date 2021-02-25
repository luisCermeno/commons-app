import clsx from 'clsx';
import {Link} from 'react-router-dom'

import {useTheme } from '@material-ui/core/styles';
import {Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';


const CustomDrawer = (props) => {
  const classes = props.classes;
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
        <List>
          <Link to= '/'>
          <ListItem button key='Home'>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          </Link>
        </List>
        <List>
          <Link to='/profile'>
          <ListItem button key='User'>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText primary={props.username} />
          </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button key='Logout' onClick = {props.handle_logout}>
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>


    </Drawer>

  )

}

export default CustomDrawer 