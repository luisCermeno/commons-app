import {useState, useEffect} from 'react'
import {matchPath} from "react-router";
import history from '../history'
import Peer from 'peerjs'

// ******** GLOBAL CONSTANTS *********
let peer // stores the local peer object
let dataConnections = [] //stores all the data channel
                         //with all the peers

const Room = props => {
  // ******** CONSTANTS *********
  const roomID = matchPath(history.location.pathname, {
    path: "/room/:roomID",
    exact: true,
    strict: false
  }).params.roomID;

  // ******** STATE HOOKS ********
  const [participants, setparticipants] = useState([])
  const [messages, setmessages] = useState([])
  const [msg, setmsg] = useState('')
  const [error, seterror] = useState('')

  // ******** EFFECT HOOKS ********
  // onMount:
  useEffect(() => {
    // create a new peer object for local participant
    peer = new Peer(undefined, {
      host: '/',
      port: '3001'
    })
    // when the window is suddenly closed , destoy peer object
    window.onunload = (e) => { if (peer !== undefined) peer.destroy() }
    // when the connection is established, signal django server(peer login)
    peer.on('open', id => djangoLogPeer('login', id))
    // when the connection is closed, signal django server(peer logout)
    peer.on('disconnected', peerID => djangoLogPeer('logout', peerID))
    // when there is a error, log it to the console
    peer.on('error', error => console.log(error))
    // when local peer receives a new connection from remote peer...
    peer.on('connection', dataConnection => {
      // update participants state
      setparticipants(oldparticipants => [...oldparticipants,{username: dataConnection.metadata.username, peerID: dataConnection.peer}])
      // push the data channel obtained to the global constant
      dataConnections.push({peerID: dataConnection.peer, dataConnection: dataConnection})
      // when a message is received from that data channel, update the state
      dataConnection.on('data', data => setmessages(messages => [...messages, createMsgObj(dataConnection.metadata.username,data)]))
      // when the data channel is closed update participants state 
      dataConnection.on('close', () => {
        setparticipants(oldparticipants => oldparticipants.filter( obj => { return obj.peerID != dataConnection.peer } ))
      })
    })
    // when component is unmounted, destroy peer
    return () => { if (peer !== undefined) peer.destroy() }
  }, [])

  //****** DJANGO SERVER SIGNALING *******
  // djangoLogPeer function
  // Objective: logs in/out a peer in the
  // django server to its respective room
  const djangoLogPeer = (action, peerID) => {
    // Log in/out the peer in the django server
    // (destroy or create the peer in the database)
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
        roomID: roomID,
      })
    })
    .then(res => res.json()).then(json => console.log(json))
    // After creating the peer object, fetch the room data from server
    .then( () => {if (action === 'login') djangoGetRoom(peerID)})
  }

  // djangoGetRoom function
  // Objective: Pull room data from the server (active participants,
  // message history, etc and updates the state of the component)
  const djangoGetRoom = (peerID) => {
    fetch(`http://localhost:8000/getroom?roomID=${roomID}`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
        //With the response, update the participants
        //and messages state
        setparticipants(json.participants)
        setmessages(json.messages)
        //Call each participant in the response.
        //(establish a new connection)
        json.participants.forEach(par => {
          //Exclude self peer
          if (par.peerID != peerID){
            // call the peer and get the data channel
            const newDataConnection = peer.connect(par.peerID,{metadata: {username: props.username}})
            // push the data channel obtained to the global constant
            dataConnections.push({peerID: par.peerID, dataConnection: newDataConnection})
            // when the connection is established...
            newDataConnection.on('open',() => {
              // when a message is received from the data channel, update the state
              newDataConnection.on('data',data => setmessages(messages => [...messages, createMsgObj(par.username,data)]))
            })
            // when the data channel is closed update participants state 
            newDataConnection.on('close', () => {
              setparticipants(oldparticipants => oldparticipants.filter( obj => { return obj.peerID != par.peerID } ))
            })
            // when there is a error, log it to the console
            newDataConnection.on('error', error => console.log(error))
          }
        })
    })
  }

  // ******** UTIL FUNCTIONS ********
  // getTimestamp function
  // Objective: returns a string of the current date
  const getTimestamp = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  }

  // createMsgObj function
  // Objective: takes an username and body and returns
  // an object that stores all the info about
  // that message
  const createMsgObj = (username, body) => {
    return {
      username: username,
      body: body,
      timestamp: getTimestamp()
    }
  }

  // handleSend function
  // Objective: Sends a message to a remote peer
  // updates the message state, and post
  // the message to django server
  const handleSend = e => {
    e.preventDefault()
    //post message to django server
    fetch('http://localhost:8000/message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        roomID: roomID,
        username: props.username,
        body: msg,
      })
    })
    //log the response to console
    .then(res => res.json()).then(json => console.log(json))
    //update messages in the DOM
    setmessages(messages => [...messages, createMsgObj(props.username, msg)])
    //send message to each data channel in the global constant
    dataConnections.forEach(obj => obj.dataConnection.send(msg))
  }

  // ******** RENDER ********
  return (
    <div>
      <h2>Welcome to room {roomID}, {props.username}</h2>
      <div>
        <h3>Active users:</h3>
        <ul>
          {participants.map( (peer,index) => (<li key={index}>{peer.username}</li>) )}
        </ul>
      </div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map( (obj,index) => (<li key={index}>{obj.username}: {obj.body}</li>) )}
        </ul>
      </div>
      <div>
        <h3>Send Message:</h3>
        <form onSubmit= {handleSend}>
          <input onChange = {e => setmsg(e.target.value)} type='text' placeholder='Type your message'></input>
          <input  type='submit' value='Send' disabled={(msg === '')}/>
        </form>
        <h5>{error}</h5>
      </div>
    </div>
  )
}

export default Room
