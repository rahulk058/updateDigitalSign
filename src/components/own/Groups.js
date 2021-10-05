import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';

import './Schedule.css';
import './Sidebar.css';
import Button from 'react-bootstrap/button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@material-ui/icons/Close';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import * as GoIcons from 'react-icons/go';
import { useHistory } from 'react-router-dom';
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
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Sidebar from './Sidebar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ScheduleIcon from '@material-ui/icons/Schedule';
import api from '../../api/api.json';
import { toast, ToastContainer } from 'react-toastify';
import './bgColor.css';
function Groups(props) {
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
			border: 'none',
			overflow: 'hidden',
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

	const classes = useStyles();
	const [isLoading, setIsLoading] = React.useState(false);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [modalShow, setmodalShow] = useState(false);

	const scheduleClose = () => setmodalShow(false);
	const scheduleShow = () => setmodalShow(true);

	const [dataObj1, setDataObj1] = useState({
		isLoading: false,
		data: [],
	});

	const [dataObj, setDataObj] = useState({
		isLoading: false,
		data: [],
	});

	const [basePlaylist, setbasePlaylist] = useState('');

	const addGroup = e => {
		e.preventDefault();
		const group = document.getElementById('group').value;
		const playlist = document.getElementById('playlist').value;

		const data = {
			user_name: localStorage.getItem('user_name'),

			group_name: group,
			playlist_name: playlist,
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		axios.post(api.mainIp + '/addSchedule', data, { headers }).then(function(response) {
			toast('Group Created Successfully');
			setTimeout(function() {
				window.location.reload();
			}, 5000);
			console.log(response);
		});
		handleClose();
	};

	useEffect(() => {
		if (localStorage.getItem('user_name') === null || localStorage.getItem('user_name') === '') {
			window.location.href = '/login';
		}
		setIsLoading(true);
		axios.get(api.mainIp + 'getScheduleData?user_name=' + localStorage.getItem('user_name')).then(res => {
			console.log(res);
			setDataObj({ ...dataObj, data: res.data, isLoading: true });
		});
		axios.get(api.mainIp).then(res => {
			console.log(res);
			setDataObj1({ ...dataObj1, data: res.data, isLoading: true });
		});
	}, []);
	const history = useHistory();
	const createScheduler = () => {
		history.push('/schedule');
	};

	const [groupName, setgroupName] = useState('');

	return (
		<>
			{isLoading && (
				<div className={classes.root}>
					<ToastContainer />
					<CssBaseline />
					{/* eslint-disable-next-line no-restricted-globals */}
					<AppBar position="absolute" 
					className={clsx(classes.appBar, open && classes.appBarShift)}
					style={{background: "#2C2D35",boxShadow: "0.5rem 1rem 0.4rem rgba(0,0,0,0.2)"}}>
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
							<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
								Groups Assign screens to groups
							</Typography>
							<IconButton color="inherit">
								<Badge>
									<ScheduleIcon />
								</Badge>
							</IconButton>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						classes={{
							paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
						}}
						open={open}
					>
						<div className={classes.toolbarIcon}>
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
													<i className="fas fa-search"></i>
												</button>
											</div>
											<div style={{ marginTop: '20px' }}></div>
										</div>
										<Button
											onClick={handleShow}
											className="btn btn-lg btn-block"
											variant="light"
											style={{ position: "relative", width: '100%', marginTop: '40px', cursor: 'pointer', border:"none" }}
										>
											{' '}
											+ Create new group
										</Button>
										<Modal
											show={show}
											onHide={handleClose}
											backdrop="static"
											keyboard={false}
											style={{
												marginTop: '40px',
												width: '800px',
												maxWidth: '800px',
												marginLeft: '20%',
											}}
										>
											<Modal.Header style={{ backgroundColor: '#0000CD' }}>
												<Modal.Title style={{ color: 'white' }}>Create new group</Modal.Title>
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
												<form onSubmit={addGroup}>
													<label style={{ fontSize: '15px' }}>
														Group name <span style={{ color: 'red' }}>*</span>
													</label>
													<input
														id="group"
														type="text"
														className="form-control"
														required
													></input>
													<br></br>
													<label style={{ fontSize: '15px' }}>
														Base Playlist <span style={{ color: 'red' }}>*</span>
													</label>
													{/* <AiIcons.AiOutlineCaretDown
                          style={{ float: 'right', cursor: 'pointer' }}
                        /> */}
													<input
														id="playlist"
														type="text"
														className="form-control"
														required
													/>
													<button
														className="btn btn-primary"
														style={{
															width: '100px',
															marginLeft: '20px',
															marginBottom: '20px',
														}}
													>
														Create
													</button>
												</form>
											</Modal.Body>
										</Modal>
										<div>
											{dataObj.data.map((d, index) => {
												return (
													<div key={index}>
														<div style={{ display: 'flex', marginTop: '4%' }}>
															<div
																className="GroupInfo"
																style={{ marginTop: '2%', marginLeft: '4%' }}
															>
																<span
																	style={{
																		marginRight: '1%',
																		fontWeight: 'bold',

																		fontSize: '1.1rem',
																		color: '#6495ED',
																	}}
																>
																	{d.group_name}
																</span>
																<span
																	style={{
																		fontSize: '0.9rem',
																		display: 'flex',
																		fontWeight: 'bold',
																	}}
																>
																	Base Playlist-
																	<input
																		tye="text"
																		className="form-control formEdit text-muted"
																		placeholder="Select playlist"
																		style={{ width: '50%' }}
																		defaultValue={d.playlist_name}
																		onChange={e => setbasePlaylist(e.target.value)}
																	></input>
																</span>
															</div>
															<div style={{ marginTop: '4%', marginLeft: '15%' }}>
																<button
																	onClick={createScheduler}
																	className="btn btn-primary"
																	style={{ fontSize: '1rem' }}
																>
																	<ScheduleIcon />
																	Add Schedule
																</button>

																<button
																	className="btn btn-success"
																	style={{ marginLeft: '2px' }}
																>
																	<PublishIcon style={{ marginRight: '6px' }} />
																	Publish
																</button>
															</div>
														</div>

														<div
															style={{
																backgroundColor: '#f0f0f0',
																marginTop: '8px',
																marginLeft: '2%',
																marginRight: '2%',
																height: '20vh',
																border: '1px solid darkBlue',
																position: 'relative',
															}}
														>
															<div
																style={{
																	display: 'inline-block',
																	position: 'absolute',
																	marginLeft: '8%',
																	marginTop: '1%',
																}}
															>
																<GoIcons.GoDeviceDesktop
																	style={{
																		fontSize: '6rem',
																	}}
																/>
																<div
																	className="overlay"
																	style={{
																		position: 'absolute',
																		top: '20%',
																		left: '35%',
																		fontSize: '0.8rem',
																		color: 'midnightBlue',
																	}}
																>
																	{' '}
																	{dataObj1.data.map((d, index) => {
																		return (
																			<div key={index}>
																				<p>
																					{d.screen_name}
																					<br></br>
																					{d.location}
																				</p>
																			</div>
																		);
																	})}
																</div>
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
export default Groups;