import {useState, useEffect, useRef} from 'react'
import {matchPath} from "react-router";
import history from '../history'

import Peer from 'peerjs'

import {Grid, Paper} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

import Messages from '../components/Messages'

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
  const [error, seterror] = useState('')
  const [description, setdescription] = useState('')
  const [loading, setloading] = useState(true)
  
  // ******** REF HOOKS ********
  const MessagesRef = useRef(null)
  
  // ******** EFFECT HOOKS ********
  // onMount:
  useEffect(() => {
    // Create a new peer object for local participant:
        // For this app, peer server is hosted online by third party PeerJS
        // To host it locally and improve response speed:
        // 1. Install the Peerjs server:  
        //`npm i -g peer`  
        // 2. Run the Peerjs server on port 3001:  
        //`peerjs --port 3001`
        // 3. Give arguments to peer object:
        // peer = new Peer(undefined, {
        //   host: '/',
        //   port: '3001'
    // })
    peer = new Peer()
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
      setmessages(messages => [...messages, createMsgObj('Bot',`${dataConnection.metadata.username} joined the group!`)])
      // push the data channel obtained to the global constant
      dataConnections.push({peerID: dataConnection.peer, dataConnection: dataConnection})
      // when a message is received from that data channel, update the state
      dataConnection.on('data', data => setmessages(messages => [...messages, createMsgObj(dataConnection.metadata.username,data)]))
      // when the data channel is closed update participants state 
      dataConnection.on('close', () => {
        setparticipants(oldparticipants => oldparticipants.filter( obj => { return obj.peerID !== dataConnection.peer } ))
        setmessages(messages => [...messages, createMsgObj('Bot',`${dataConnection.metadata.username} left the group`)])
      })
    })
    // when the window is suddenly closed , destroy peer object
    window.onunload = (e) => { if (peer !== undefined) peer.destroy() }
    // when component is unmounted, destroy peer
    return () => {
      if (peer !== undefined) {
        props.setactive_peer('')
        peer.destroy()
      }
    }
    // eslint-disable-next-line 
  }, [])

  //****** DJANGO SERVER SIGNALING *******
  // djangoLogPeer function
  // Objective: logs in/out a peer in the
  // django server to its respective room
  const djangoLogPeer = (action, peerID) => {
    // Log in/out the peer in the django server
    // (destroy or create the peer in the database)
    fetch(props.host + 'logpeer/', {
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
    .then(res => res.json())
    .then(json => {
      console.log(json)
      props.setactive_peer(peerID)
    })
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
        if (json.success) {
          setloading(false)
          //With the response, update the participants
          //and messages state
          setdescription(json.description)
          setparticipants(json.participants)
          setmessages(json.messages)
          //Call each participant in the response.
          //(establish a new connection)
          json.participants.forEach(par => {
            //Exclude self peer
            if (par.peerID !== peerID){
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
                setparticipants(oldparticipants => oldparticipants.filter( obj => { return obj.peerID !== par.peerID } ))
              })
              // when there is a error, log it to the console
              newDataConnection.on('error', error => seterror(error))
            }
          })
        }
    })
  }

  // ******** UTIL FUNCTIONS ********
  // getTimestamp function
  // Objective: returns a string of the current date
  const getTimestamp = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var today = new Date();
    var date = monthNames[today.getMonth()] + " " + today.getDate() + " " + today.getFullYear();
    var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    var dateTime = date +', '+ time;
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
  const handleSend = input => {
    //post message to django server
    fetch(props.host + 'message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        roomID: roomID,
        username: props.username,
        body: input,
      })
    })
    //log the response to console
    .then(res => res.json()).then(json => console.log(json))
    //update messages in the DOM
    setmessages(messages => [...messages, createMsgObj(props.username, input)])
    //send message to each data channel in the global constant
    dataConnections.forEach(obj => obj.dataConnection.send(input))
  }

  // ******** STYLING ************
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  let styles = {
    grid: {
      height: "100%", 
      padding: "1vh 1vw"
    },

  }
  let direction = "row"
  //md and up:
  if (md) {
    direction = "column"
    styles.grid = {...styles.grid, width: "65vw"}
  }

  // ******** RENDER ********
  return (
    <>
    <Grid
    container
    direction = {direction}
    justify="flex-start"
    alignItems="stretch"
    style={{height: "100%"}}
    >
      {md?
      <Grid item md={5} xs={12} style={{width: "25vw", padding: "1vh 1vw"}}>
        <Paper elevation={3} style={{padding: "1vh 1vw", textAlign: "center", height: "100%",  borderRadius: "15px", margin: "0 auto"}}>
          <h2>{roomID}</h2>
          {loading?
            <CircularProgress style={{margin: "0 auto"}}/>
          :
            <div style={{height: "70%",overflow: "auto"}}>
              <p>{description}</p>
            </div>
          }
        </Paper>
      </Grid>
      : <></>
      }
      {md?
        <Grid item md={7} xs={12} style={{width: "25vw",  padding: "1vh 1vw"}}>
        <Paper elevation={3} style={{padding: "2vh 2vw", height: "100%", textAlign: "center",borderRadius: "15px"}}>
          <h3 ref={MessagesRef}>Active users:</h3>
          {loading?
            <CircularProgress style={{margin: "0 auto"}}/>
          :
            <List style= {{height: "80%",overflow: "auto"}}>
              {participants.map( (peer,index) => (
                <ListItem key={index} button>
                  <ListItemAvatar>
                    <Avatar>
                      <FaceTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText id={peer.username} primary={peer.username} />
                </ListItem>
              ))}
            </List>
          }
        </Paper>
        </Grid>
      : <></>
      }

      <Grid item md={12} style={styles.grid}>
          <Messages messages={messages} handleSend={handleSend} error={error} username={props.username} roomID={roomID} loading={loading}/>
      </Grid>
    </Grid>
    </>
  )
}

export default Room
