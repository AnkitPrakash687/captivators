import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button,
Snackbar, IconButton, Divider } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';
import NavBar from '../NavBar'


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

  
export default function Advisor(props){
    const classes = useStyles()
    return(
        <Box className={classes.root}>
            <img 
          className={classes.media}
          style={{
            width:'150px',
            height: '150px'
          }}
          src={props.profile}
        />
        <Box style={{margin: '20px 10px 0px 10px'}} display="flex" flexDirection="column" >
          <div>
          <Typography variant="h8">
            {props.name}
          </Typography>
          </div>
          <div>
          <Typography variant="h8">
          {props.email}
          </Typography>
          </div><br/>
          <div>
          <Typography variant="body">
          {props.street} <br/>
          {props.city}, {props.state}
          </Typography>
          </div><br/>
        </Box>
        <Box className={classes.messageBox} display="flex" flexDirection="column" >
            <Paper className={classes.message}>
              Bio  <br/>
              {props.bio}
            </Paper>
          </Box>
        <Box display="flex" flexDirection="column" >
            <Button variant="contained" color="primary" className={classes.button}>Select</Button>
            <Button variant="contained" color="primary" className={classes.button}>Contact</Button>

          </Box>
        </Box>
    )
}