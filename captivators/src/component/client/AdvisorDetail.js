import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm'
import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import Footer from '../Footer';
import ScheduleForm from './ScheduleForm'
import Profile from '../../images/profile.png'
import API from '../../API'
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
       
   }
    
  }));

  
  export default function AdvisorDetail(props){
      const classes = useStyles()

      const [state, setState] = useState({
        name:'',
        email:'',
        street:'',
        city: '',
        state: '',
        zipcode:'',
        bio:''      })

      useEffect(()=>{
        var id = props.match.params.id
        API.post('auth/details')
        .then(response =>{
          var advisors = response.data
          advisors = advisors.filter((item)=>{
                if(item._id == id){
                    return item
                }
          })
          setState(advisors[0])
          console.log(advisors[0])
        })
      },[])

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
            {state.name}
          </Typography>
          </div>
          <div>
          <Typography variant="h8">
          {state.email_id}
          </Typography>
          </div><br/>
          <div>
          <Typography variant="body">
         {state.street} <br/>
          {state.city}, {state.state}
          </Typography>
          </div><br/>
        </Box>
   
        <Box className={classes.messageBox} display="flex" flexDirection="column" >
            <Paper className={classes.message}>
            <Typography  component="div">
                            <Box color="black" fontWeight="bold">
                               Bio
                        </Box>
                        </Typography>
            <Typography  component="div">
                            <Box color="grey" fontSize={15}>
                               {state.bio}
                        </Box>
                        </Typography>
            </Paper>
          </Box>

        </Box>
                 </Paper>
                  </Grid>
                  <Grid item sm={6} >
                  <ScheduleForm id={props.match.params.id}></ScheduleForm>    
                  </Grid>
              </Grid>
             <Footer/>
          </div>
      )
  }