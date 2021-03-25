import {useState} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import CustomAppBar from '../ui/CustomAppBar';
import CustomDrawer from '../ui/CustomDrawer';

import useStyles from '../styles'

import background from '../img/background.png'

import {Grid} from '@material-ui/core';


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
      <CustomAppBar  open = {open} handleDrawerOpen = {handleDrawerOpen}/>
      <CustomDrawer {...props}  open = {open} handleDrawerClose = {handleDrawerClose}/>
      <main className={classes.content} style={{height: "100vh", backgroundImage: `url(${background})`}}>
        <div className={classes.toolbar} />
        <Grid
        container
        justify="center" //aligns horizontally
        alignItems="center" //aligns vertically
        style={{border: "dashed 1px red", height: "90%"}}
        >
          {props.children}
        </Grid>
      </main>
    </div>
  );
}

export default UI;
