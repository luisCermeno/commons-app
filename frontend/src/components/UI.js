import {useState} from 'react';

import {Grid} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import CustomAppBar from '../ui/CustomAppBar';
import CustomDrawer from '../ui/CustomDrawer';
import CustomBottomNavigation from '../ui/CustomBottomNavigation'

import useStyles from '../styles'

const UI = (props) => {
  // ******** STATE HOOKS ********
  const [open, setOpen] = useState(false);

  // ******** UTIL FUNCTIONS ********
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // ******** STYLING ************
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  // ******** RENDER ********
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
        style={{height: "85%"}}
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
