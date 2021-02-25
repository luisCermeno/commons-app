import {useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CustomAppBar from './ui/CustomAppBar';
import CustomDrawer from './ui/CustomDrawer';
import useStyles from './styles'


// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerClose: {
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     width: theme.spacing(7) + 1,
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9) + 1,
//     },
//   },
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

const Layout = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar classes = {classes} open = {open} handleDrawerOpen = {handleDrawerOpen}/>
      <CustomDrawer classes = {classes} open = {open} handleDrawerClose = {handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          content here
        </Typography>
      </main>
    </div>
  );
}

export default Layout;
