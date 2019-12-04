import React, { useState } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button,
Snackbar, IconButton } from '@material-ui/core'
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
      background:  theme.palette.common.white,
      elevation: 5
  },

  textField: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  button:{
    '&:hover':{
        background: green[500]
      },
      background: green[700],
    marginBottom: theme.spacing(3)
  },
  heading:{
      background: grey[200],
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
  }

}));


export default function LoginForm() {
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

  const [login, setLogin] = useState({
      isLoggedIn: false,
      role: 0
  })

  const [snack, setSnack] = useState({
      open: false,
      message: ''
  })
  const handleChange = name => (event) => {
    console.log({ [name]: event.target.value })
    setState({ ...state, [name]: event.target.value });
    // if([name]=='instructor'){
    //     setState({ ...state, [name]: isChecked });
    // }

  }

  const handleSubmit = () =>{
      if(state.email == 'client' && state.password == '1234'){
        sessionStorage.setItem('token', '12312')
            setLogin({
                isLoggedIn: true,
                role: 1
            })
      }else if(state.email == 'advisor' && state.password == '1234'){
        sessionStorage.setItem('token', '12312')
        setLogin({
            isLoggedIn: true,
            role: 2
        })
      }else if(state.email == 'admin' && state.password == '1234'){
        sessionStorage.setItem('token', '12312')
        setLogin({
            isLoggedIn: true,
            role: 3
        })
      }else{
            setSnack({
                open: true,
                message: 'Invalid Id or Password!'
            })
      }

      
  }

  if(login.isLoggedIn){
      sessionStorage.setItem('isLoggedIn', true)
        if(login.role == 1){
            return(
            <Redirect to="/client">

            </Redirect>
            )
        }else if(login.role == 2){
            return(
            <Redirect to="/advisor"></Redirect>
            )
        }else{
            return(
            <Redirect to="/admin"></Redirect>
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
                LOGIN
              </Box>
            </Typography>
          </Box>
          </Paper>
        </div>
        <Box display="flex" justifyContent="center" style={{ width: '100%'}}>
        <form className={classes.container} onSubmit={handleSubmit}>
          <div>
            <TextField
              required  
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
              error={error.password}
              required
              id="password"
              label="Password"
              helperText={error.message}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.password}
              type="password"
              onChange={handleChange('password')}
            />
          </div>
        
          <div>
          <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
            <Button 
            variant="contained" 
            className={classes.button}
            type="submit"
            >
            
              Login
            </Button>
            </Box>
          </div>
        </form>
        </Box>
      </Paper>

      <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={snack.open}
                                autoHideDuration={2000}
                                variant="success"
                                onClose={() =>{ setSnack({open:false})}}
                                message={snack.message}
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={() =>{ setSnack({open:false})}}
                                    >
                                        <CloseIcon />
                                    </IconButton>,
                                ]}
                            ></Snackbar>

    </Container>
  )
}