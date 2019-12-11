import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Box, Container, TextField, Typography, Button,
  Snackbar, IconButton, Slide, SnackbarContent, CssBaseline, Grid
} from '@material-ui/core'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import CancelIcon from '@material-ui/icons/Cancel';
import Check from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import React, { forwardRef, useEffect, useState } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
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

  
  export default function AdminDashboard(){
      const classes = useStyles()
      const [tableUsers, setTableUsers] = useState({
        columns: [
            { title: 'id', field: 'id', hidden: true, export: false },
            { title: 'Name', field: 'name', cellStyle: { width: 100 } },
            { title: 'Email', field: 'email', cellStyle: { width: 100 } },
            { title: 'Role', field: 'role', cellStyle: { width: 100 } },
            {
                title: 'Status', field: 'status', cellStyle: { width: 100 },
                render: rowData => {
                    if (rowData.status) {
                        return <Typography component="div">
                            <Box color="green" fontWeight="bold">
                                Active
                            </Box>
                        </Typography>
                    }
                    else {
                        return (<Typography component="div">
                            <Box color="red" fontWeight="bold">
                                Inactive
                        </Box>
                        </Typography>)
                    }
                }
            }

        ],
        data: [{
          name: 'Ankit Prakash',
          email: 'ankskk@gmail.com',
          role:'client',
          status: true
        },
        {
          name: 'Rahul Reddy',
          email: 'rr@gmail.com',
          role:'advidor',
          status: true
        },
        {
          name: 'Havya Ravipatti',
          email: 'ankskk@gmail.com',
          role:'client',
          status: true
        },
        {
          name: 'Ganesh Siripuram',
          email: 'ganesh@gmail.com',
          role:'client',
          status: true
        },
        {
          name: 'Sushma Rani Reddy Aleti',
          email: 'sushma@gmail.com',
          role:'client',
          status: false
        },
        {
          name: 'Ankit Prakash',
          email: 'ankskk@gmail.com',
          role:'client',
          status: false
        },
        {
          name: 'Ankit Prakash',
          email: 'ankskk@gmail.com',
          role:'client',
          status: true
        }
      ],
    })
      return(
        <div className={classes.root}>
          <NavBar isLoggegIn={sessionStorage.getItem('token')?true:false}></NavBar>
        <Container component="main" maxWidth='lg' style={{margin: '50px'}}>
        <Grid container>
                        <Grid item sm={2}></Grid>
                        <Grid item xs={12} sm={8}>
                            <MaterialTable
                                icons={tableIcons}
                                title="Users"
                                columns={tableUsers.columns}
                                data={tableUsers.data}
                                options={{
                                    actionsColumnIndex: -1,
                                    headerStyle: {
                                        fontSize: 15
                                    },
                                    emptyRowsWhenPaging: false,
                                    exportButton: true,
                                    exportAllData: true
                                }}
                                editable={{
                                    isDeletable: rowData => !rowData.status,
                                    onRowDelete: oldData =>
                                        new Promise(resolve => {
                                            // deleteUserRow(resolve, oldData)
                                        }),
                                }}

                            />
                        </Grid>
                        <Grid item sm={2}></Grid>
                    </Grid>
            </Container>
            <Footer/>
    </div>

      )
  }