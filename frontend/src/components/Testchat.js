import {useEffect, useState} from 'react'
import Peer from 'peerjs'


//peer variable in global scope
let peer
let dataConnection
const Chat = props => {
  const [userID, setuserID] = useState('')
  const [start, setstart] = useState(false)
  const [dataChannelActive, setdataChannelActive] = useState(false)
  const [msg, setmsg] = useState('')


  useEffect(() => {
    console.log('chat mounted')
    return () => {
      console.log('chat unmounted')
      if (peer !== undefined){peer.destroy()}
    }
  }, [])


  const handleStart = e=>{
    e.preventDefault()
    peer = new Peer(props.username, {
      host: '/',
      port: '3001'
    })
    peer.on('open', id => {
      console.log(`Peer connection open. ID: "${id}" . Listening for calls..`)
      setstart(true)
    })
    peer.on('connection', dataConnection => {
      console.log('new connection!!!')
      dataConnection.on('data', data=>{
        console.log(data)
      })
    })
    peer.on('disconnected', id => {
      console.log(`Peer connection closed. ID:  "${id}"`)
    })
    peer.on('error', err=>{console.log(err)})
  }

  const handleStop = e =>{
    e.preventDefault()
    console.log('stopping connection')
    peer.disconnect()
    setstart(false)
    setdataChannelActive(false)
  }


  const handleChange = e=>{
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
        case 'userID':
            setuserID(value)
            break
        case 'msg':
            setmsg(value)
            break
        default:
            console.log('error on switch')
    }
  }

  const handleCall = e => {
    e.preventDefault()
    console.log(`Calling ${userID}....`)
    dataConnection = peer.connect(userID)
    dataConnection.on('open',()=>{
      console.log('Data channel open!')
      setdataChannelActive(true)
      dataConnection.on('data',data=>{
        console.log(data)
      })
    })
    dataConnection.on('error', error=>{console.log(error)})
  }

  const handleSend = e=> {
    e.preventDefault()
    console.log(`trying to send msg: "${msg}"`)
    dataConnection.send(msg)
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
      {(start & !dataChannelActive)?
        <form onSubmit={handleCall}>
          <label htmlFor="userID">Call:</label>
          <input type='text' placeholder='userID' name='userID'onChange={handleChange}/>
          <input type='submit' value='Call'/>
        </form>

      :
        <></>
      }
       {dataChannelActive?
          <>
          <div>Data Channel oppened successfuly with peer {userID}</div>
          <form onSubmit={handleSend}>
            <label htmlFor="text">Message:</label>
            <input type='text' name='msg' placeholder='type your message here' onChange={handleChange}/>
            <input type='submit' value='Send'/>
          </form>
          </>
        :
        <></>
        }
    </div>
  )
}


export default Chat
