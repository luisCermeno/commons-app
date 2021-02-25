import {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomAppBar from '../ui/CustomAppBar';
import CustomDrawer from '../ui/CustomDrawer';
import useStyles from '../styles'

const UI = (props) => {
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
      <CustomDrawer {...props} classes = {classes} open = {open} handleDrawerClose = {handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default UI;
