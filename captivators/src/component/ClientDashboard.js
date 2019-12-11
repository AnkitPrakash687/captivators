import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import { Paper, Box, Container, TextField, Typography, Button,
    Snackbar, IconButton, Grid } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import Footer from './Footer';
import Appointment from './client/Appointment'
import Profile from './../images/profile.png'
import CloseIcon from '@material-ui/icons/Close';
import FindAdvisor from './client/FindAdvisor';
import API from '../API';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    root: {
        
     marginTop: theme.spacing(2),
     marginBottom: theme.spacing(2)
    },
    paper: {
         background: grey[100],
    },
    heading:{
        padding: theme.spacing(2)
    }

}));


export default function ClientDashboard() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn')
    const classes = useStyles()
    const [snack, setSnack] = useState({
        open: false,
        message: ''
    })

    const [state, setState] = useState([])

   useEffect(()=>{
       var data = {
           email: sessionStorage.getItem('token')
       }
       var appointments = []
        API.post('auth/getschedule', data)
        .then(response =>{
            
            if(response.data.code == 200){
                var schedule = response.data.data
                console.log(schedule)
                setState(schedule)
                       var data ={
                            name: schedule.name,
                            street: schedule.street,
                            email: schedule.email_id,
                            city: schedule.city,
                            state: schedule.state,
                            zipcode: schedule.zipcode,
                            date: schedule.date,
                            paid: schedule.paid
                       }
          
            }
        })
       
   }, [])

   
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} /> 
            <Container component="main" className={classes.root}>
                <Grid container >
                    <Grid item xs={12} sm={8}>
                <Paper elevation={5} className={classes.paper}>
                    <div>
                        <Paper className={classes.heading}>
                            <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
                                <Typography component="div">
                                    <Box color={grey[800]} fontWeight="bold" fontSize="h4.fontSize">
                                        Your Appointments
              </Box>
                                </Typography>
                            </Box>
                        </Paper>
                    </div>
                    
                    <Box display="flex" flexDirection="column"justifyContent="center" style={{ width: '100%' }}>
                        {
                            state.map((item)=>{
                                return <Appointment 
                                profile={Profile}
                                id={item._id}
                                bio={item.bio}
                                name={item.name}
                                email={item.email_id}
                                city={item.city}
                                state={item.state}
                                street={item.street}
                                zipcode={item.zipcode}
                                paymentDate={item.paymentDate}
                                date={(new Date(item.date)).toUTCString().replace('GMT', '')}
                                paid={item.paid}></Appointment>
                            })
                        }
                      
                    </Box>
                </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                <FindAdvisor></FindAdvisor>
                </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={snack.open}
                    autoHideDuration={2000}
                    variant="success"
                    onClose={() => { setSnack({ open: false }) }}
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
            <Footer />
        </div>
    )
}