import React from 'react';
import { useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../Data/logo.png'

import {useHistory} from 'react-router-dom';
import axios from 'axios';
import apiData from '../../api/api.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height:'50px',
        fontSize:20
    },
}));



export default function SignUp() {

    

    const classes = useStyles();
    let [ setAlignment] = useState("");
    const history=useHistory();

    const reg_Page=()=>{
        history.push("/login")
    }
    
            
       
    
    const signUp=()=>{
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const c_password = document.getElementById('c_password').value;
            const data = {
                user_name: email,
                name: name,
                password: password

            };
            const headers = {
                'Content-Type': 'application/json',
            };

    if(c_password!==password){
        // alert("Passwords do not match");
        document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = '* Password and Verify Password does not match'     
    }
    
    else {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Passwords match';
    
                axios
                .post(apiData.mainIp+apiData.addUser, data, { headers })
                .then(function (response) {
                    console.log(response);
                    if(response.status===200){
                        toast("Data Uploaded Successfully");
                        setInterval(function (){
                            window.location.href="/#/";
                        },3000);
                    }
                });
        
            }   
               
            
              
        };

       

    return (
        <Container component="main" maxWidth="xs" >
            <ToastContainer />
            <CssBaseline />
            <div className={classes.paper} >
                <img src={logo} height={"80px"} width={"250px"}/>
                <div className={classes.form} >
                    <Grid container spacing={2}>
                        {/*<Button*/}
                        {/*    type="submit"*/}
                        {/*    fullWidth*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}

                        {/*    className={classes.submit}*/}
                        {/*    style={{backgroundColor:"#4867aa"}}*/}
                        {/*>*/}
                        {/*    <span ></span> &nbsp;&nbsp;&nbsp; Sign Up With Facebook*/}
                        {/*</Button>*/}
                        {/*<Button*/}
                        {/*    type="submit"*/}
                        {/*    fullWidth*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}
                        {/*    className={classes.submit}*/}
                        {/*    style={{backgroundColor:"#4285f4"}}*/}
                        {/*    */}

                        {/*>*/}
                        {/*    <span ></span>&nbsp;&nbsp;&nbsp; Sign Up With Google</Button>*/}
                        {/*<Grid item xs={12}>*/}
                        {/*    <h2 style={{color:"darkgray"}} align={setAlignment="center"}>OR</h2>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="Email Address"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="Verify Password"
                                label="Verify Password"
                                type="password"
                                id="c_password"
                                
                               
                                
                                //autoComplete="current-password"
                            />

                             <span id='message'></span>


                        </Grid>
                        
                        
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I agree to Term Of Services and Privacy Policy"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={signUp}
                        className={classes.submit}
                        style={{backgroundColor:"#3c80bc"}}
                    >
                        Sign Up
                    </Button>
                    
                    {/* <span>{errors}</span> */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" onClick={reg_Page} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </Container>
    );
}
