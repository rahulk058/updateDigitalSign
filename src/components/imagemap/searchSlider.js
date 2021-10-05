import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
// import { FabricObject } from '../utils';
// export interface CubeObject extends FabricObject {}
const SearchSlider = props => {
	
	const [inputData, setinputData] = useState('');
	const [Images, setImages] = useState([]);
	const [imagUrl, setimagUrl] = useState('');
	console.log(Images);
	
	const SelectedImage = urlPath => {
		setimagUrl(urlPath);
		console.log(urlPath);
	};
	const InsertImage = async () => {
		try {
			const url = `https://pixabay.com/api/?key=21494665-2c2e61ef7810f234ce6ac3b05&q=${inputData}`;
			const dataFetch = await fetch(url);
			const jsonForm = await dataFetch.json();
			console.log([jsonForm.hits]);
			setImages(jsonForm.hits);
		} catch (error) {
			console.log(error);
		}
	};
	const dragStart = e => {
			const target = e.target;
			console.log('target', target); 
			// e.dataTransfer.setData("card_id", target.id);
	};

	const dragOver = e => {
		e.stopPropagation();
	};
	
	return (
		<>
			<div className="slider">
				<div className="input3" style={{ background: '#fff', padding: '0.4rem 0.6rem' }}>
					<input
						id="search"
						type="text"
						placeholder="Search Templates....."
						value={inputData}
						onChange={e => setinputData(e.target.value)}
					/>
					<i className="fas fa-search" onClick={() => InsertImage()} style={{ cursor: 'pointer' }}></i>
				</div>
				<div
					className="imageMainBox1"
					style={{
						position: 'absolute',
						width: '100%',
						height: '90%',
						display: 'flex',
						justifyContent: 'center',
						alignItem: 'center',
						flexWrap: 'wrap',
						background: '#e1e1e1',
						overflowY: 'scroll',
					}}
				>
					{Images.map(data => {
						const { id, previewURL } = data;
						return (
							<div
								className="imageBox"
								key={id}
								id={props.id}
								draggable={props.draggable}
								onDragStart={dragStart}
								onDragOver={dragOver}
							>
								<img
									src={previewURL}
									alt="screen"
									className="images"
									style={{ cursor: 'pointer' }}
									onClick={() => SelectedImage(previewURL)}
									
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
	
};

export default SearchSlider;
SearchSlider.propTypes = {
	canvasRef: PropTypes.any,
	selectedItem: PropTypes.object,
};
