import {useState} from 'react'
import history from '../history'
import {Paper, TextField, Button,FormHelperText} from '@material-ui/core';


const marginFields = "2vh 0"

const Create = (props) => {
  const [roomID, setroomID] = useState('')
  const [error, seterror] = useState('')
  const [description, setdescription] = useState('')
  
  const handleSubmit = e => {
      e.preventDefault()
      //create rooom on server
      fetch('http://localhost:8000/room/', {
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
        default:
            console.log('hanldechange error: no name for target')
    }
  }

  return (
    <Paper elevation={3} style={{padding: "2vh 2vw", textAlign: "center", width: "50%", borderRadius: "15px", margin: "0 auto"}}>
      <h3>Contribute to your school commons, start a group!:</h3>
      <h4>{error}</h4>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-full-width"
            label="Name:"
            style={{ margin: 8 }}
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
            style={{ margin: 8 }}
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
          <Button style={{width:"100%"}} disabled={(roomID === '' || description == '')} type="submit" variant="contained" color="primary">Start group!</Button>
          <FormHelperText style={{textAlign: "center"}}>
            Warning! If your group gets too popular you may not be able to delete it!
          </FormHelperText>
          </div>
        </form>
    </Paper>
  )
}

export default Create