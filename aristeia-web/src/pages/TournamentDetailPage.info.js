import React, { Component } from 'react';
import { getTournamentById } from '../services/tournamentService'
import styled from '@emotion/styled'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { People, GridOn, Notes, Info } from '@material-ui/icons'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BottomNavigationMenu from '../components/tournamentBottomNavitagation'
//import reactStyled from 'react-emotion'

class TournamentDetailPage extends Component {

	constructor() {
		super()

		this.state = {
			tournament: null,
			value: 0
		}
	}

    componentDidMount() {
		const id = this.props.match.params.id
		if(id) {
			getTournamentById(id).subscribe({
				next: t => this.setState({ tournament: t }),
				error: err => console.error('getTournamentById something went wrong: ' + err),
				complete: () => console.log('getTournamentById done'),
			});
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props
		const { tournament } = this.state

		return (
			tournament ?			
	
				<Main id="TournamentDetailPage">
					<div>
						<h6>{tournament.name }</h6>
						<p>{tournament.description }</p>
						<p>{tournament.type }</p>
						<p>{tournament.players.length }</p>
						<p>{tournament.rounds.length }</p>
					</div>
					<BottomNavigationMenu tournament={this.state.tournament} position={0} />
				</Main>

			:
			<h1>Tournament not found</h1>
		)
	}
}

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
`

const styles = {
	card: {
	  //maxWidth: 345,
	},
	media: {
	  //height: 60,
	},
	root: {
		width: "100%"
	  },
  };

export default withRouter(withStyles(styles)(TournamentDetailPage));
