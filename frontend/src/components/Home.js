import {useState} from 'react'
import history from '../history'

const Home = (props) => {
    const [roomID, setroomID] = useState('')
    const [error, seterror] = useState('')
    const [mode, setmode] = useState('')


    const handleSubmit = e => {
      e.preventDefault()
      switch (mode){
        case 'create':
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
          break;
        case 'join':
          fetch(`http://localhost:8000/getroom/${roomID}`, {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(res => res.json())
          .then(json => {
            console.log(json)
            if (json.success) history.push(`/room/${roomID}`)
            else seterror(json.error)
          })
      }
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

    const handleMode = e => {
        setroomID('')
        setmode(e.target.name)
    }
    return (
      <>
        <h1>{props.logged_in? `Welcome, ${props.username}`: 'Please Log In'}</h1>
        {(mode=='')?
        <>
          <h3>Select an option</h3>
          <div><button name='create' onClick= {handleMode}>Create Room</button> or <button name='join' onClick= {handleMode}>Join Room</button></div>
        </>
        :<></>
        }

        {(mode=='create')?
        <>
          <h3>Create a room:</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor='roomID'>Room ID:</label>
              <input name='roomID' placeholder='roomID' type='text' onChange={handleChange}/>
              <input type='submit' value='Create' disabled={(roomID === '')}/>
            </form>
            <div>Do you already have a roomID? <button name='join' onClick= {handleMode}>Join room</button></div>
          <h4>{error}</h4>
        </>
        :<></>
        }

        {(mode=='join')?
        <>
          <h3>Join a room:</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor='roomID'>Room ID:</label>
              <input name='roomID' placeholder='roomID' type='text' onChange={handleChange}/>
              <input type='submit' value='Join' disabled={(roomID === '')}/>
            </form>
            <div>Want to initiate a discussion? <button name='create' onClick= {handleMode}>Create room</button></div>
          <h4>{error}</h4>
        </>
        :<></>
        }

      </>

    )
}

export default Home;