import {useState} from 'react'
import history from '../history'

import {Grid, Paper, TextField, Button, FormHelperText} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Create = (props) => {
  // ******** STATE HOOKS ********
  const [roomID, setroomID] = useState('')
  const [error, seterror] = useState('')
  const [description, setdescription] = useState('')
  const [loading, setloading] = useState(false)

  // ******** UTIL FUNCTIONS ********
  const handleSubmit = e => {
    setloading(true)
    e.preventDefault()
    //create rooom on server
    fetch(props.host + 'room/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        action: 'create',
        roomID: roomID,
        description: description,
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.error === undefined){
        history.replace(`/room/${roomID}`)
      }
      else seterror(json.error)
    })
  }
  const handleChange = e => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
        case 'roomID':
            setroomID(value)
            break
        case 'description':
            setdescription(value)
            break
        default:
            console.log('hanldechange error: no name for target')
    }
  }

  // ******** STYLING ************
  const marginFields = "2vh 0"
  // ******** RENDER ********
  return (
    <Grid item lg={6} xs ={12}>
      <Paper elevation={3} style={{padding: "2vh 2vw", textAlign: "center", width: "100%", borderRadius: "15px", margin: "0 auto"}}>
        <h3>Contribute to your school commons, start a group!:</h3>
        <h4>{error}</h4>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-full-width"
              label="Name:"
              placeholder=' "Mr. X Physics 230 Class" '
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ maxLength: 40 }}
              variant="outlined"
              name='roomID'
              onChange={handleChange}
              value={roomID}
              style={{width:"99%", margin: marginFields}}
            />
            <TextField
              id="outlined-full-width"
              label="Description:"
              placeholder=' "Mr.X former students club! The struggle is real!
                            join if you want the swag to pass the class" '
              helperText= "Tell what it is about in 250 characters"
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ maxLength: 250 }}
              variant="outlined"
              name='description'
              onChange={handleChange}
              value={description}
              style={{width:"99%", margin: marginFields}}
            />
            <div style={{ margin: marginFields}}>
            {loading?
              <CircularProgress style={{margin: "0 auto"}}/>
              :
              <Button style={{width:"100%"}} disabled={(roomID === '' || description === '')} type="submit" variant="contained" color="primary">Start group!</Button>
            }
              <FormHelperText style={{textAlign: "center"}}>
                Warning! If your group gets too popular you may not be able to delete it!
              </FormHelperText>
            </div>
          </form>
      </Paper>
    </Grid>
    
  )
}

export default Create