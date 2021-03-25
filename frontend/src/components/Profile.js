import {Grid, Paper} from '@material-ui/core';


const Profile = (props) => {

  return(
    <Paper elevation={3} style={{padding: "3vh 4vw", textAlign: "center", width: "50%", borderRadius: "15px", margin: "0 auto"}}>
      <h1>Profile for {props.username}</h1>
    </Paper>
  )
}

export default Profile