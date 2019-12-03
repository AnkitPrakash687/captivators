import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Box, Container, TextField, Typography, Button,
  Snackbar, IconButton, Slide, SnackbarContent
} from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, MuiPickersUtilsProvider, TimePicker}  from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    


  },
  paper: {
    background: theme.palette.common.white,
    elevation: 5
  },

  textField: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  button: {
    '&:hover': {
      background: green[500]
    },
    background: green[700],
    marginBottom: theme.spacing(3)
  },
  heading: {
    background: grey[200],
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }, 
  messageBox:{
    margin: theme.spacing(2)
  
  },
  input:{
    display: 'none'
  },
  upload:{
    margin: theme.spacing(2)
  }

}));


export default function ScheduleForm() {
  const classes = useStyles()

  const [error, setError] = useState({
    email: false,
    number: false,
    password: false,
    confirmPassword: false,
    message: ''
  })

  const [state, setState] = useState({
    date: new Date(),
    time: new Date(),
  })

  const [snack, setSnack] = useState({
    open: false,
    message: ''
  })

  const [redirect, setRedirect] = useState(false)

  const handleChange = name => (event) => {
    console.log({ [name]: event.target.value })
    setState({ ...state, [name]: event.target.value });
    // if([name]=='instructor'){
    //     setState({ ...state, [name]: isChecked });
    // }

  }

  const handleDateChange = name => (date) => {

    setState({ ...state, [name]: date });
}

const [files, setFiles] = useState([])

useEffect(()=>{
  setRedirect(false)
})

  const handleMessageClose = () =>{
    setSnack({
      open: false
    })
  }
  const handleSubmit = () => {
        if(state.searchByName == '' && state.searchByLocation == ''){
          setSnack({
            open: true,
            message: 'Any of the search fields required'
          })
        }else{
            setRedirect(true)
        }
  }

  const handleFileChange = (event) => {
    //console.log(event.target.files[0])
    var targetFiles = event.target.files
    var fileArray = []
    for( var x=0; x<targetFiles.length; x++){
      console.log(targetFiles[x])
      fileArray.push(targetFiles[x])
    }
    setFiles(fileArray)
    console.log(fileArray)

  }
if(redirect){
  if(state.searchByName != ''){
 
   return (<Redirect  push  to={{
    pathname: "/searchResult",
    search: '?name='+state.searchByName
  }}></Redirect>)
  }else if(state.searchByLocation != ''){
    return (<Redirect  push  to={{
      pathname: "/searchResult",
      search: '?location='+state.searchByLocation
    }}></Redirect>
    )
  }
}

  return (
    <Container component="main" className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <div>
          <Paper className={classes.heading}>
            <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
              <Typography component="div">
                <Box color={grey[800]} fontWeight="bold" fontSize="h6.fontSize">
                  Schedule an Appointment
              </Box>
              </Typography>
            </Box>
          </Paper>
        </div>
        <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
          <form className={classes.container} onSubmit={handleSubmit}>
            <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                variant="normal"
                style={{
                  margin: '20px'
                }}
               format="MM/dd/yyy"
                margin="normal"
                id="date"
                label="Date"
                value={state.date}
                onChange={handleDateChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <TimePicker
                variant="normal"
                style={{
                  margin: '20px'
                }}
                margin="normal"
                id="time"
                label="Time"
                value={state.date}
                onChange={handleDateChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />


              </MuiPickersUtilsProvider>
            </div>
            <div>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
                onClick={(event) => event.target.value = ''}
              />
              <label htmlFor="contained-button-file">
                <Button className={classes.upload} variant="contained" color="primary" component="span">
                  Upload Documents
                </Button>
              </label>
              <ol>
              {
                files.map((file)=>{
                  return (
                    <li>
                    <Typography component="div">
                    <Box style={{margin: '0px 0px 0px 20px'}}color={grey[800]} fontWeight="bold" fontSize="h8.fontSize">
                      {file.name} ({file.size/1000 + ' kb'})
                  </Box>
                  </Typography>
                  </li>
                  )
                })
              }
              </ol>
            </div>
            <div>
              <TextField
                className={classes.messageBox}
                multiline
                rows={5}
                id="message"
                label="Message"
                fullWidth
                variant="outlined"
                value={state.message}
                type="text"
                onChange={handleChange('searchByName')}
              />
            </div>

            <div>
              <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
                <Button
                  variant="contained"
                  className={classes.button}
                  type="submit"
                >

                  Schedule Appointment
            </Button>
              </Box>
            </div>
          </form>
        </Box>
      </Paper>

 <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={
                        { direction: "left" }
                    }
                    open={snack.open}
                    autoHideDuration={2000}
                    variant="success"
                    onClose={handleMessageClose}
                    message={snack.message}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleMessageClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                >
                    <SnackbarContent style={snack.color}
                        message={<span >{snack.message}</span>}
                    />
                </Snackbar>

    </Container>
  )
}