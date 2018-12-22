import React, { Component, Fragment } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from './components/appbar'
import TournamentListPage from './pages/tournamentListPage'
import NewTournamentPage from './pages/tournament.new'
import styled from '@emotion/styled'
import tournamentPage from './pages/tournamentPage';

class App extends Component {
  render() {
		return (
			<Router>
				<Root id="App-Root">
					<AppBar id='App-AppBar' />
					<Content id='App-Main'>
						<Route exact path="/" component={TournamentListPage} />
						<Route exact path="/tournaments" component={TournamentListPage} />
						<Switch>
							<Route exact path="/tournaments/new" component={NewTournamentPage} />
							<Route path='/tournaments/:tournamentId' component={tournamentPage} />
						</Switch>
					</Content>
				</Root>
			</Router>
		);
  }
}

const Root = styled.div`
	background-color: gray;
	height: 100%;
	display: flex;
	flex-direction: column;
	//overflow: hidden;
`

const Content = styled.div`
	background-color: green;
	height: 100%;
`
export default App;
