import React from 'react'
import {useState, useEffect, useRef} from 'react'

import {Grid, Paper, TextField} from '@material-ui/core';

import InputAdornment from "@material-ui/core/InputAdornment";
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import IconButton from "@material-ui/core/IconButton";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const Messages = props => {
  // ******** STATE HOOKS ********
  const [input, setinput] = useState('')
  // ******** REF HOOKS ********
  const listRef = useRef(null)
  // ******** EFFECT HOOKS ********
  //when receiving new messages as prop, scroll!
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [props.messages])

  const handleSubmit = e => {
    e.preventDefault()
    setinput('')
    props.handleSend(input)
  }

  // ******** STYLING ************
const theme = useTheme();
const md = useMediaQuery(theme.breakpoints.up('md'));
let styles = {
  gridTexts: {
    height:"85%", 
    border: "solid green 1px",
  },
  gridInput: {
    height:"10%", 
    border: "solid green 1px",
  },
  div_listitem : {
    self: {
      border: "1px brown solid", 
      maxWidth: "60%",
      marginLeft: "40%", 
      textAlign: "right"
    },
    incoming: {
      border: "1px brown solid", 
      maxWidth: "60%",
      marginRight: "40%"
    }
  },
  listitem : {
    self: {
      textAlign: "right"
    },
    incoming: {
      textAlign: "left"
    }
  },
}
//md and up:
if (md) {
  styles.gridTexts = {...styles.gridTexts, height:"90%"}
}

  // ******** RENDER ********
  return (
    <Paper elevation={3} style={{padding: "2vh 2vw", height: "100%", borderRadius: "15px"}}>
      <Grid container
      direction = "row"
      justify = "flex-start"
      alignItems = "strecth"
      style = {{height: "100%", border: "solid black 1px"}}
      >
        {!md?
        <Grid item xs={12} style = {{height:"5%", border: "solid green 1px", textAlign: "center", fontSize: "1.5em"}}>
          <b>{props.roomID}</b>
        </Grid>
        :<></>
        }
        <Grid item xs={12} style = {styles.gridTexts}>
          <List ref={listRef} style={{height: "100%", overflow: "auto"}}>
            {props.messages.map( (msg, index) => {
              let self
              if (msg.username == props.username) self = true
              else self = false
              return (
                <>
                {msg.username == 'Bot'?
                  <div style={{textAlign: "center", color: "gray"}}> {msg.body}</div>
                :
                  <div style={self? styles.div_listitem.self: styles.div_listitem.incoming}>
                    <ListItem key= {index} style={self? styles.listitem.self: styles.listitem.incoming}>
                      {!self?
                        <ListItemAvatar>
                          <Avatar>
                            <FaceTwoToneIcon />
                          </Avatar>
                        </ListItemAvatar>
                      :
                        <></>
                      }

                      <ListItemText
                        primary={!self? `${msg.username} : ${msg.body}`: msg.body}
                        secondary="Timestamp"
                        style= {{marginRight: "15px"}}
                      />

                      {self?
                        <ListItemAvatar>
                          <Avatar>
                            <FaceTwoToneIcon />
                          </Avatar>
                        </ListItemAvatar>
                      :
                        <></>
                      }
                    
                      {(!self && md)?
                      <ListItemSecondaryAction style={{border: "1px solid purple"}}>
                        <IconButton aria-label="reply">
                          <ReplyTwoToneIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                      : <></>
                      }
                    </ListItem>
                  </div>
                }
                </>
              )}
            )}
          </List>
        </Grid>

        <Grid item xs={12} style = {styles.gridInput}>
          <form onSubmit= {handleSubmit} autocomplete="off">
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message" 
              name="message"
              onChange={e => setinput(e.target.value)}
              value={input}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    disabled={(input === '')}
                  >
                    <SendTwoToneIcon></SendTwoToneIcon>
                  </IconButton>
                </InputAdornment>
              }}
            />
          </form>
          <h5>{props.error}</h5>
        </Grid>

      </Grid>
    </Paper>
  )
}
export default Messages
