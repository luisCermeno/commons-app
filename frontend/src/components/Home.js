import RoomList from './RoomList'
import {Grid, Paper} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const Home = (props) => {

// ******** STYLING ************
const theme = useTheme();
const sm = useMediaQuery(theme.breakpoints.up('sm'));
//xs and up:
let styles = {
  grid: {
    border: "solid 1px green",
  },
  gridRoomList: {
    height: "75%", 
    width: "100%"
  }
}
//sm and up:
if (sm) {
  styles.grid = {...styles.grid, margin: "4vh 0"}
  styles.gridRoomList = {...styles.gridRoomList, height: "60%"}
}

    return (
      <Grid 
      container
      justify="flex-start" //aligns horizontally
      alignItems="flex-start" //aligns vertically
      style={{border: "solid 1px blue", height: "100%"}}
      >
        <Grid item md={12} sm={12} style={styles.grid} >
          <Paper elevation={3} style={{padding: "1vh 1vw", textAlign: "center", borderRadius: "15px", margin: "0 auto"}}>
            <h1>{props.logged_in? `Welcome, ${props.username} 🎉`: 'Please Log In'}</h1>
            <p>🥇This week's most active groups in your school:</p>
          </Paper>
        </Grid>
        <Grid item md={12} sm={12} style={{...styles.grid, ...styles.gridRoomList}}>
          <RoomList/>
        </Grid>
      </Grid>
    )
}

export default Home;