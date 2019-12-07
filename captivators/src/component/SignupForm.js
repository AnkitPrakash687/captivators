import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Box, Container, TextField, Typography, Button, Snackbar, IconButton
  , Slide, Grid, LinearProgress,
} from '@material-ui/core'
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
  button: {
    '&:hover': {
      background: green[500]
    },
    background: green[700],
    margin: theme.spacing(2, 0, 5, 0)
  }

}));


export default function SignupForm() {
  const classes = useStyles()

  const [error, setError] = useState({
    email: false,
    number: false,
    password: false,
    confirmPassword: false,
    confirmPasswordMessage: '',
    emailMessage: ''
  })

  const [state, setState] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: ''
  })

  const [password, setPassword] = useState('')
  const [snack, setSnack] = useState({
    open: false,
    message: ''
  })
  const [passStrength, setPassStrength] = useState({
    value: 0, text: '', color: grey[100]
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    var data = state
    API.post('auth/signup', data)
      .then(response => {
        console.log('👉 Returned data:', response);
        console.log(response.data.code)
        if (response.data.code == 200) {
          setSnack({
            open: true,
            message: 'User registered sucessfully'
          })
          setState({
            name: '',
            email: '',
            number: '',
            password: '',
            confirmPassword: ''
          })
        } else {
          setSnack({
            open: true,
            message: 'User already registered'
          })
          setState({
            name: '',
            email: '',
            number: '',
            password: '',
            confirmPassword: ''
          })
        }
      })

  }

  const handleChange = name => (event) => {
    console.log({ [name]: event.target.value })

    if (name == 'password') {
      setPassword(event.target.value)
    } else {
      setState({ ...state, [name]: event.target.value });
      if ([name] == 'confirmPassword') {
        console.log(event.target.value + ' ' + state.password)
        if (event.target.value.length > 0 && (event.target.value !== password)) {
          setError({ ...error, confirmPassword: true, confirmPasswordMessage: 'Password do not match' })
        } else {
          setError({ ...error, confirmPassword: false, confirmPasswordMessage: '' })
        }
      }



      var regEmail = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
      if ([name] == 'email') {
        console.log(event.target.value, regEmail.test(event.target.value))
        if (event.target.value.length > 0 && !(regEmail.test(event.target.value))) {
          setError({ ...error, email: true, emailMessage: 'Valid format: xyz@g.com' })
        } else {
          setError({ ...error, email: false, emailMessage: '' })

        }
      }
    }
  }

  useEffect(() => {
    var strongPassRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})")
    var mediumPassRegex = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
    var weakPassRegex = RegExp('(?=.{6,})')

    if (strongPassRegex.test(password)) {
      setPassStrength({ value: 100, text: 'strong', color: 'primary' })
    } else if (mediumPassRegex.test(password)) {
      setPassStrength({ value: 60, text: 'medium', color: 'primary' })
    } else if (weakPassRegex.test(password)) {
      setPassStrength({ value: 30, text: 'weak', color: 'secondary' })
    } else {
      setPassStrength({ value: 10, text: '', color: grey[100] })
    }
  }, [password])
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

            <Grid container>
              <Grid item sm={6}>
              <TextField
                required
                error={(password.length > 0 && passStrength.value < 11) ? true : false}
                helperText={(password.length > 0 && passStrength.value < 11) ? 'Password should be minimun 6 character' : ''}
                id="password"
                label="Password"
                type="password"
                className={classes.textField}
                margin="dense"
                variant="outlined"
                value={password}
                onChange={handleChange('password')}
              />

              {passStrength.value > 10 &&
                //     <LinearProgress
                //       variant="determinate"
                //       value={passStrength.value}
                //       className={classes.passStrengthBar}
                //       color={passStrength.color}
                //     />

                // <Grid container style={{ marginBottom: 5 }}>
                //   <Grid item xs={4} sm={4}>
                //     <Box display="flex" flexDirection="column" >

                //       <Typography component="div">
                //         <Box fontSize={12} fontWeight="italic">
                //           Password Strength
                //   </Box>
                //       </Typography>
                //     </Box>
                //   </Grid>
                //   <Grid item xs={6} sm={6} m={1}>
                <div>
    <Typography style={{ marginLeft: '20px' }} component="div">
                    <Box fontSize={12}>
                      Password Strength
                    </Box>
                  </Typography>
                  <LinearProgress
                    style={{ width: '180px', marginLeft: '20px' }}
                    variant="determinate"
                    value={passStrength.value}
                    className={classes.passStrengthBar}
                    color={passStrength.color}
                  />
                  <Typography style={{ marginLeft: '20px' }} component="div">
                    <Box fontSize={12}>
                      {passStrength.text}
                    </Box>
                  </Typography>
                </div>

                //   </Grid>
                //   <Grid item xs={2} sm={2}>
                //     <Typography style={{ marginLeft: 5 }} component="div">
                //       <Box fontSize={12}>
                //         {passStrength.text}
                //       </Box>
                //     </Typography>
                //   </Grid>
                // </Grid>

              }
              </Grid>

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
            </Grid>

            
            <div>
              <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
                <Button
                  disabled={error.confirmPassword || error.email || (password.length > 0 && passStrength.value < 11)}
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