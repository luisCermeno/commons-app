import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Paper} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const RoomList = (props) => {
// ******** STATE HOOKS ********
const [rooms, setrooms] = useState([])
const [loading, setloading] = useState(true)

// ******** EFFECT HOOKS *******
useEffect(() => {
  getRooms()
}, [])

// ******** STYLING ************
const theme = useTheme();
const sm = useMediaQuery(theme.breakpoints.up('sm'));
const md = useMediaQuery(theme.breakpoints.up('md'));
//xs and up:
let styles = {
  grid: {
    border: "solid 1px black",
    width: "100%",
    padding: "1vh 1vw",
  },
  paper: {
    padding: "1vh 1vw",
    textAlign: "center", 
    width: "100%",
    height: "100%", 
    borderRadius: "15px", 
    margin: "0 auto"
  },
  direction : "row",
}

//sm and up:
if (sm) {
  styles.grid = {...styles.grid, width: "50%"}
  styles.paper = {...styles.paper, width: "80%"}
  styles.direction = "column"
}
//lg and up:
if (md) {
  styles.grid = {...styles.grid, width: "25%"}
}

// ******** UTIL FUNCTIONS ********
const getRooms = () => {
  fetch('http://localhost:8000/getroom?getall=true', {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  })
  .then(res => res.json())
  .then(json => {
    console.log(json)
    setrooms(json.rooms)
    setloading(false)
  })
}

// ******** RENDER ********
  return (
      <Grid
      container
      direction= {styles.direction}
      justify="flex-start" //aligns horizontally
      alignItems="flex-start" //aligns vertically
      style={{border: "solid 1px black", height:"100%", width: "100%", overflow: "auto"}}
      >
        {loading?
          <CircularProgress style={{margin: "0 auto"}}/>
        :
          <>
          {rooms.map(room =>
            (
              <Grid item xs={12} style={styles.grid}>
                <Paper elevation={3} style={styles.paper}>
                  <Link 
                  to={`/room/${room.roomID}`}
                  style={{
                    textDecoration: "none", 
                    color: "black",
                  }}
                  >
                    <h3>{room.roomID}</h3>
                  </Link>
                  <p>{room.description}</p>
                  <ul>
                    {room.participants.map(participant => (<li>{participant.username}</li>))}
                  </ul>
                </Paper>
              </Grid>
            ) 
          )}
          </>
        }
      </Grid>
  )
}

export default RoomList