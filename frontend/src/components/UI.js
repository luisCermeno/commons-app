import {useState} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import CustomAppBar from '../ui/CustomAppBar';
import CustomDrawer from '../ui/CustomDrawer';
import CustomBottomNavigation from '../ui/BottomNavigation'

import useStyles from '../styles'

import {BottomNavigation, Grid} from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const UI = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // ******** STYLING ************
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar  open = {open} handleDrawerOpen = {handleDrawerOpen}/>
      {md? 
      <CustomDrawer {...props}  open = {open} handleDrawerClose = {handleDrawerClose}/>
      : 
      <></>
      }
      <main className={classes.content}>
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
      {!md?
       <CustomBottomNavigation {...props}/>
      : <></>
      }
    </div>
  );
}

export default UI;
