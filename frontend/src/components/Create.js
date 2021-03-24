import {useState} from 'react'
import history from '../history'
import {Paper, TextField, Button} from '@material-ui/core';


const Create = (props) => {
  const [roomID, setroomID] = useState('')
  const [error, seterror] = useState('')
  
  const handleSubmit = () => {
      //create rooom on server
      fetch('http://localhost:8000/room/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          action: 'create',
          roomID: roomID,
        })
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.error === undefined){
          history.replace(`/room/${roomID}`)
        }
        else seterror(json.error)
      })
  }

  const handleChange = e => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
        case 'roomID':
            setroomID(value)
            break
        default:
            console.log('hanldechange error: no name for target')
    }
  }

  return (
    <Paper elevation={3} style={{padding: "3vh 4vw", textAlign: "center", width: "50%", borderRadius: "15px", margin: "0 auto"}}>
      <h3>Contribute to your school commons, start a group!:</h3>
        <form onSubmit={(e)=>e.preventDefault}>
          <label htmlFor='roomID'>Room ID:</label>
          <input name='roomID' placeholder='roomID' type='text' onChange={handleChange}/>
        </form>
        <div>
            <button onClick={handleSubmit} disabled={(roomID === '')} >Create</button>
        </div>
      <h4>{error}</h4>
    </Paper>
  )
}

export default Create