import {useEffect, useState} from 'react'
import Peer from 'peerjs'



let myPeer
const Chat = props => {
  const [userID, setuserID] = useState('')
  const [start, setstart] = useState(false)
  
  useEffect(() => {
    console.log('chat mounted')
    return () => {
      console.log('chat unmounted')
      myPeer.destroy()
    }
  }, [])


  const handleStart = e=>{
    e.preventDefault()
    myPeer = new Peer(props.username, {
      host: '/',
      port: '3001'
    })
    myPeer.on('open', id => {
      console.log(`local peer opened with id "${id}". listening for connections..`)
    })
    setstart(true)
  }

  const handleStop = e=>{
    e.preventDefault()
    console.log('stopping connection')
    myPeer.disconnect()
    setstart(false)
  }


  const handleChange = e=>{
    setuserID(e.target.value)
  }
  const handleCall = e => {
    e.preventDefault()
    console.log(`Calling ${userID}....`)
  }
  return (
    <div>
      Chat here!:
      <form onSubmit={handleStart}>
        <input type='submit' value='Start connection'/>
      </form>
      <form onSubmit={handleStop}>
        <input type='submit' value='Stop connection'/>
      </form>
      {start?
      <form onSubmit={handleCall}>
        <label htmlFor="username">Call:</label>
        <input type='text' placeholder='userID' onChange={handleChange}/>
        <input type='submit' value='Call'/>
      </form>
      :
      <></>
      }
    </div>
  )
}


export default Chat
