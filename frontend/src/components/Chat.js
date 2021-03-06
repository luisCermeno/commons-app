import {useEffect, useState} from 'react'
import Peer from 'peerjs'


//peer variable in global scope
let myPeer

const Chat = props => {
  const [userID, setuserID] = useState('')
  const [start, setstart] = useState(false)
  
  useEffect(() => {
    console.log('chat mounted')
    return () => {
      console.log('chat unmounted')
      if (myPeer !== undefined){myPeer.destroy()}
    }
  }, [])


  const handleStart = e=>{
    e.preventDefault()
    myPeer = new Peer(props.username, {
      host: '/',
      port: '3001'
    })
    myPeer.on('open', id => {
      console.log(`Peer connection open. ID: "${id}" . Listening for calls..`)
      setstart(true)
    })
    myPeer.on('disconnected', id => {
      console.log(`Peer connection closed. ID:  "${id}"`)
    })
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
      <form onSubmit={handleStart} >
        <input type='submit' value='Start connection' disabled={start}/>
      </form>
      <form onSubmit={handleStop}>
        <input type='submit' value='Stop connection'disabled={!start}/>
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
