import {Grid, Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

let gridstyle  = { border: "1px solid green"}
const Profile = (props) => {

  return(
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{width: "100%", padding: "3vh 4vw", borderRadius: "15px", margin: "0 auto"}}>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12} md={3} style={gridstyle}> 
                <Avatar style={{width: "100px", height: "100px", margin: "0 auto"}}>
                  <FaceTwoToneIcon/>
                </Avatar>
              </Grid>

              <Grid item xs={12} md={9} style={gridstyle}> 
                <div>{props.username}</div>
                <div>username</div>
                <div>school</div>
                <div>major</div>
                <div>year</div>
                <div>member since</div>
              </Grid>
              
              <Grid item xs={12} style={gridstyle}><p>description</p></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    
  )
}

export default Profile