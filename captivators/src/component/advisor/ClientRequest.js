import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button,
Snackbar, IconButton, Divider } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';
import NavBar from './../NavBar'

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    root:{
      margin: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'row',
      borderStyle: 'solid',
      border: '1px',
      
    },
    media: {
     
    },
    button:{
      margin: theme.spacing(2,0,0,6),
      textTransform: 'none'
    },
    messageBox:{
        margin: theme.spacing(2,0,2,0),
        backgroundColor: theme.palette.common.white,
        display: 'flex',
        flexDirection: 'row',
        borderStyle: 'solid',
        border: '1px',
        
      },
    message:{
        minHeight: 150,
        minWidth: 200
    }
   
    
  }));

  
export default function ClientRequest(props){
    const classes = useStyles()
    return(
        <Box className={classes.root}>
             <Box style={{margin: '20px 10px 0px 10px'}} display="flex" flexDirection="column" >
            <img 
          className={classes.media}
          style={{
            width:'100px',
            height: '100px'
          }}
          src={props.profile}
        />
       
          <div>
          <Typography variant="h8">
            Ankit Prakash
          </Typography>
          </div>
          <div>
          <Typography variant="h8">
          (660)-324-5554
          </Typography>
          </div>
          <div>
          <Typography variant="body">
          Date: 11/17/2019
          </Typography>
          </div>
        </Box>

        <Box className={classes.messageBox} display="flex" flexDirection="column" >
            <Paper className={classes.message}>

            </Paper>
          </Box>
        
        <Box display="flex" flexDirection="column" >
            <Button variant="contained" color="primary" className={classes.button}>View Message</Button>
            <Button variant="contained" color="primary" className={classes.button}>Download Documents</Button>
            <Button variant="contained" color="secondary" className={classes.button}>Send Message</Button>
          </Box>
        </Box>
    )
}