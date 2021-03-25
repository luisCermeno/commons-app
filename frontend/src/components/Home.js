import RoomList from './RoomList'
import {Grid, Paper} from '@material-ui/core';

const Home = (props) => {

    return (
      <Grid 
      container
      justify="flex-start" //aligns horizontally
      alignItems="flex-start" //aligns vertically
      style={{border: "solid 1px blue", height: "100%"}}
      >
        <Grid item md={12} sm={12} style={{border: "solid 1px green", margin: "4vh 4vh"}} >
          <Paper elevation={3} style={{padding: "1vh 1vw", textAlign: "center", borderRadius: "15px", margin: "0 auto"}}>
            <h1>{props.logged_in? `Welcome, ${props.username} 🎉`: 'Please Log In'}</h1>
            <p>🥇This week's most active groups in your school:</p>
          </Paper>
        </Grid>
        <Grid item md={12} sm={12} style={{border: "solid 1px black", margin: "4vh 4vh"}}>
          <RoomList/>
        </Grid>
      </Grid>
    )
}

export default Home;