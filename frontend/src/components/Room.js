import {useState, useEffect} from 'react'
import { matchPath } from "react-router";
import history from '../history'
import Peer from 'peerjs'


let peer
let dataConnection

const Room = props => {
  //get the room id matching the history path
  const roomID = matchPath(history.location.pathname, {
    path: "/room/:roomID",
    exact: true,
    strict: false
  }).params.roomID;

  //state hooks
  const [peers, setpeers] = useState([props.username])
  const [messages, setmessages] = useState([])


  //effect hooks
  useEffect(() => {
    console.log(`Room ${roomID}  mounted`)
    console.log(`active peers: ${peers}`)
    peer = new Peer(props.username, {
      host: '/',
      port: '3001'
    })
    peer.on('open', id => {
      console.log(`Peer connection open. ID: "${id}" . Listening for calls..`)
      
    })
    peer.on('connection', dataConnection => {
      console.log(`New connection from : ${dataConnection.peer}`)
      setpeers(peers => [...peers,dataConnection.peer])
      dataConnection.on('data', data=>{
        console.log(data)
        setmessages(messages => [...messages,`${dataConnection.peer}: ${data}`])
      })
    })
    peer.on('disconnected', id => {
      console.log(`Peer connection closed. ID:  "${id}"`)
    })
    peer.on('error', err=>{console.log(err)})
    return () => {
      console.log(`Room ${roomID}  unmounted`)
      if (peer !== undefined){peer.destroy()}
    }
  }, [])

  return (
    <div>
      <h2>Welcome to room {roomID}</h2>
      <div>
        <h3>Active users:</h3>
        <ul>
          {peers.map( (peer,index) => (<li key={index}>{peer}</li>) )}
        </ul>
      </div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map( (msg,index) => (<li key={index}>{msg}</li>) )}
        </ul>
      </div>
    </div>
  )
}

export default Room
