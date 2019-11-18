import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Grid, Box, Toolbar, Typography, Button} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    
    root: {
        flexGrow: 1,
      },
      appBar: {
        padding: theme.spacing(2),
        background: grey[200]
      },
      title: {
        color: grey[800],  
        flexGrow: 1,
      },
      button:{
          textTransform: 'none'
      }
   
    
  }));

  
  export default function NavBar(props){
      const classes = useStyles()
      return(
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
         
            <Box style={{width:'100%'}} display="flex" flexDirection="row" justifyContent="space-between">
                <Box flexGrow={1}>
            <Typography variant="h6" className={classes.title}>
              Captivators
            </Typography>
            </Box>
            <Box>
            <Grid  container>
                <Grid xs={12} item>
            <Button className={classes.button}>Home</Button>
            <Button className={classes.button}>About us</Button>
            <Button className={classes.button}>Contact us</Button>
            <Button className={classes.button}>Help</Button>
           
         
            {
            props.isLoggedIn ?
            <Button className={classes.button}>Login</Button>
            :
            <Button className={classes.button}>Logout</Button>
            }
            
             </Grid>
               </Grid>
               </Box>
               </Box>
        </AppBar>
      </div>
      )
  }