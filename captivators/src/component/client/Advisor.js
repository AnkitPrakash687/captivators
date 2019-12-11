import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button,
Snackbar, IconButton, Grid } from '@material-ui/core'
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
      overflow: 'hidden'
      
    },
  message:{
    padding: theme.spacing(1),
      height: 150,
      width: 200
  }
   
    
  }));

  
export default function Advisor(props){
    const classes = useStyles()

    const [redirect, setRedirect] = useState(false)
    const handleSelect = (event) =>{
      console.log('handleselect')
      event.preventDefault()
      setRedirect(true)
    }
if(redirect){
  var path = '/advisorDetail/'+props.id
  return <Redirect to={path}/>
}
    return(
     
        <Box className={classes.root}>
           <Grid container>
        <Grid item sm={3}>
            <img 
          className={classes.media}
          style={{
            width:'150px',
            height: '150px'
          }}
          src={props.profile}
        />
      </Grid>
      <Grid item sm={3}>
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
          {props.city}, {props.state}<br/>
          {props.zipcode}
          </Typography>
          </div><br/>
        </Box>
        </Grid>
        <Grid item sm={3}>
        <div style={{margin:'20px'}}className={classes.messageBox} display="flex" flexDirection="column" >
            <Paper  className={classes.message}>
            <Typography  component="div">
                            <Box color="black" fontWeight="bold">
                               Bio
                        </Box>
                        </Typography>
            <Typography  component="div">
                            <Box color="grey" fontSize={13}>
                               {props.bio}
                        </Box>
                        </Typography>
              
            </Paper>
          </div>
          </Grid>
          <Grid item sm={2}>
        <Box  p={2} display="flex" flexDirection="column" >
            <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={handleSelect}
            >Select</Button>
            <Button variant="contained" color="primary" className={classes.button}>Contact</Button>

          </Box>
          </Grid>
          </Grid>
        </Box>
       
    )
}