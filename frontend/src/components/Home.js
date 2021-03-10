import {useState} from 'react'
import history from '../history'

const Home = (props) => {
    const [roomID, setroomID] = useState('')
    const [error, seterror] = useState('')
    const handleSubmit = e => {
      e.preventDefault()
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
          history.push(`/room/${roomID}`)
        }
        else seterror(json.error)
      })
      //implement error handling here!!!
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
      <>
        <h1>{props.logged_in? `Welcome, ${props.username}`: 'Please Log In'}</h1>
        <h3>Create/Join a room:</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor='roomID'>Room ID:</label>
            <input name='roomID' placeholder='roomID' type='text' onChange={handleChange}/>
            <input type='submit' value='Join' disabled={(roomID === '')}/>
          </form>
        <h4>{error}</h4>
        </>
    )
}

export default Home;