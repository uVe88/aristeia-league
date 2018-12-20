import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import AppBar from './components/appbar'
import TournamentListPage from './pages/tournamentListPage'
import TournamentPage from './pages/tournamentPage'
// import TournamentDetailPageInfo from './pages/TournamentDetailPage.info'
// import TournamentDetailPagePlayers from './pages/TournamentDetailPage.players'
// import TournamentDetailPageRanking from './pages/TournamentDetailPage.ranking'
// import TournamentDetailPageResults from './pages/TournamentDetailPage.results'
import NewTournamentPage from './pages/tournament.new'
import styled from '@emotion/styled'
import tournamentPage from './pages/tournamentPage';

class App extends Component {
  render() {
		return (
			<Router>
				<Root id="App-Root">
					<AppBar id='App-AppBar' />
					<Main id='App-Main'>
						<Route exact path="/" component={TournamentListPage} />
						<Route exact path="/tournaments" component={TournamentListPage} />
						<Route exact path="/tournaments/new" component={NewTournamentPage} />
						<Route path='/tournaments/:tournamentId' component={tournamentPage} />
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
