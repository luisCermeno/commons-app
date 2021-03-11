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
  const [participants, setparticipants] = useState([])
  const [messages, setmessages] = useState([])

  //log in room in django server
  const logroom = (action, peerID) => {
    fetch('http://localhost:8000/room/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        action: action,
        roomID: roomID,
        peerID: peerID,
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setparticipants(json.participants)
    })
  }

  //logpeer in django server 
  const logpeer = (action, peerID) => {
    if (action === 'logout') {logroom('leave', peerID)}
    fetch('http://localhost:8000/logpeer/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        action: action,
        username: props.username,
        peerID: peerID,
      })
    })
    .then(res => res.json())
    .then(json => {
      if (action === 'login') {logroom('join', peerID)}
      console.log(json)
    })
  }

  //effect hooks
  useEffect(() => {
    console.log(`Room ${roomID}  mounted`)
    console.log(`active participants: ${participants}`)
    peer = new Peer(undefined, {
      host: '/',
      port: '3001'
    })
    peer.on('open', id => {
      console.log(`Peer connection open. ID: "${id}" . Listening for calls..`)
      logpeer('login', id)
    })
    peer.on('connection', dataConnection => {
      console.log(`New connection from : ${dataConnection.peer}`)
      setparticipants(oldparticipants => [...oldparticipants,{username: dataConnection.peer, peerID: dataConnection.peer}])
      dataConnection.on('data', data=>{
        console.log(data)
        setmessages(messages => [...messages,`${dataConnection.peer}: ${data}`])
      })
    })
    peer.on('disconnected', id => {
      console.log(`Peer connection closed. ID:  "${id}"`)
      logpeer('logout', id)
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
          {participants.map( (peer,index) => (<li key={index}>{peer.peerID}</li>) )}
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
