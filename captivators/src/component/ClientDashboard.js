import React, { useState } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import { Paper, Box, Container, TextField, Typography, Button,
    Snackbar, IconButton } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import Footer from './Footer';
import Appointment from './client/Appointment'
import Profile from './../images/profile.png'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    root: {
        
        margin: theme.spacing(5),
        maxWidth: 700
    },
    paper: {
         background: grey[100],
    },
    heading:{
        padding: theme.spacing(2)
    }

}));


export default function ClientDashboard() {
    const classes = useStyles()
    const [snack, setSnack] = useState({
        open: false,
        message: ''
    })
    var isLoggedIn = sessionStorage.getItem('isLoggedIn')
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} />
            <Container component="main" className={classes.root}>
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
                       <Appointment profile={Profile}></Appointment>
                       <Appointment profile={Profile}></Appointment>
                    </Box>
                </Paper>

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