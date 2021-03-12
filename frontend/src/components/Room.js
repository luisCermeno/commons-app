import {useState, useEffect} from 'react'
import { matchPath } from "react-router";
import history from '../history'
import Peer from 'peerjs'


let peer
let dataConnections = []

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

  //******DJANGO SERVER LOG*******
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
      if (action != 'leave') {
        setparticipants(json.participants)
        json.participants.forEach(par => {
          if (par.peerID != peerID){
            const newDataConnection = peer.connect(par.peerID,{metadata: {username: props.username}})
            newDataConnection.on('open',()=>{
              console.log(`New data connection open with ${par.username}!`)
              newDataConnection.on('data',data=>{
                console.log(data)
              })
            })
            newDataConnection.on('error', error=>{console.log(error)})

            dataConnections.push({peerID: par.peerID, dataConnection: newDataConnection})
            console.log('dataConnections:')
            console.log(dataConnections)
          }
        })
        // dataConnection = peer.connect()
        //call other participants
      }
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
  //**************************************
  //effect hooks
  useEffect(() => {
    console.log(`Room ${roomID}  mounted`)
    peer = new Peer(undefined, {
      host: '/',
      port: '3001'
    })
    peer.on('open', id => {
      console.log(`Peer connection open. ID: "${id}" . Listening for calls..`)
      logpeer('login', id)
    })
    peer.on('connection', dataConnection => {
      console.log(`New data connection from ${dataConnection.metadata.username}`)
      setparticipants(oldparticipants => [...oldparticipants,{username: dataConnection.metadata.username, peerID: dataConnection.peer}])
      dataConnection.on('data', data=>{
        console.log(data)
        setmessages(messages => [...messages,`${dataConnection.metadata.username}: ${data}`])
      })
      dataConnection.on('close', () => {
        console.log(`Data connection with ${dataConnection.metadata.username} has closed`)
        setparticipants(oldparticipants => oldparticipants.filter( (obj, index, arr) => { 
          return obj.peerID != dataConnection.peer;
        }))
    // var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    // var filtered = array.filter(function(value, index, arr){ 
    //     return value > 5;
    // });
    // //filtered => [6, 7, 8, 9]
    // //array => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      })
    })
    peer.on('disconnected', peerID => {
      console.log('Peer connection closed')
      logpeer('logout', peerID)
    })
    peer.on('error', err=>{console.log(err)})
    return () => {
      console.log(`Room ${roomID}  unmounted`)
      if (peer !== undefined){peer.destroy()}
    }
  }, [])

  useEffect(() => {
    console.log('participants has changed')
    console.log(participants)
  }, [participants])

  return (
    <div>
      <h2>Welcome to room {roomID}</h2>
      <div>
        <h3>Active users:</h3>
        <ul>
          {participants.map( (peer,index) => (<li key={index}>{peer.peerID} is {peer.username}</li>) )}
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
