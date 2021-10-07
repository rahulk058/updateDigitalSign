import React from 'react';
import './Sidebar.css';
import logo from '../../Data/logo.png';
import Button from 'react-bootstrap/button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import * as TiIcons from 'react-icons/ti';
import * as GoIcons from 'react-icons/go';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Sidebar from './Sidebar';
import AirplayIcon from '@material-ui/icons/Airplay';
import api from '../../api/api.json';
import { toast, ToastContainer } from 'react-toastify';
import './bgColor.css';
import zIndex from '@material-ui/core/styles/zIndex';
// export const locationName = React.createContext()

function Screen() {
	const drawerWidth = 350;
	const useStyles = makeStyles(theme => ({
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
			boxShadow:"5px 10px 5px rgba(0, 0, 0, 0.5)"
		},
		drawerPaperClose: {
		
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

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
		const open = document.querySelector('.boxes');
		open.style.visibility = 'visible';
	};
	const handleDrawerClose = () => {
		setOpen(false);
		const close = document.querySelector('.boxes');
		close.style.visibility = 'hidden';
	};
	// eslint-disable-next-line no-undef
	const [isLoading, setIsLoading] = React.useState(false);
	const [isLoading1, setIsLoading1] = React.useState(false);
	const [isLoading2, setIsLoading2] = React.useState(false);

	const classes = useStyles();

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [dataObj, setDataObj] = React.useState([]);
	const [dataObj1, setDataObj1] = React.useState([]);

	const addScreen = () => {
		const code = document.getElementById('code').value;
		const screen = document.getElementById('screen').value;
		const location = document.getElementById('location').value;
		const notes = document.getElementById('notes').value;
		const data = {
			user_name: localStorage.getItem('user_name'),
			code: code,
			screen_name: screen,
			location: location,
			notes: notes,
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		axios.post(api.mainIp + '/admin', data, { headers }).then(function(response) {
			toast('Screen Added Successfully');
			setTimeout(function() {
				window.location.reload();
			}, 5000);
			console.log(response);
		});
		handleClose();
	};
	React.useEffect(() => {
		if(localStorage.getItem("load")==1){
			localStorage.setItem("load",0);
			window.location.reload();
		}
		if (localStorage.getItem('user_name') === null || localStorage.getItem('user_name') === '') {
			window.location.href = '/#/login';
		}
		setIsLoading(true);
		axios.get(api.mainIp + '?user_name=' + localStorage.getItem('user_name')).then(res => {
			console.log(res);
			setDataObj([...dataObj, res.data]);
			setIsLoading1(true);
		});

		axios.get(api.mainIp + '/getScheduleData').then(res => {
			console.log(res);
			setDataObj1([...dataObj1, res.data]);
			setIsLoading2(true);
		});
	}, []);

	return (
		<>
			{isLoading && (
				<div className={classes.root}>
					<ToastContainer />

					<CssBaseline />

					<Drawer
				
						variant="permanent"
						zIndex="10"
						
						classes={{
							paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
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
					<main className={classes.content} >
						<div className={classes.appBarSpacer}/>
						<Container max-width="100%" style={{ marginTop: '20px', marginLeft:"4rem", overflow: "hidden"}} className={classes.containerFluid}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<AppBar className={clsx(classes.appBar, open && classes.appBarShift)} style={{background: "#2C2D35",boxShadow: "0.5rem 1rem 0.4rem rgba(0,0,0,0.2)"}}>
										<Toolbar className={classes.toolbar}>
											<IconButton
												edge="start"
												color="inherit"
												aria-label="open drawer"
												onClick={handleDrawerOpen}
												className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
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
												Screens overview Manage or link screens
											</Typography>
											<IconButton color="inherit">
												<AirplayIcon />
											</IconButton>
										</Toolbar>
									</AppBar>
									<div className="bgColor" style={{border: ".8rem solid rgb(255, 255, 255)", boxShadow: "1rem 1rem 0.5rem rgba(0,0,0,0.1)"}}>
										<div className="firInnerColor"></div>
										<div className="SecInnerColor"></div>
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
										<div>
											<Button
												id="add_button"
											
												onClick={handleShow}
												className="btn btn-lg btn-block"
												variant="light"
												style={{ position: "relative", width: '100%', marginTop: '40px', cursor: 'pointer' }}
											>
												{' '}
												+ Add screen
											</Button>
											<Modal
												show={show}
												onHide={handleClose}
												backdrop="static"
												keyboard={false}
												style={{ marginTop: '40px' }}
											>
												
												<Modal.Body>
													<form onSubmit={addScreen}>
														<p style={{ fontSize: '25px' }}>
															Link a screen with your account.
														</p>

														<p className="text-muted" style={{ fontSize: '12px' }}>
															Type the code shown on your connected screen. You need to
															download our player software to get the code.
														</p>
														<input
															className="form-control"
															style={{
																marginTop: '20px',
																borderBottom: '1px solid red',
																textTransform: 'uppercase',
															}}
															id="code"
															type="text"
															placeholder="XXXXXX"
															name="code"
															required
														></input>

														<label style={{ fontSize: '14px' }}>
															Screen name(Optional)
														</label>
														<input
															className="form-control"
															type="text"
															name="Screen"
															id="screen"
															required
														></input>
														<label style={{ fontSize: '14px' }}>Location(Optional)</label>
														<input
															className="form-control"
															type="text"
															name="Location"
															id="location"
															required
														></input>
														<label style={{ fontSize: '14px' }}>Notes(Optional)</label>
														<input
															className="form-control"
															type="text"
															name="Notes"
															id="notes"
															required
														></input>
														<input type="checkbox" required></input>
														<p className="text-muted" style={{ fontSize: '12px' }}>
															First screen is free. Additional screens will cost 18 USD
															per screen per month.You will be billed for the monthly
															usage on the first day of next month. Click here to accept
															our{' '}
															<a href="#" style={{ textDecoration: 'none' }}>
																{' '}
																Terms &amp; Conditions
															</a>
														</p>
														<button className="btn btn-primary">Add Screen</button>
													</form>
												</Modal.Body>
											</Modal>
										</div>
										<div>
											{console.log(dataObj)}
											{isLoading1 &&
												dataObj[0].map(d => {
													return (
														<>
															<div
																style={{
																	backgroundColor: '#f0f0f0',
																	marginTop: '20px',

																	border: '1px solid black',
																	height: '25vh',
																	position: 'relative',
																}}
															>
																<div
																	className="img"
																	id="mac_icon"
																	style={{
																		display: 'inline-block',
																		position: 'absolute',
																		lineHeight: '23vh',
																		marginLeft: '5%',
																	}}
																>
																	<GoIcons.GoDeviceDesktop
																		style={{
																			fontSize: '5rem',
																			marginTop: '25%',
																		}}
																	/>

																	<div
																		className="overlay"
																		style={{
																			position: 'absolute',
																			top: '-5%',
																			left: '26%',
																			fontSize: '2.5rem',
																			// color: 'midnightBlue',
																		}}
																	>
																		<AiIcons.AiFillAndroid />
																	</div>
																</div>
																<div style={{ marginLeft: '40%', marginTop: '2%' }}>
																	<FiberManualRecordIcon
																		style={{ fontSize: '0.8rem' }}
																	/>
																	{d.screen_name}
																	<LocationOnIcon style={{ fontSize: '1rem' }} />
																	{d.location}
																	<br></br>
																	{isLoading2 &&
																		dataObj1.map(d => {
																			return (
																				<label style={{ fontWeight: 'bold' }}>
																					Assigned to group:{' '}
																					<span
																						style={{ fontWeight: 'normal' }}
																					>
																						{d.group_name}
																					</span>
																				</label>
																			);
																		})}
																	<br></br>
																	<label style={{ fontWeight: 'bold' }}>
																		Notes:{' '}
																		<span style={{ fontWeight: 'normal' }}>
																			{d.notes}
																		</span>{' '}
																	</label>
																	<br></br>
																	<label style={{ fontWeight: 'bold' }}>
																		Last Online:
																	</label>
																</div>
															</div>
														</>
													);
												})}
										</div>

										<Container
											style={{
												width: '100%',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												flexWrap: 'wrap',
											}}
										>
											<div className="cardFlip adn" style={{ backgroundColor: '#e8e8e8' }}>
												<AiIcons.AiFillAndroid className="android" />
												<h3 className="font androidtext">
													<span className="spanand">a</span>ndroid
												</h3>
											</div>
											<div className="cardFlip appleCard" style={{ backgroundColor: '#e8e8e8' }}>
												<AiIcons.AiFillApple className="apple" />
												<h3 className="font appletext">iOS</h3>
											</div>
											<div className="cardFlip windowCard" style={{ backgroundColor: '#e8e8e8' }}>
												<TiIcons.TiVendorMicrosoft className="window" />
												<h3 className="font windowtext">Window</h3>
											</div>
										</Container>
										<h1
											className="heading"
											style={{
												// textAlign: 'center',
												fontSize: '2rem',
												marginTop: '50px',
											}}
										>
											Download player software
										</h1>
									</div>
								</Grid>
							</Grid>
						</Container>
					</main>
				</div>
			)}
		</>
	);
}
export default Screen;
