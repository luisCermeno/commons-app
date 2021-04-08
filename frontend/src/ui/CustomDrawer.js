import clsx from 'clsx';
import {Link} from 'react-router-dom'

import {Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {useTheme } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DeckTwoToneIcon from '@material-ui/icons/DeckTwoTone';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';

import useStyles from '../styles'


const CustomDrawer = (props) => {
  // ******** STYLING ************
  const classes = useStyles();
  const theme = useTheme();
  let styles = {
    a: {
      textDecoration: "none", 
      color: "black",
    }
  }

  // ******** RENDER ********
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
          <Link to= '/' style={styles.a}>
            <ListItem button key='Home'>
              <ListItemIcon><DeckTwoToneIcon/></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link to= '/create'style={styles.a}>
            <ListItem button key='Create'>
              <ListItemIcon><BorderColorTwoToneIcon/></ListItemIcon>
              <ListItemText primary='Create' />
            </ListItem>
          </Link>

          <Link to={`/profile/${props.username}`} style={styles.a}>
            <ListItem button key='Student ID'>
              <ListItemIcon><ContactMailTwoToneIcon/></ListItemIcon>
              <ListItemText primary='My Student ID' />
            </ListItem>
          </Link>
          </List>
        <Divider />

        <List>
          <ListItem button key='Logout' onClick = {props.handle_logout} style={styles.a}>
            <ListItemIcon><MeetingRoomTwoToneIcon/></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
    </Drawer>
  )
}

export default CustomDrawer 