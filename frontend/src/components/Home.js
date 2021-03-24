import JoinCreate from './JoinCreate'
import RoomList from './RoomList'
import {Grid, Paper, TextField, Button} from '@material-ui/core';

const Home = (props) => {

    return (
      <Grid 
      container
      justify="flex-start" //aligns horizontally
      alignItems="flex-start" //aligns vertically
      style={{border: "solid 1px black"}}
      >
        <Grid item md={12} sm={12} style={{border: "solid 1px black", margin: "4vh 4vh"}} >
          <Paper elevation={3} style={{padding: "1vh 1vw", textAlign: "center", width: "30%", borderRadius: "15px", margin: "0 auto"}}>
            <h1>{props.logged_in? `Welcome, ${props.username} 🎉`: 'Please Log In'}</h1>
            <p>🥇This week's most active groups in your school:</p>
          </Paper>
        </Grid>
        <Grid item md={12} sm={12} style={{border: "solid 1px black", margin: "4vh 4vh"}}>
          <RoomList/>
        </Grid>
        <Grid item md={12} sm={12} style={{border: "solid 1px black", margin: "4vh 4vh"}}>
          <Paper elevation={3} style={{padding: "3vh 4vw", textAlign: "center", width: "50%", borderRadius: "15px", margin: "0 auto"}}>
          <JoinCreate/>
          </Paper>
        </Grid>
      </Grid>

    )
}

export default Home;