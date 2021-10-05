import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Tooltip from '@material-ui/core/Tooltip';
import Button from 'react-bootstrap/button';
import Modal from 'react-bootstrap/Modal';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Slide from './Images/Slide.jpeg';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import CreateIcon from '@material-ui/icons/Create';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import logo from '../../Data/logo.png';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Sidebar from './Sidebar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import api from '../../api/api.json';
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import './bgColor.css';
function Playlists() {
  const drawerWidth = 350;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      border: "none",
			overflow: "hidden",
			position: 'fixed',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));
 const history=useHistory();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
    const open = document.querySelector(".boxes")
    open.style.visibility = 'visible';
  };
  const handleDrawerClose = () => {
    setOpen(false);
    const close = document.querySelector('.boxes');
		close.style.visibility = 'hidden';
  };
  // eslint-disable-next-line no-undef
  const [isLoading, setIsLoading] = React.useState(false);

  const screenContext = React.createContext();
  const classes = useStyles();

  const [show, setShow] = useState(false); // to show modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataObj, setDataObj] = useState({
    // to display data on browser
    isLoading: false,
    data: [],
  });

  const [isDisplay, setisDisplay] = useState(false); // for dropdown button

  let aspectRatioArray = [];
  const aspectRatio = (event) => {
    console.log(event.target.id);
    const aspect_div1 = document.getElementById(event.target.id).innerHTML;
    console.log(aspect_div1);
    aspectRatioArray[0] = aspect_div1;
  };

  const createPlaylist = (e) => {
    e.preventDefault();
    const playlist_name = document.getElementById('playlist_name').value;
    console.log(playlist_name, 'name');
    const aspect_div1 = aspectRatioArray[0];
    console.log(aspect_div1);

    const data = {
      user_name: localStorage.getItem("user_name"),
      playlist_name: playlist_name,
      aspect_ratio: aspect_div1,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    axios
      .post(api.mainIp+'newPlaylist', data, { headers })
      .then(function (response) {
          toast("Playlist Created Successfully");
          setTimeout(function (){
              window.location.reload();
          },5000);
          console.log(response);
      });
    handleClose();
  };

  const openEditor=()=>{
      history.push("/editor");
  }
  useEffect(() => {
    if (
      localStorage.getItem('user_name') === null ||
      localStorage.getItem('user_name') === ''
    ) {
      window.location.href = '/#/login';
    }
    setIsLoading(true);
    axios.get(api.mainIp+'getPlaylist?user_name='+localStorage.getItem("user_name")).then((res) => {
      console.log(res);
      setDataObj({ ...dataObj, data: res.data, isLoading: true });
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div className={classes.root}>
            <ToastContainer />
          <CssBaseline />
          {/* eslint-disable-next-line no-restricted-globals */}
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
            style={{background: "#2C2D35",boxShadow: "0.5rem 1rem 0.4rem rgba(0,0,0,0.2)"}}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Playlists Add or edit your playlists
              </Typography>
              <IconButton color="inherit">
                <Badge color="inherit">
                  <FormatListNumberedIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div
							className={classes.toolbarIcon}
							style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
						>
							<img src={logo} height={'70%'} width={'70%'} />
							<IconButton onClick={handleDrawerClose}>
								<ChevronLeftIcon />
							</IconButton>
						</div>
            <Divider />
            <List className="mainList"><Sidebar/></List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3} style={{display:"flex",justifyContent: "center"}}>
                <Grid item xs={11}>
                  <Paper className={classes.paper}>
                  <div className="bgColor" style={{padding: "2rem 4rem"}}>
                  <div className="faIcons">
											<div style={{ marginTop: '20px', marginLeft: '10px' }}>
												<Tooltip title="sort by name">

													<AiIcons.AiOutlineSortAscending
														style={{ fontSize: '23px', color: '#fff' }}
													/>
												</Tooltip>
												<FaIcons.FaSortAmountDownAlt
													style={{ fontSize: '18px', color: '#fff' }}
												/>
											</div>
											<div style={{ marginTop: '20px', zIndex: 1000 }}>
												<input type="text" className="input" placeholder="Filter...." />
												<button className="btn2">
													<i class="fas fa-search"></i>
												</button>
											</div>
											<div style={{ marginTop: '20px' }}></div>
										</div>
                    <div
                      className="playlist_buttons"
                      style={{ display: 'inline' }}
                    >
                      <Button
                        id="playlist_button"
                        onClick={handleShow}
                        className="mb-3"
                        variant="light"
                        style={{ position: "relative", width: '48.5%', marginTop: '40px', cursor: 'pointer',  border:"none" }}

                      >
                        {' '}
                        + Create Playlist
                      </Button>
                      <Button
                        id="playlist_button"
                        onClick={handleShow}
                        className="mb-3"
                        variant="light"
                        style={{ position: "relative", width: '48.5%', margin: '40px 0 0 1%', cursor: 'pointer',  border:"none" }}
                      >
                        {' '}
                        + From Template
                      </Button>
                    </div>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      style={{ marginTop: '40px' }}
                    >
                      <Modal.Header style={{ backgroundColor: '#989898' }}>
                        <Modal.Title style={{ color: 'white' }}>
                          Create Playlist
                        </Modal.Title>
                        <CloseIcon
                          onClick={handleClose}
                          style={{
                            color: 'white',
                            fontSize: '25px',
                            fontWeight: 'bolder',
                          }}
                        />
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={createPlaylist}>
                          <label
                            style={{ fontSize: '14px', fontWeight: 'bold' }}
                          >
                            Playlist name<span style={{ color: 'red' }}>*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="playlist"
                            id="playlist_name"
                            required
                          ></input>
                          <label
                            style={{ fontSize: '14px', fontWeight: 'bold' }}
                          >
                            Aspect Ratio
                          </label>
                          <div id="aspect_ratio">
                            <div
                              className="aspect_divs"
                              id="div1"
                              onClick={aspectRatio}
                              style={{
                                width: '20%',
                                height: '9vh',
                                lineHeight: '9vh',
                              }}
                            >
                              16:9
                            </div>
                            <div
                              className="aspect_divs"
                              id="div2"
                              onClick={aspectRatio}
                              style={{
                                width: '22%',
                                height: '10vh',
                                lineHeight: '10vh',
                              }}
                            >
                              16:10
                            </div>

                            <div
                              className="aspect_divs"
                              id="div3"
                              onClick={aspectRatio}
                              style={{
                                width: '18%',
                                height: '10vh',
                                lineHeight: '10vh',
                              }}
                            >
                              4:3
                            </div>
                            <div
                              className="aspect_divs"
                              id="div4"
                              onClick={aspectRatio}
                              style={{
                                width: '13%',
                                height: '15vh',
                                lineHeight: '15vh',
                              }}
                            >
                              9:16
                            </div>
                          </div>
                          <label
                            style={{
                              fontSize: '14px',
                              marginTop: '2%',
                              marginBottom: '2%',
                              fontWeight: 'bold',
                            }}
                          >
                            Choose playlist layout
                          </label>
                          <br></br>

                          <div
                            style={{
                              width: '100%',
                              height: '9vh',
                              display: 'flex',
                              marginTop: '2%',
                            }}
                          >
                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                backgroundColor: 'skyblue',
                                display: 'inline-block',
                                textAlign: 'center',
                                lineHeight: '9vh',
                                marginRight: '3%',
                              }}
                            >
                              1
                            </div>

                            <div
                              style={{
                                width: '20%',
                                display: 'inline-block',
                                textAlign: 'center',
                                marginRight: '3%',
                              }}
                            >
                              <div
                                style={{
                                  height: '7vh',
                                  backgroundColor: 'skyblue',
                                  lineHeight: '7vh',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  width: '100%',
                                  height: '2vh',
                                  backgroundColor: 'lightgreen',
                                  lineHeight: '2vh',
                                  position: 'relative',
                                  fontSize: '12px',
                                }}
                              >
                                2
                              </div>
                            </div>

                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                display: 'inline-block',
                                textAlign: 'center',
                                lineHeight: '9vh',
                                marginRight: '3%',
                              }}
                            >
                              <div
                                style={{
                                  width: '50%',
                                  backgroundColor: 'yellow',
                                  display: 'inline-block',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  width: '50%',
                                  backgroundColor: 'skyblue',
                                  display: 'inline-block',
                                }}
                              >
                                2
                              </div>
                            </div>

                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                display: 'inline-block',
                                textAlign: 'center',
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: 'yellow',
                                  height: '7vh',
                                  width: '50%',
                                  display: 'inline-block',
                                  lineHeight: '7vh',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  backgroundColor: 'skyblue',
                                  height: '7vh',
                                  width: '50%',
                                  display: 'inline-block',
                                  lineHeight: '7vh',
                                }}
                              >
                                2
                              </div>
                              <div
                                style={{
                                  backgroundColor: 'lightgreen',
                                  height: '2vh',
                                  width: '100%',
                                  lineHeight: '2vh',
                                  position: 'relative',
                                  fontSize: '12px',
                                }}
                              >
                                3
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginTop: '2%',
                              display: 'flex',
                              width: '100%',
                              height: '9vh',
                            }}
                          >
                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                display: 'inline-block',
                                textAlign: 'center',
                                lineHeight: '9vh',
                                marginRight: '3%',
                              }}
                            >
                              <div
                                style={{
                                  width: '70%',
                                  backgroundColor: 'yellow',
                                  display: 'inline-block',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  width: '30%',
                                  backgroundColor: 'skyblue',
                                  display: 'inline-block',
                                }}
                              >
                                2
                              </div>
                            </div>
                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                backgroundColor: 'skyblue',
                                display: 'inline-block',
                                textAlign: 'center',
                                lineHeight: '9vh',
                                marginRight: '3%',
                              }}
                            >
                              <div
                                style={{
                                  width: '30%',
                                  backgroundColor: 'yellow',
                                  display: 'inline-block',
                                  height: '9vh',
                                  lineHeight: '9vh',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  width: '70%',
                                  backgroundColor: 'skyblue',
                                  display: 'inline-block',
                                }}
                              >
                                2
                              </div>
                            </div>
                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                backgroundColor: 'skyblue',
                                display: 'inline-block',
                                textAlign: 'center',
                                marginRight: '3%',
                              }}
                            >
                              <div
                                style={{
                                  width: '70%',
                                  backgroundColor: 'yellow',
                                  display: 'inline-block',
                                  height: '7vh',
                                  lineHeight: '7vh',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  width: '30%',
                                  backgroundColor: 'skyblue',
                                  display: 'inline-block',
                                  height: '7vh',
                                  lineHeight: '7vh',
                                }}
                              >
                                2
                              </div>
                              <div
                                style={{
                                  backgroundColor: 'lightgreen',
                                  height: '2vh',
                                  width: '100%',
                                  lineHeight: '2vh',
                                  position: 'relative',
                                  fontSize: '12px',
                                }}
                              >
                                3
                              </div>
                            </div>
                            <div
                              style={{
                                width: '20%',
                                height: '9vh',
                                backgroundColor: 'skyblue',
                                display: 'inline-block',
                                textAlign: 'center',
                              }}
                            >
                              <div
                                style={{
                                  width: '30%',
                                  backgroundColor: 'yellow',
                                  display: 'inline-block',
                                  height: '7vh',
                                  lineHeight: '7vh',
                                }}
                              >
                                1
                              </div>
                              <div
                                style={{
                                  width: '70%',
                                  backgroundColor: 'skyblue',
                                  display: 'inline-block',
                                  height: '7vh',
                                  lineHeight: '7vh',
                                }}
                              >
                                2
                              </div>
                              <div
                                style={{
                                  backgroundColor: 'lightgreen',
                                  height: '2vh',
                                  width: '100%',
                                  lineHeight: '2vh',
                                  position: 'relative',
                                  fontSize: '12px',
                                }}
                              >
                                3
                              </div>
                            </div>
                          </div>
                          <br></br>
                          <label
                            style={{
                              fontSize: '14px',
                              marginTop: '2%',
                              marginBottom: '2%',
                              fontWeight: 'bold',
                            }}
                          >
                            I want a different layout!
                          </label>
                          <br></br>
                          <div className="dropdown">
                            <button
                              onClick={() => {
                                setisDisplay(!isDisplay);
                              }}
                              className="btn btn-light dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                            >
                              <span className="caret"></span>Advanced
                            </button>
                          </div>
                          {isDisplay && (
                            <div>
                              <label
                                style={{
                                  fontSize: '14px',
                                  color: 'blue',
                                  marginTop: '2%',
                                }}
                              >
                                Enter screen aspect ratio or resolution in
                                pixels{' '}
                              </label>
                              <span style={{ color: 'red', fontSize: '12px' }}>
                                *
                              </span>
                              <input
                                type="text"
                                className="form-control"
                              ></input>
                            </div>
                          )}
                          <br></br>
                          <button
                            // type="submit"
                            // onClick={createPlaylist}
                            className="btn btn-primary"
                          >
                            Create
                          </button>
                        </form>
                      </Modal.Body>
                    </Modal>
                    <div>
                      {dataObj.data.map((d) => {
                        return (
                          <div>
                            <div
                              style={{
                                backgroundColor: '#f0f0f0',
                                marginTop: '20px',
                                // marginRight: '2%',
                                display: 'flex',
                                border: '1px solid black',
                              }}
                            >
                              {/* <div style={{ backgroundColor: 'yellow',display:"flex"}}> */}
                              <img
                                id="slide"
                                src={Slide}
                                style={{
                                  marginBottom: '3%',
                                  height: '80%',
                                  width: '28%',
                                  marginLeft: '1%',
                                  marginTop: '2%',
                                  marginRight: '3%',
                                }}
                                alt="slide"
                              />
                              {/* </div> */}
                              <div
                                style={{
                                  display: 'block',
                                  marginTop: '3%',
                                  marginRight: '10%',
                                }}
                              >
                                <Tooltip
                                  title="Playlist Name"
                                  placement="top"
                                  arrow
                                >
                                  <div
                                    style={{
                                      marginBottom: '4%',
                                      color: '#FF3152',
                                      fontWeight: 'bold',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {d.playlist_name}
                                  </div>
                                </Tooltip>
                                <div
                                  style={{
                                    display: 'inline',
                                    backgroundColor: 'blue',
                                  }}
                                >
                                  <Tooltip
                                    title="Total Play time"
                                    placement="top"
                                    arrow
                                  >
                                    <div style={{ fontSize: '0.8rem' }}>
                                      <ScheduleIcon
                                        style={{ fontSize: '1.1rem' }}
                                      />
                                      00:00:00
                                    </div>
                                  </Tooltip>
                                  <Tooltip
                                    title="Count of slides"
                                    placement="top"
                                    arrow
                                  >
                                    <div style={{ fontSize: '0.8rem' }}>
                                      <SlideshowIcon
                                        style={{ fontSize: '1.2rem' }}
                                      />
                                      10
                                    </div>
                                  </Tooltip>
                                  <Tooltip
                                    title="Aspect ratio"
                                    placement="top"
                                    arrow
                                  >
                                    <div style={{ fontSize: '0.8rem' }}>
                                      <AspectRatioIcon
                                        style={{ fontSize: '1.1rem' }}
                                      />
                                      {d.aspect_ratio}
                                    </div>
                                  </Tooltip>
                                </div>
                              </div>
                              <div style={{ marginTop: '15%' }}>
                                <button className="btn btn-primary" onClick={openEditor}>
                                  <CreateIcon style={{ fontSize: '1.1rem' }} />
                                  Edit Playlist

                                </button>
                                <button className="btn btn-success"
                                style={{marginLeft:"10px"}}>
                                  Share Playlist
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
      )}
    </>
  );
}
export default Playlists;