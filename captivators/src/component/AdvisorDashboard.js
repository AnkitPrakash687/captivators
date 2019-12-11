import React, { useState } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import { Paper, Box, Container, TextField, Typography, Button,
    Snackbar, IconButton } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import Footer from './Footer';
import ClientRequest from './advisor/ClientRequest'
import Profile from './../images/profile.png'
import CloseIcon from '@material-ui/icons/Close';

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


export default function AdvisorDashboard() {
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
                                        Client Request
              </Box>
                                </Typography>
                            </Box>
                        </Paper>
                    </div>
                    <Box display="flex" flexDirection="column"justifyContent="center" style={{ width: '100%' }}>
                       <ClientRequest profile={Profile}></ClientRequest>
                       <ClientRequest profile={Profile}></ClientRequest>
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