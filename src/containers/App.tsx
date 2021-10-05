import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ImageMapEditor from '../components/imagemap/ImageMapEditor';
import WorkflowEditor from '../components/workflow/WorkflowEditor';
import Title from './Title';
import FlowEditor from '../components/flow/FlowEditor';
import FlowContainer from './FlowContainer';
import HexGrid from '../components/hexgrid/HexGrid';

type EditorType = 'imagemap' | 'workflow' | 'flow' | 'hexgrid';

interface IState {
	activeEditor?: EditorType;
}

class App extends Component<any, IState> {
	state: IState = {
		activeEditor: 'imagemap',
	};

	onChangeMenu = ({ key }) => {
		this.setState({
			activeEditor: key,
		});
	};

	renderEditor = (activeEditor: EditorType) => {
		switch (activeEditor) {
			case 'imagemap':
				return <ImageMapEditor />;
			case 'workflow':
				return <WorkflowEditor />;
			case 'flow':
				return <FlowEditor />;
			case 'hexgrid':
				return <HexGrid />;
		}
	};

	render() {
		const { activeEditor } = this.state;
		return (
			<div className="rde-main">
				<FlowContainer>
					<div className="rde-content">{this.renderEditor(activeEditor)}</div>
				</FlowContainer>
			</div>
		);
	}
}

export default App;
