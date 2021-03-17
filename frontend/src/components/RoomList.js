import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

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
    <div>
      <ul>
        {rooms.map(room =>
        (
          <div>
            <Link to={`/room/${room.roomID}`}>
              <li>{room.roomID}</li>
            </Link>
          </div>
        ) 
        )}
      </ul>
    </div>
  )
}

export default RoomList