import React, { useState } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'

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
    message:''
  })

  const [state, setState] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    occupation:'',
    confirmPassword: ''
  })
  const handleChange = name => (event) => {
    console.log({ [name]: event.target.value })
    setState({ ...state, [name]: event.target.value });
    // if([name]=='instructor'){
    //     setState({ ...state, [name]: isChecked });
    // }

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
        <form className={classes.container} >
          <div>
          <TextField
              id="name"
              label="Name"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.name}
              onChange={handleChange('name')}
            />
            <TextField
              error={error.email}
              id="email"
              label="Email"
              helperText={error.message}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.email}
              onChange={handleChange('email')}
            />
          </div>
          <div>
          <TextField
              error={error.number}
              id="phoneNumber"
              label="Phone Number"
              helperText={error.message}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.number}
              onChange={handleChange('number')}
            />
            <TextField
              id="occupation"
              label="Occupation"
              helperText={error.message}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.occupation}
              onChange={handleChange('occupation')}
            />
          </div>
          <div>
          <TextField
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
              error={error.confirmPassword}
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              helperText={error.message}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
          </div>
          <div>
          <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
            <Button variant="contained" className={classes.button}>
              Sign up
            </Button>
            </Box>
          </div>
        </form>
        </Box>
      </Paper>
    </Container>
  )
}