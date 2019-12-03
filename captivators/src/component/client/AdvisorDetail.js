import React, {useState} from 'react'
import NavBar from '../NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm'
import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import Footer from '../Footer';
import ScheduleForm from './ScheduleForm'
import Profile from '../../images/profile.png'
const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    root:{
      
    },
    container: {
        padding:theme.spacing(2)
    },
   bio:{
        padding: theme.spacing(2)
   },
   message:{
       minHeight: 500
   }
    
  }));

  
  export default function AdvisorDetail(){
      const classes = useStyles()
      return(
          <div>
              <NavBar/>
              <Grid className={classes.container} container>
                  <Grid item sm={6}>
                 <Paper
                 className={classes.bio}
                 >
                <Box className={classes.root}>
            <img 
          className={classes.media}
          style={{
            width:'150px',
            height: '150px'
          }}
          src={Profile}
        />
       
        <Box style={{margin: '20px 10px 0px 10px'}} display="flex" flexDirection="column" >
          <div>
          <Typography variant="h8">
            Ankit Prakash
          </Typography>
          </div>
          <div>
          <Typography variant="h8">
          (660)-324-5554
          </Typography>
          </div><br/>
          <div>
          <Typography variant="body">
          1121 N College Drive <br/>
          Maryville, MO
          </Typography>
          </div><br/>
        </Box>
   
        <Box className={classes.messageBox} display="flex" flexDirection="column" >
            <Paper className={classes.message}>
              Bio
            </Paper>
          </Box>

        </Box>
                 </Paper>
                  </Grid>
                  <Grid item sm={6} >
                  <ScheduleForm></ScheduleForm>    
                  </Grid>
              </Grid>
             <Footer/>
          </div>
      )
  }