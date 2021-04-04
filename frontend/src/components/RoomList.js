import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Paper} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const RoomList = (props) => {
const [rooms, setrooms] = useState([])
const [loading, setloading] = useState(true)

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

//get Rooms on mount
useEffect(() => {
  getRooms()
}, [])


  return (
      <Grid
      container
      direction="column"
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
              <Grid item xs={12} style={{border: "solid 1px black", width: "25%"}}>
                <Paper elevation={3} style={{padding: "1vh 1vw", textAlign: "center", width: "80%",height: "100%", borderRadius: "15px", margin: "0 auto"}}>
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