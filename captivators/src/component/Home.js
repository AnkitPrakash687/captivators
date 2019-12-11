import React, {useState} from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import { Grid } from '@material-ui/core';
import Footer from './Footer';
const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    root:{
      
    },
    paper: {
   
    },
   
    
  }));

  
  export default function Home(){
      const classes = useStyles()
      return(
          <div>
              <NavBar isLoggedIn={false}/>
              <Grid container>
                  <Grid item sm={8}>
                    <SignupForm/>
                  </Grid>
                  <Grid item sm={4} style={{marginTop: '20px'}}>
                      <LoginForm/>
                  </Grid>
              </Grid>
             <Footer/>
          </div>
      )
  }