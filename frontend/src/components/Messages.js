import React from 'react'
import {useState, useEffect} from 'react'

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





const Messages = props => {
  const [input, setinput] = useState('')

  return (
    <Paper elevation={3} style={{padding: "2vh 2vw", textAlign: "center", height: "55vh", borderRadius: "15px", margin: "0 auto"}}>
      <Grid container
      direction = "row"
      justify = "flex-start"
      alignItems = "strecth"
      style = {{height: "100%", border: "solid black 1px"}}
      >
        <Grid item xs={12} style = {{height:"85%", border: "solid green 1px"}}>
          <List style={{height: "100%", overflow: "auto"}}>
            {props.messages.map( (msg, index) => {
              let self
              let style
              if (msg.username == props.username){
                self = true
                style = {border: "1px brown solid", width: "60%", margin: "0 0 0 40%", textAlign: "end"}

              } 
              else {
                self = false
                style = {border: "1px brown solid", width: "60%", margin: "0 40% 0 0"}
              }
              
              return (
                <div style={style}>
                  <ListItem key= {index} justify="flex-end">
                    <ListItemAvatar>
                      <Avatar>
                        <FaceTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${msg.username} : ${msg.body}`}
                      secondary="Timestamp"
                    />
                    {!self?
                    <ListItemSecondaryAction style={{border: "1px solid purple"}}>
                      <IconButton aria-label="reply">
                        <ReplyTwoToneIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    : <></>
                    }
                  </ListItem>
                </div>
              )}
            )}
          </List>
        </Grid>

        <Grid item xs={12} style = {{height:"15%", border: "solid green  1px"}}>
          <form onSubmit= {e => props.handleSend(e, input)}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message" 
              name="message"
              onChange={e => setinput(e.target.value)}
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
