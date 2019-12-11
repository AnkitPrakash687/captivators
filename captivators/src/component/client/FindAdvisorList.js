import React, { useState, useEffect } from 'react'
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
import queryString from 'query-string'
import API from '../../API'
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


export default function FindAdvisorList(props) {
    const classes = useStyles()
    const [snack, setSnack] = useState({
        open: false,
        message: ''
    })

    const query = queryString.parse(props.location.search)
    const [search, setSearch] = useState({
        location: query.location,
        name: query.name
    })
    var [advisorList, setAdvisorList] = useState([])
    //console.log('--------QUERY-------', values)
    useEffect(()=>{
        var query = queryString.parse(props.location.search)
        console.log(query)
        API.post('auth/details')
        .then(response =>{
 
        console.log(response.data)
       console.log(typeof query.location)
         var advisors = response.data
            if(typeof query.location != 'undefined'){
                var location = query.location.toLowerCase()
                   advisors = advisors.filter((item) =>{
                        console.log(query.location, item.city, item.state, item.zipcode)
                        if(item.city.toLowerCase().includes(location) 
                        || item.state.includes(location) 
                        || item.zipcode.toString().includes(location)){
                            return item
                        }
                    })
            }

           else if(typeof query.name != 'undefined'){
               var name = query.name.toLowerCase()
                advisors = advisors.filter((item) =>{
                    console.log(query.name, item.name)
                     if(item.name.toLowerCase().includes(name)){
                         return item
                     }
                 })
         }
        
            console.log('filtered',advisors)
            setAdvisorList(advisors)
        })
       // console.log(search)
        
    }, [props.location.search])
  

   
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
                                        {'We found '+advisorList.length+' advisors'}
                                    </Box>
                                </Typography>
                            </Box>
                        </Paper>
                    </div>
                    <Box display="flex" flexDirection="column"justifyContent="center" style={{ width: '100%' }}>
                    {
                                advisorList.map((item)=>{
                                    return <Advisor
                                     profile={Profile}
                                     id={item._id}
                                     bio={item.bio}
                                     name={item.name}
                                     email={item.email_id}
                                     city={item.city}
                                     state={item.state}
                                     street={item.street}
                                     zipcode={item.zipcode}
                                     ></Advisor>
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