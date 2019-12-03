import React, { useState } from 'react'
import NavBar from '../NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, TextField, Typography, Button,
    Snackbar, IconButton, Grid } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import Footer from '../Footer';
import Advisor from './Advisor'
import Profile from '../../images/profile.png'
import CloseIcon from '@material-ui/icons/Close';
import FindAdvisor from '../client/FindAdvisor';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    root: {
        
        margin: theme.spacing(5),
    },
    paper: {
         background: grey[100],
    },
    heading:{
        padding: theme.spacing(2)
    }

}));


export default function FindAdvisorList() {
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
                <Grid container >
                    <Grid item xs={12} sm={8}>
                <Paper elevation={5} className={classes.paper}>
                    <div>
                        <Paper className={classes.heading}>
                            <Box display="flex" justifyContent="left" style={{ width: '100%' }}>
                                <Typography component="div">
                                    <Box color={grey[800]} fontWeight="bold" fontSize="h4.fontSize">
                                        Find a Financial Advisor
                                    </Box>
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="left" style={{ width: '100%' }}>
                                <Typography component="div">
                                    <Box color={grey[800]}  fontSize="h8.fontSize">
                                        {'We found 2 advisors'}
                                    </Box>
                                </Typography>
                            </Box>
                        </Paper>
                    </div>
                    <Box display="flex" flexDirection="column"justifyContent="center" style={{ width: '100%' }}>
                       <Advisor profile={Profile}/>
                       <Advisor profile={Profile}/>
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