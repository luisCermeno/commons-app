import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Paper, TextField, Button} from '@material-ui/core';


const RoomList = (props) => {
const [rooms, setrooms] = useState([])

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
  })
}

useEffect(() => {
  getRooms()
}, [])


  return (
      <Grid
      container
      justify="flex-start" //aligns horizontally
      alignItems="flex-start" //aligns vertically
      style={{border: "solid 1px black"}}
      >
        {rooms.map(room =>
        (
          <Grid item md={3} sm={12} style={{border: "solid 1px black"}}>
            <Paper elevation={3} style={{padding: "1vh 1vw", textAlign: "center", width: "80%",height: "30vh", borderRadius: "15px", margin: "0 auto"}}>
              <Link to={`/room/${room.roomID}`}>{room.roomID}</Link>
            </Paper>
          </Grid>
        ) 
        )}
      </Grid>
  )
}

export default RoomList