import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Box, Container, Grid, Typography, Button,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Snackbar, IconButton, Divider, Dialog
} from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';
import NavBar from './../NavBar'
import Payment from './Payment'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import API from '../../API'
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    border: '1px',

  },
  media: {

  },
  button: {
    margin: theme.spacing(2, 0, 0, 0),
    textTransform: 'none'
  }


}));


export default function Appointment(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)
  const [render, setRender] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const handlePayment = () => {
    setOpen(true)
  }

  const handleClose = () => {

    setOpen(false)
    setRender(true)
  }

  const handlePaymentClose = () => {
    setOpenPayment(false)
  }

  const cancelappointment = (event) =>{
    event.preventDefault()
    API.post('auth/cancelappointment', {id: props.id})
    .then(response =>{
      if(response.data.code == 200)
      setRender(true)
    })
  }
  const handleDeleteClose = () =>{
    setDeleteConfirmation(false)
  }

  useEffect(() => {
    var paymentDate = new Date(props.paymentDate).toISOString()

  })

  if (render) {
    return <Redirect to='/client'></Redirect>
  }
  return (

    <Box className={classes.root}>
      <Grid container>
        <Grid item sm={4}>
          <img
            className={classes.media}
            style={{
              width: '150px',
              height: '150px'
            }}
            src={props.profile}
          />
        </Grid>
        <Grid item sm={4}>
          <Box style={{ margin: '20px 10px 0px 10px' }} display="flex" flexDirection="column" >
            <div>
              <Typography variant="h8">
                {props.name}
              </Typography>
            </div>
            <div>
              <Typography variant="h8">
                {props.email}
              </Typography>
            </div><br />
            <div>
              <Typography variant="body">
                {props.street} <br />
                {props.city}, {props.state}
              </Typography>
            </div><br />
            <div>
              <Typography variant="body">
                Appointment date: <br />{' ' + props.date}
              </Typography>
            </div>
          </Box>
        </Grid>

        <Box style={{ padding: '10px', marginLeft: '30px' }} display="flex" flexDirection="column" >
          <Button variant="contained" color="primary" className={classes.button}>Upload Documents</Button>
          {props.paid ?
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => { setOpenPayment(true) }}
            >Payment Details</Button> :
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handlePayment}
            >Pay</Button>
          }
          <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={()=>{setDeleteConfirmation(true)}}
          >Cancel Appointment</Button>
        </Box>

      </Grid>
      <Dialog disableBackdropClick={true}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}>
        <div>

          <Payment id={props.id} onClose={handleClose}></Payment>
        </div>
      </Dialog>

      <Dialog
        open={openPayment}
        onClose={handlePaymentClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Typography component="div">
                                    <Box color={grey[800]} fontWeight="bold" fontSize="h4.fontSize">
                                    <CheckCircleIcon style={{color: 'green'}}/>{' PAID'}
                                 </Box>
                                 
                                </Typography><br/>
                                <Typography component="div">
                                    <Box color={grey[800]} fontSize="h8.fontSize">
                                    Transcation ID: {'ZUSMO'+Math.floor((Math.random() * 1000000) + 10000)}
                                    </Box>
                                </Typography>
                                <Typography component="div">
                                    <Box color={grey[800]}  fontSize="h8.fontSize">
                                    Payment Date: {new Date(props.paymentDate).toUTCString()}
                                    </Box>
                                </Typography>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentClose} color="secondary">
            OK
                         </Button>

        </DialogActions>
      </Dialog>

      <Dialog
                        open={deleteConfirmation}
                        onClose={handleDeleteClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Warning"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Are you sure you want to cancel this appointment?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose} color="secondary">
                                NO
                         </Button>
                            <Button onClick={cancelappointment} color="primary">
                                YES
                        </Button>
                        </DialogActions>
                    </Dialog>
    </Box>


  )
}