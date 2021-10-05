import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import apiData from '../../api/api.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../Data/logo.png";
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height:'50px',
        fontSize:20
    }

}));

export default function SignIn() {
    const classes = useStyles();
   // const history=useHistory();
    const reg_Page=()=>{
       window.location.href="/#/SignUp"
    }
// const screen=()=>{
//         history.push("/screen")
//     }

    // const  responseFacebook=(response)=>{
    //     console.log(response)
    // }

    const login=()=>{
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        axios
            .get(apiData.mainIp+apiData.login+"?user_name="+email+"&password="+password)
            .then(function (response) {
                console.log(response);
                if(response.status===200&&response.data==="login"){
                    toast("Login Successfully");
                    localStorage.setItem("user_name",email)
                    setInterval(function (){
                      window.location.href="/#/screen";
                    },3000);
                }
                else{
                    toast("Please Enter Correct Username And Password");
                }
            });
    };


    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer />
            <CssBaseline />
            <div className={classes.paper} >
                <img src={logo} height={"80px"} width={"250px"}/>
                <div className={classes.form} noValidate>
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

                    {/*>*/}
                    {/*    <span ></span>&nbsp;&nbsp;&nbsp; Sign In With Google</Button>*/}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={login}
                        className={classes.submit}
                        style={{backgroundColor:"#3c80bc"}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/#/SignUp"   variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
}
