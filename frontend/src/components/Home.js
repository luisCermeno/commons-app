import {useState} from 'react'

const Home = (props) => {
    const [roomID, setroomID] = useState('')
    const handleSubmit = e => {
      e.preventDefault()
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
        <h3>Create a room:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor='roomID'>Room ID:</label>
          <input name='roomID' placeholder='roomID' type='text' onChange={handleChange}/>
          <input type='submit' value='Create' disabled={(roomID === '')}/>
        </form>
        <h3>Join a room:</h3>

        </>
    )
}

export default Home;