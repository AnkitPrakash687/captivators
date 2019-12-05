import React, { useState, useEffect } from 'react'
import NavBar from './../NavBar'
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Box, Container, TextField, Typography, Button,
  Snackbar, IconButton, Slide, SnackbarContent
} from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    marginTop: theme.spacing(5),
    maxWidth: 350

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
  }

}));


export default function FindAdvisor() {
  const classes = useStyles()

  const [error, setError] = useState({
    email: false,
    number: false,
    password: false,
    confirmPassword: false,
    message: ''
  })

  const [state, setState] = useState({
    searchByLocation: '',
    searchByName: '',
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
useEffect(()=>{
  setRedirect(false)
})

  const handleMessageClose = () =>{
    setSnack({
      open: false
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
        if(state.searchByName == '' && state.searchByLocation == ''){
          setSnack({
            open: true,
            message: 'Any of the search fields required'
          })
        }else{
            setRedirect(true)
        }
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
                <Box color={grey[800]} fontWeight="bold" fontSize="h4.fontSize">
                  Find an Advisor
              </Box>
              </Typography>
            </Box>
          </Paper>
        </div>
        <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
          <form className={classes.container} onSubmit={handleSubmit}>
            <div>
              <TextField
                id="searchByLocation"
                label="Zip code, City or State"
                className={classes.textField}
                margin="dense"
                variant="outlined"
                value={state.searchByLocation}
                onChange={handleChange('searchByLocation')}
              />
            </div>
            <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
              <Typography component="div">
                <Box color={grey[800]} fontWeight="bold" fontSize="h8.fontSize">
                  OR
              </Box>
              </Typography>
            </Box>
            <div>
              <TextField
                id="searchByName"
                label="Name"
                helperText={error.message}
                className={classes.textField}
                margin="dense"
                variant="outlined"
                value={state.searchByName}
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

                  Search
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