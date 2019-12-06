import React, { useState } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button, Snackbar, IconButton
 , Slide} from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import API from '../API'
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    marginTop: theme.spacing(5),
    maxWidth: 700,
    marginBottom: theme.spacing(5)

  },
  paper: {
      background: grey[100],
      elevation: 20
  },

  textField: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
  },
  button:{
    '&:hover':{
      background: green[500]
    },
    background: green[700],
    margin: theme.spacing(2,0,5,0)
  }

}));


export default function SignupForm() {
  const classes = useStyles()

  const [error, setError] = useState({
    email: false,
    number: false,
    password: false,
    confirmPassword: false,
    confirmPasswordMessage:'',
    emailMessage:''
  })

  const [state, setState] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: ''
  })

  const [snack, setSnack] = useState({
    open: false,
    message: ''
  })
  const handleSubmit = (event) =>{
    event.preventDefault()
    var data = state
     API.post('auth/signup', data)
     .then(response =>{
      console.log('👉 Returned data:', response);
      console.log(response.data.code)
      if(response.data.code == 200){
        setSnack({
          open: true,
          message: 'User registered sucessfully'
        })
        setState({ 
          name: '',
        email: '',
        number: '',
        password: '',
        confirmPassword: ''})
      }else{
        setSnack({
          open: true,
          message: 'User already registered'
        })
        setState({ name: '',
        email: '',
        number: '',
        password: '',
        confirmPassword: ''})
      }
     })
 
  }
  const handleChange = name => (event) => {
    console.log({ [name]: event.target.value })
    setState({ ...state, [name]: event.target.value });
    if([name]=='confirmPassword'){
      console.log(event.target.value + ' ' + state.password)
        if(event.target.value.length > 0 && (event.target.value !== state.password)){
          setError({...error, confirmPassword:true, confirmPasswordMessage: 'Password do not match' })
        }else{
          setError({...error, confirmPassword:false, confirmPasswordMessage: '' })
        }
    }
    var regEmail = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    if([name] == 'email'){
      console.log(event.target.value, regEmail.test(event.target.value))
          if(event.target.value.length > 0 && !(regEmail.test(event.target.value))){
            setError({...error, email:true, emailMessage: 'Valid format: xyz@g.com' })
          }else{
            setError({...error, email:false, emailMessage: '' })

          }
    }

  }
  return (
    <Container component="main" className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <div>
          <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '50px 0px 0px 0px' }}>
            <Typography component="div">
              <Box color={grey[700]} fontWeight="bold" fontSize="h4.fontSize">
                Don't have an account? <br />
              </Box>

            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
            <Typography component="div">
              <Box color={grey[700]} fontWeight="bold" fontSize="h6.fontSize">
                Get Started
              </Box>
            </Typography>
          </Box>
        </div>
        <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
        <form className={classes.container} onSubmit={handleSubmit}>
          <div>
          <TextField
              reuired
              id="name"
              label="Name"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.name}
              onChange={handleChange('name')}
            />
            <TextField
            required
              error={error.email}
              id="email"
              label="Email"
              helperText={error.emailMessage}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.email}
              onChange={handleChange('email')}
            />
          </div>
  
          <div>
          <TextField
          required
              error={error.password}
              id="password"
              label="Password"
              type="password"
              helperText={error.message}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.password}
              onChange={handleChange('password')}
            />
            <TextField
            required
              error={error.confirmPassword}
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              helperText={error.confirmPasswordMessage}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
          </div>
          <div>
          <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
            <Button 
            disabled={error.confirmPassword || error.email}
            type="submit" 
            variant="contained" 
            className={classes.button}>
              Sign up
            </Button>
            </Box>
          </div>
        </form>
        </Box>
      </Paper>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        TransitionComponent={Slide}
        TransitionProps={
            { direction: "right" }
        }
        open={snack.open}
        autoHideDuration={2000}
        variant="success"
        onClose={() => { setSnack({ open: false }) }}
        message={snack.message}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => { setSnack({ open: false }) }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      ></Snackbar>
    </Container>
  )
}