import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from './components/appbar'
import TournamentPage from './pages/tournamentPage'
import TournamentDetailPage from './pages/TournamentDetailPage'
import styled from '@emotion/styled'

class App extends Component {
  render() {
		return (
			<Router>
				<Root id="App-Root">
					<AppBar id='App-AppBar' />
					<Main id='App-Main'>
						<Route exact={true} path="/" component={TournamentPage} />
						<Route exact={true} path="/tournament" component={TournamentPage} />
						<Route exact={true} path="/tournament/new" render={() => <h1>new tournament</h1> } />
						<Route exact={true} path="/tournament/:id" component={TournamentDetailPage} />
						<Route exact={true} path="/tournament/:id/admin" render={() => <h1>admin tournament</h1> } />
					</Main>
				</Root>
			</Router>
		);
  }
}

const Root = styled.div`
	background-color: red;
	display: flex;
	flex-direction: column;
	height: 100%;
`

// const Main = styled.div`
// 	overflow-y: scroll
// `

const Main = styled.div`
	margin-top: 10px;
	height: 100%;
	display: flex;
`

export default App;
