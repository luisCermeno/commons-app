import {useState, useEffect} from 'react'

const RoomList = (props) => {
const [rooms, setrooms] = useState([])

const getRooms = () => {
  fetch('http://localhost:8000/getroom?getall=true', {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

useEffect(() => {
  getRooms()
}, [])


  return (
    <div>
      <ul>
        {rooms.map(room =>(<li>{room.roomID}</li>) )}
      </ul>
    </div>
  )
}

export default RoomList