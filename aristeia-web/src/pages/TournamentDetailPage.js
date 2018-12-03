import React, { Component } from 'react';
import { getTournamentById } from '../services/tournamentService'
import styled from '@emotion/styled'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { People, GridOn, Notes, Info } from '@material-ui/icons'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
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
				next: x => this.setState({ tournament: x }),
				error: err => console.error('getTournamentById something wrong occurred: ' + err),
				complete: () => console.log('getTournamentById done'),
			});
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props
		return (
			<Main id="TournamentDetailPage">
				<div>
				<h6>{this.state.tournament && this.state.tournament.name }</h6>
				<p>{this.state.tournament && this.state.tournament.description }</p>
				<p>{this.state.tournament && this.state.tournament.type }</p>
				<p>{this.state.tournament && this.state.tournament.players.length }</p>
				<p>{this.state.tournament && this.state.tournament.rounds.length }</p>
				</div>
				<BottomNavigation
					value={this.state.value}
					onChange={this.handleChange}
					showLabels
					className={classes.root}
				>
					<BottomNavigationAction label="Info" icon={<Info />} />
					<BottomNavigationAction label="Jugadores" icon={<People />} />
					<BottomNavigationAction label="Clasificación" icon={<GridOn />} />
					<BottomNavigationAction label="Resultados" icon={<Notes />} />
				</BottomNavigation>
			</Main>
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
