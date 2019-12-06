import React, { useState } from 'react'
import NavBar from '../NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button, Snackbar, IconButton, Slide } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import API from '../../API'
import Cards from 'react-credit-cards';
import CreditCardInput from 'react-credit-card-input';
import 'react-credit-cards/es/styles-compiled.css';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
  

  },
  paper: {
      background: grey[100],
      elevation: 20
  },

  textField: {
    marginTop: theme.spacing(1),
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


export default function Payment(props) {
  const classes = useStyles()

  const [error, setError] = useState({
    expiry: false,
    number: false,
    password: false,
    confirmPassword: false,
    message:''
  })

  const [state, setState] = useState({
    name: '',
    email: '',
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    address: '',
    zipCode: '',
    country: ''
  })

  const [snack, setSnack] = useState({
    open: false,
    message: ''
  })

  const handleSubmit = (event) =>{
    event.preventDefault()
    var data = {id: props.id}
     API.post('auth/payment', data)
     .then(response =>{
      console.log('👉 Returned data:', response);
      console.log(response.data.code)
      if(response.data.code == 200){
        setSnack({
          open:true,
          message: 'Payment Successfull!'
        })
       
      }
     })
 
  }
  const handleChange = name => (event) => {
   // console.log({ [name]: event.target.value })
    var regCardNumber = RegExp("^[0-9]{0,16}$")
    var regExp = RegExp("^(0[1-9]|1[0-2])([0-9]{2})")
    var regExp1 = RegExp("^[0-9]{4}$")
    var regExpiry = RegExp("^[0-9]{0,4}$")
    if([name]=='number'){
    
      if([name]=='number' && regCardNumber.test(event.target.value)){
      
        setState({ ...state, [name]: event.target.value });
      }
    }else if([name] == 'expiry' && regExpiry.test(event.target.value)){
     console.log(event.target.value)
     
          setState({ ...state, [name]: event.target.value  });
        if(!regExp1.test(event.target.value) || !regExp.test(event.target.value)){
          setError({...error,expiry:true})
        }else{
          setError({...error,expiry:false})
        }

    }
    else if([name] == 'cvc' || [name] == 'name' || [name] == 'address' || [name] == 'zipCode'){
    setState({ ...state, [name]: event.target.value });
    }
   

  }
const handleClose = () => { 
  setSnack({ open: false }) 
  props.onClose()
}


  return (
    <Container component="main" className={classes.root}>
    
        <div>
          <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '0px 0px 0px 0px' }}>
            <Typography component="div">
              <Box color={grey[700]} fontWeight="bold" fontSize="h4.fontSize">
                Payment <br />
              </Box>
            </Typography>
          </Box>

        </div>

        <div id="PaymentForm">
        <Cards
          cvc={state.cvc}
          expiry={state.expiry}
          focused={state.focus}
          name={state.name}
          number={state.number}
        />
     
      </div>
        <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
          
        <form className={classes.container} onSubmit={handleSubmit}>
          <div>
          <TextField
              required
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
              id="name"
              label="Card Number"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.number}
              onChange={handleChange('number')}  
            />
          
          </div>


  
          <div>
          <TextField
              required
              id="name"
              label="Expiry Date(MM/YY)"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.expiry}
              error={error.expiry}
              helperText={error.expiry && 'invalid date'}
              onChange={handleChange('expiry')}
            />
            <TextField
              required
              type="password"
              id="name"
              label="cvc"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.cvc}
              onChange={handleChange('cvc')}
            />
          </div>
<div>
          <TextField
              required
              id="address"
              label="Billing Address"
              multiline
              row={3}
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.address}
              onChange={handleChange('address')}
            />
                  <TextField
              required
              id="zipCode"
              label="Zip Code"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={state.zipCode}
              onChange={handleChange('zipCode')}
            />
            </div>
          <div>
          <Box display="flex" justifyContent="center" style={{ width: '100%', padding: '20px 0px 0px 0px' }}>
            <Button type="submit" variant="contained" className={classes.button}>
              Pay
            </Button>
            </Box>
          </div>
        </form>
        </Box>
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
                    onClose={handleClose}
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