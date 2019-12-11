import React, { useState } from 'react'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'
import { Paper, Box, Container, TextField, Typography, Button, Card,
    Snackbar, IconButton, CardActions, Grid, CardHeader, CardContent, Link } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import Footer from './Footer';
import ClientRequest from './advisor/ClientRequest'
import Profile from './../images/profile.png'
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/StarBorder';
import AddBox from '@material-ui/icons/AddBox';
import Ankit from '../images/Ankit.png'
import Havya from '../images/Havya.jpg'
import Ganesh from '../images/Ganesh.png'
import Sushma from '../images/Sushma.jpg'
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
    },
    heroContent:{
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    }

}));


export default function AboutUs() {
    const classes = useStyles()
    const [snack, setSnack] = useState({
        open: false,
        message: ''
    })

    const tiers = [
        {
            title: 'Havya',
            subheader: 'Ux designer',
          buttonText: 'Contact us',
          profile: Havya,
          buttonVariant: 'outlined',
        },
        {
          title: 'Ankit Prakash',
          subheader: 'Developer',
          profile: Ankit,
          buttonText: 'Contact Us',
          buttonVariant: 'outlined',
        },
        {
            title: 'Ankit Prakash',
            subheader: 'Developer',
            profile: Ganesh,
            buttonText: 'Contact Us',
            buttonVariant: 'outlined',
        },
        {
        title: 'Ankit Prakash',
        subheader: 'Developer',
        profile: Sushma,
        buttonText: 'Contact Us',
        buttonVariant: 'outlined',
    },
      ];
    var isLoggedIn = sessionStorage.getItem('isLoggedIn')
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} />
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          ABOUT US
        </Typography>
        {/* <Typography variant="h5" align="center" color="textSecondary" component="p">
          Quickly build an effective pricing table for your potential customers with this layout.
          It&apos;s built with default Material-UI components with little customization.
        </Typography> */}
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main" style={{marginBottom: '30px'}}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={12} md={3}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                 
                <img 
          className={classes.media}
          style={{
            width:'240px',
            height: '200px'
          }}
          src={tier.profile}
        />
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      {/* <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container> */}
            <Footer />
        </div>
    )
}