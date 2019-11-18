import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, IconButton, Toolbar, Typography, Button} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import { maxHeight } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    
    root: {
        flexGrow: 1,
      },
      appBar: {
          marginBottom: theme.spacing(2),
        background: grey[200],
        minHeight: 150,
        maxHeight: 400
      },
      title: {
        color: grey[800],  
        flexGrow: 1,
      },
      button:{
          textTransform: 'none'
      }
   
    
  }));

  
  export default function Footer(){
      const classes = useStyles()
      return(
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            
            <Typography variant="body" className={classes.title}>
              copyright. Captivators
            </Typography>
           
          </Toolbar>
        </AppBar>
      </div>
      )
  }