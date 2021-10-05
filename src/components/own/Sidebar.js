import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AirplayIcon from '@material-ui/icons/Airplay';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { data } from 'jquery';
import './bgColor.css';

const Sidebar = () => { 
	const [ScreenVal, setScreenVal] = useState();
	const [inputData, setinputData] = useState('');
	const [Images, setImages] = useState([]);
	console.log(Images);
	const dataText = itemName => {
		setScreenVal(itemName);
	};

	const InsertImage = async () => {
		try {
			const url = `https://pixabay.com/api/?key=21494665-2c2e61ef7810f234ce6ac3b05&q=${inputData}`;
			const dataFetch = await fetch(url);
			const jsonForm = await dataFetch.json();
			console.log([jsonForm.hits])
			setImages(jsonForm.hits)
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div style={{ width: '100%', height: '100vh' }}>
				<ListItem button component={Link} to="/screen" onClick={() => dataText('Screen')}>
					<ListItemIcon className="nav">
						<AirplayIcon style={{ color: '#94959E' }} />
						<p>Screen</p>
					</ListItemIcon>
					<ListItemText primary={ScreenVal} className="slide" style={{ marginTop: '-1rem' }} />
				</ListItem>
				<ListItem button component={Link} to="/group" onClick={() => dataText('Group')}>
					<ListItemIcon className="nav">
						<ScheduleIcon style={{ color: '#94959E' }} />
						<p id="parar">Group</p>
					</ListItemIcon>
				</ListItem>
				<ListItem button onClick={() => dataText('PlayList')} component={Link} to="/playlists">
					<ListItemIcon className="nav">
						<FormatListNumberedIcon style={{ color: '#94959E' }} />
						<p>PlayList</p>
					</ListItemIcon>
				</ListItem>
				<ListItem button onClick={() => dataText('Library')} component={Link} to="/library">
					<ListItemIcon className="nav">
						<LibraryAddIcon style={{ color: '#94959E' }} />
						<p>Library</p>
					</ListItemIcon>
				</ListItem>
				<ListItem button onClick={() => dataText('Add')} component={Link} to="/addcustomer">
					<ListItemIcon className="nav">
						<PersonAddIcon style={{ color: '#94959E' }} />
						<p>Add</p>
					</ListItemIcon>
				</ListItem>

				<footer style={{ position: 'absolute', bottom: '15%' }}>
					<ListItem>
						<ListItemIcon className="nav">
							<PersonIcon style={{ color: '#94959E' }} />
							<p>User</p>
						</ListItemIcon>
					</ListItem>
					<ListItem button component={Link} to="/login">
						<ListItemIcon className="nav">
							<ExitToAppIcon style={{ color: '#94959E' }} />
							<p>Login</p>
						</ListItemIcon>
					</ListItem>
				</footer>
				<div className="boxes">
					<div className="input1">
						<input
							id="search"
							type="text"
							placeholder="Search Templates....."
							value={inputData}
							onChange={e => setinputData(e.target.value)}
						/>
						<i className="fas fa-search" onClick={() => InsertImage()}></i>
					</div>
					<div className="imageMainBox">
						{Images.map((data) => {
							// const splitImages = data.previewURL.split(",")
							// console.log(splitImages);
							return (
								<div className="imageBox" key={data.id}>
									<img src={data.previewURL} alt="screen" className="images" style={{cursor :"pointer"}}/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
