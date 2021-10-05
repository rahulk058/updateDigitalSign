import React, { useState } from 'react';
import './Sidebar.css';
import FileManager from '../../FileManager/FileManager';

import { getTranslations, langChange } from '../../Redux/actions';
import { connect } from 'react-redux';
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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import axios from 'axios';
import api from '../../Redux/middleware/api';
import apiData from '../../api/api.json';

const Library = props => {
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
	const [isLoading, setIsLoading] = React.useState(false);

	const screenContext = React.createContext();
	const classes = useStyles();
	if (props.translations.lang !== props.lang) {
		import(`../../Data/Languages/${props.lang}`)
			.then(result => {
				props.getTranslations({
					lang: props.lang,
					data: result.default,
				});
			})
			.catch(e => {
				props.getTranslations({
					lang: props.lang,
					data: {},
				});
			});
	}

	const handleCallBack = filePath => {
		console.log('Image Path Returned', filePath);
	};
	React.useEffect(() => {
		if (localStorage.getItem('user_name') === null || localStorage.getItem('user_name') === '') {
			window.location.href = '/login';
		}
		const upload = {
			dest: localStorage.getItem('user_name'),
			limits: {
				files: 15, // allow up to 5 files per request,
				fieldSize: 5 * 1024 * 1024, // 2 MB (max file size)
			},
		};
		axios
			.get(apiData.mainIp + 'createDirectory?folder=' + localStorage.getItem('user_name'))
			.then(function(response) {
				console.log(response);
			});
		setIsLoading(true);
	}, []);

	return (
		<>
			{isLoading && (
				<div className={classes.root}>
					<CssBaseline />
					{/* eslint-disable-next-line no-restricted-globals */}
					<AppBar
						position="absolute"
						className={clsx(classes.appBar, open && classes.appBarShift)}
						style={{ background: '#2C2D35', boxShadow: '0.5rem 1rem 0.4rem rgba(0,0,0,0.2)' }}
					>
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
								Library Upload new files for your playlists
							</Typography>
							<IconButton color="inherit">
								<Badge>
									<LibraryAddIcon />
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
										<div>
											<FileManager height="580" callback={handleCallBack} />
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
};

const mapStateToProps = store => ({
	store,
	translations: store.dashboard.translations,
	lang: store.dashboard.lang,
});

const mapDispatchToProps = dispatch => ({
	langChange: lang => dispatch(langChange(lang)),
	getTranslations: data => dispatch(getTranslations(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);